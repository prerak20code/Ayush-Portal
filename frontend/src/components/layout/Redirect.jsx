import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts';

export default function Redirect({ children, path, ifLoggedIn = false }) {
    const { user } = useUserContext();
    return ifLoggedIn ? (
        user ? (
            <Navigate to={path} />
        ) : (
            children
        )
    ) : user ? (
        children
    ) : (
        <Navigate to={path} />
    );
}
