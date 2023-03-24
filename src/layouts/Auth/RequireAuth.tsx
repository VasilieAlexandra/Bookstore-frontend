import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

interface Props {
    children: JSX.Element | null
}

export const RequireAuth = ({ children }: Props) => {
    const { isAuthenticated, checkingStatus } = useAuth();
    const location = useLocation();

    return (
        <>
            {
                checkingStatus ? <div className="d-flex justify-content-center row aligne-items-center"> <Spinner /></div> :
                    isAuthenticated ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />
            }
        </>
    );
};