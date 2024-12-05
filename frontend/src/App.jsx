import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from './contexts';
import { userService } from './services';
import { icons } from './assets/icons';

export default function App() {
    const [loading, setLoading] = useState(true);
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        (async function checkLogin() {
            try {
                setLoading(true);
                const res = await userService.getCurrentUser();
                if (res && !res.message) {
                    setUser(res);
                } else {
                    setUser(null);
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return loading ? (
        <div className="text-[#040606] h-screen w-screen flex flex-col items-center justify-center gap-2">
            <div className="fill-[#f68533] text-white size-[50px]">
                {icons.loading}
            </div>
            <p className="text-3xl">Please wait...</p>
            <p className="text-lg">Refresh the page if it takes too long</p>
        </div>
    ) : (
        <div className="w-screen h-screen">
            <Outlet />
        </div>
    );
}
