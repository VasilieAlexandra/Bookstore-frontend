
import React, {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
  } from 'react'
  import auth from "../firebaseSetup";
  import {
    Auth,
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword,
    signOut,
    updateCurrentUser,
    updateProfile,
  } from 'firebase/auth'
  
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  
  
  export interface AuthContextModel {
    auth: Auth
    user: User | null
    token: String | null
    isAuthenticated: Boolean
    checkingStatus: Boolean,
    photoUrl: string| null,
    logIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    updateUserPassword: (newPass: string) => Promise<void>
    logOut:() => Promise<void>
    updateUser:(user: User,{displayName, file}: {displayName?: string|null, file: File}) => Promise<void>
  }
  
  export const AuthContext = React.createContext<AuthContextModel>(
    {} as AuthContextModel,
  )
  
  export function useAuth(): AuthContextModel {
    return useContext(AuthContext)
  }

  export interface AuthProviderProps {
    children?: ReactNode
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setAuthenticated] = useState<Boolean>(false);
    const [token, setToken] = useState<String| null>("");
    const [photoUrl, setPhotoUrl] = useState<string| null>("");
    
    const storage = getStorage();

    const [checkingStatus, setCheckingStatus] = useState(true);
  
    function signUp(email: string, password: string): Promise<UserCredential> {
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    function logIn(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password)
      
    }
    function updateUserPassword(newPass: string): Promise<void> {
      return updatePassword(user!, newPass);
    }
    function logOut(): Promise<void> {
    return signOut(auth);
    }
    async function updateUser(user: User, {displayName, file}: {displayName?: string|null,file:File}): Promise<void> {
      const fileRef = ref(storage, user.uid + '.png');
 
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
      
      return updateProfile(user,{displayName:displayName, photoURL:photoURL});
      }
  

    useEffect(() => {
      //function that firebase notifies you if a user is set
      const unsubsrcibe = auth.onAuthStateChanged((user) => {
        setUser(user)
        if (user) {
          user.getIdToken(true).then(t=>setToken(t));
          setAuthenticated(true);
          setPhotoUrl(user?.photoURL!);
       
        }
        setCheckingStatus(false);
      })
      return unsubsrcibe;
    },[]);
  
    const values = {
      auth,
      user,
      token,
      isAuthenticated,
      checkingStatus,
      photoUrl,
      logIn,
      signUp,
      updateUserPassword,
      logOut,
      updateUser,
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  }

  // export const useUserContext = (): UserContextState => {
  //   return useContext(UserContext)
  // }

