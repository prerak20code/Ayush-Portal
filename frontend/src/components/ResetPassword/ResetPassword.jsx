import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services';

export default function ResetPassword() {
    const { userId, resetString } = useParams();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [inputs, setInputs] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleResetPassword() {
        try {
            setLoading(true);
            setDisabled(true);
            const res = await userService.resetPassword(
                userId,
                resetString,
                inputs.newPassword
            );
            if (res && res.message === 'Password has been reset successfully') {
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
            setDisabled(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function onMouseOver() {
        if (!inputs.newPassword || !inputs.confirmPassword) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <form onSubmit={handleResetPassword}>
                    <div>
                        <input
                            type="password"
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                            id="newPassword"
                            name="newPassword"
                            value={inputs.newPassword}
                            onchange={handleChange}
                            placeholder="Create a strong password"
                        />
                        <div className="text-xs">
                            password must be 8-12 characters.
                        </div>
                    </div>
                    <div>
                        <input
                            type="password"
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                            id="newPassword"
                            name="newPassword"
                            value={inputs.newPassword}
                            onchange={handleChange}
                            placeholder="Create a strong password"
                        />
                    </div>
                    <Button
                        className="text-[#f9f9f9] mt-4 rounded-md w-full bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                        disabled={disabled}
                        type="submit"
                        onMouseOver={onMouseOver}
                        btnText={loading ? 'Updating' : 'Update password'}
                    />
                </form>
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
