import { useState } from 'react';
import { Button } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts';
import { userService } from '../services';

export default function LoginPage() {
    const [role, setRole] = useState('Startup Owner'); // Default role
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    async function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    function onMouseOver() {
        if (Object.values(inputs).some((value) => !value)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setDisabled(true);
        try {
            const res = await userService.login(inputs, role);
            if (res && !res.message) {
                setUser(res);
                navigate('/');
            } else {
                setError(res.message);
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            {/* Background */}
            <div
                className="bg-cover bg-center transform scale-x-[-1] filter brightness-75"
                style={{
                    backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/c3/c9/ee/impressive-construction.jpg')`,
                }}
            />

            {/* Main Content */}
            <div className="relative bg-gray-200 p-6 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                    Welcome Back!
                </h1>
                <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Select Your Role
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Startup Owner">Startup Owner</option>
                    <option value="Stakeholder">Stakeholder</option>
                    <option value="Govt. Official">Govt. Official</option>
                </select>

                {/* Conditional Rendering */}
                {/* {role === 'Startup Owner' && <OwnerType />}
                    {role === 'Stakeholder' && <StakeholderType />}
                    {role === 'Govt. Official' && <GovernmentType />} */}

                <div className="bg-gray-300 border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="block text-sm text-gray-700 font-medium mb-1"
                                htmlFor="email"
                            >
                                <span className="text-red-500">*</span>
                                E-mail
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                placeholder="Enter your e-mail"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm text-gray-700 font-medium mb-1"
                                htmlFor="password"
                            >
                                <span className="text-red-500">*</span>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                className="text-[#f9f9f9] bg-gradient-to-r rounded-md w-full from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                disabled={disabled}
                                onMouseOver={onMouseOver}
                                type="submit"
                                btnText={loading ? 'logging...' : 'Login'}
                            />
                            <p className="w-full text-center text-[16px]">
                                don't have an account?{' '}
                                <Link
                                    to={'/register'}
                                    className="text-[#355ab6] hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
