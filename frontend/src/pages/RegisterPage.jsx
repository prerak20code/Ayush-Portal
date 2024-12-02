import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AYUSHLOGO } from '../assets/images';
import { useState } from 'react';
import { userService } from '../services';
import { useUserContext } from '../contexts';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components';
import { verifyRegex } from '../utils';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        password: '',
        phone: '',
    });

    const [error, setError] = useState({
        root: '',
        name: '',
        email: '',
        dateOfBirth: '',
        password: '',
        phone: '',
    });
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    async function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    const handleBlur = (e) => {
        let { name, value } = e.target;
        if (value) {
            verifyRegex(name, value, setError);
        }
    };

    function onMouseOver() {
        if (
            Object.values(inputs).some((value) => !value) ||
            Object.entries(error).some(
                ([key, value]) => value !== '' && key !== 'root'
            )
        ) {
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
            const res = await userService.register(inputs);
            if (res && !res.message) {
                setUser(res);
                navigate('/');
            } else {
                setError((prev) => ({ ...prev, root: res.message }));
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    }

    /* creating the input fields */

    const inputFields = [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Enter your Name',
            required: true,
        },
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Create a strong password',
            required: true,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-white z-[1] ml-3 px-2 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label} :
                </label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={inputs[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className="shadow-md shadow-[#f7f7f7] py-[15px] rounded-[5px] pl-[10px] w-full border-[0.01rem] border-gray-500 bg-transparent"
                />
            </div>
            {error[field.name] && (
                <div className="mt-1 text-red-500 text-sm font-medium">
                    {error[field.name]}
                </div>
            )}
            {field.name === 'password' && !error.password && (
                <div className="text-xs">password must be 8-12 characters.</div>
            )}
        </div>
    ));

    return (
        <div className="p-8 text-[#040606] flex flex-col md:flex-row items-center md:items-start justify-start gap-8 bg-white">
            <div className="bg-white w-full flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold text-[#040606] mb-2">
                    Ayush Startup
                </h2>
                <h3 className="text-xl font-semibold text-[#1a2424] mb-6">
                    User Registration Portal
                </h3>
                <Link
                    to={'/'}
                    className="size-[150px] md:size-[200px] hover:brightness-75"
                >
                    <img
                        src={AYUSHLOGO}
                        alt="Ayush Logo"
                        className="size-full object-contain"
                    />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-fit">
                    <p className="text-center text-3xl font-medium">
                        Create a new Account
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.2 }}
                        className="relative top-0 h-[0.1rem] bg-[#040606]"
                    />
                </div>

                <div className="w-[400px] flex flex-col items-center justify-center gap-3">
                    {error.root && (
                        <div className="text-red-500 w-full text-center">
                            {error.root}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-start justify-center gap-4 w-full"
                    >
                        {inputElements}
                        {/* Phone Number */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="bg-white z-[1] ml-3 px-2 w-fit relative top-3 font-medium"
                            >
                                Phone Number
                            </label>
                            <PhoneInput
                                country="in"
                                value={inputs.phone}
                                onChange={(value) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        phone: value,
                                    }))
                                }
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    id: 'phone',
                                }}
                                inputClass="!w-full !border !border-gray-300 !rounded-md !shadow-sm focus:!ring-blue-500 focus:!border-blue-500 sm:!text-sm"
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                className="text-[#f9f9f9] mt-4 rounded-md w-full from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                disabled={disabled}
                                onMouseOver={onMouseOver}
                                btnText={
                                    loading ? 'Registering...' : 'Register'
                                }
                            />
                            <p className="w-full text-center text-[16px]">
                                already have an Account ?{' '}
                                <Link
                                    to={'/login'}
                                    className="text-[#355ab6] hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
