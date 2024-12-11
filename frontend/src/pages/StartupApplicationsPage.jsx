import { useState, useEffect } from 'react';
import { useUserContext } from '../contexts';
import { startupRegistrationApplicationService } from '../services';
import { useNavigate, useParams } from 'react-router-dom';
import { icons } from '../assets/icons';
import { Button } from '../components';

export default function StartupApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        (async function getApps() {
            try {
                const res =
                    await startupRegistrationApplicationService.getApplications(
                        user._id
                    );
                if (res && !res.message) {
                    setApplications(res);
                } else {
                    setMessage('No Ongoing Startups Registration Applications');
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const appsElements = applications.map((app) => (
        <div
            key={app._id}
            onClick={() => navigate(`/application/${app?._id}`)}
            className="cursor-pointer"
        >
            {app._id}
        </div>
    ));

    return loading ? (
        <div className="w-full fill-[#f68533] text-white size-[30px]">
            {icons.loading}
        </div>
    ) : (
        <div>
            <Button
                btnText="Register new Startup"
                onClick={() => navigate(`/application/new`)}
                className=""
            />
            {applications.length > 0 ? (
                <div>{appsElements}</div>
            ) : (
                <div className=" w-full text-black">{message}</div>
            )}
        </div>
    );
}
