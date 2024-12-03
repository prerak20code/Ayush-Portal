import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services';

export default function EmailVerification() {
    const { userId, uniqueString } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async function verifyEmail() {
            try {
                const res = await userService.verifyEmail(userId, uniqueString);
                if (res && res.message === 'email verified successfully') {
                    setSuccess(true);
                    setMessage(res.message);
                } else {
                    setMessage(res.message);
                    setSuccess(false);
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, [userId, uniqueString]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                {loading ? (
                    <div className="text-center">
                        <svg
                            className="animate-spin h-10 w-10 text-blue-500 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                            ></path>
                        </svg>
                        <p className="text-blue-500 mt-4">
                            Verifying your email...
                        </p>
                    </div>
                ) : success ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-green-500">
                            Email Verified!
                        </h1>
                        <p className="mt-4 text-gray-600">{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-500">
                            Verification Failed
                        </h1>
                        <p className="mt-4 text-gray-600">{message}</p>
                        <button
                            onClick={() => navigate('/register')}
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Sign Up Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
