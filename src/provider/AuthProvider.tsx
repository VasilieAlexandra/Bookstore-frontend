
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
    sendPasswordResetEmail,
    signOut,
    updateCurrentUser,
    updateProfile,
  } from 'firebase/auth'
  
  
  export interface AuthContextModel {
    auth: Auth
    user: User | null
    token: String | null
    isAuthenticated: Boolean
    checkingStatus: Boolean
    logIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    sendPasswordResetEmail?: (email: string) => Promise<void>
    logOut:() => Promise<void>
    updateUser:(user: User,{displayName, photoUrl}: {displayName?: string|null, photoUrl?: string|null}) => Promise<void>
  }
  
  export const AuthContext = React.createContext<AuthContextModel>(
    {} as AuthContextModel,
  )

  export interface UserContextState {
    isAuthenticated: boolean
    id?: string
  }
  
  export const UserContext = createContext<UserContextState>(
    {isAuthenticated: auth.currentUser!== null, id: auth.currentUser?.uid} as UserContextState,
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
    const [checkingStatus, setCheckingStatus] = useState(true);
  
    function signUp(email: string, password: string): Promise<UserCredential> {
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    function logIn(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password)
      
    }
    function resetPassword(email: string): Promise<void> {
      return sendPasswordResetEmail(auth, email)
    }
    function logOut(): Promise<void> {
    return signOut(auth);
    }
    function updateUser(user: User, {displayName, photoUrl}: {displayName?: string|null, photoUrl?: string|null}): Promise<void> {
      return updateProfile(user,{displayName:displayName, photoURL:photoUrl});
  }

    useEffect(() => {
      //function that firebase notifies you if a user is set
      const unsubsrcibe = auth.onAuthStateChanged(async (user) => {
        setUser(user)
        if (user) {
          const t = await user.getIdToken(true);
          setToken(t);
          setAuthenticated(true);
          
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
      logIn,
      signUp,
      resetPassword,
      logOut,
      updateUser,
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  }

  // export const useUserContext = (): UserContextState => {
  //   return useContext(UserContext)
  // }

