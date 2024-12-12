import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { Button } from '..';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { verifyRegex } from '../../utils';

export default function PersonalInformation() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();

    const initialInputs = {
        dateOfBirth: '',
        address: '',
        nationality: '',
        linkedInURL: '',
    };

    const navigate = useNavigate();
    const { user } = useUserContext();
    const [countryList, setCountryList] = useState([]);
    const [flag, setFlag] = useState('');
    const [inputs, setInputs] = useState(initialInputs);

    const initialErrors = {
        root: '',
        dateOfBirth: '',
        address: '',
    };

    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setCurrentStep(0);
        const savedData = localStorage.getItem(
            `${user._id}_StartupOwnerPersonalInfo`
        );
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
        (async function fetchCountryList() {
            try {
                const res = await fetch(
                    'https://countriesnow.space/api/v0.1/countries/flag/images',
                    {
                        method: 'GET',
                    }
                );
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await res.json();
                const countries = result.data;

                countries.sort((a, b) => a.name.localeCompare(b.name));
                setCountryList(countries);
                if (inputs.nationality) {
                    const initialCountry = countries.find(
                        (countryObject) =>
                            countryObject.name === inputs.nationality
                    );

                    if (initialCountry) {
                        setFlag(initialCountry.flag);
                    } else {
                        console.warn(
                            `Country with name "${inputs.nationality}" not found.`
                        );
                    }
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        })();
    }, []);

    function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
        // update flag
        if (name === 'nationality') {
            const selectedCountry = countryList.find(
                (countryObject) => countryObject.name === value
            );
            setFlag(selectedCountry.flag);
        }
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            `${user._id}_StartupOwnerPersonalInfo`,
            JSON.stringify({ ...inputs, personalInfoStatus: 'pending' })
        );
    }

    function onMouseOver() {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key !== 'linkedInURL'
            ) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(initialErrors);
        setCompletedSteps((prev) => [...prev, 'personal']);
        setTotalData((prev) => ({
            ...prev,
            personal: { data: inputs, status: 'complete' },
        }));
        localStorage.setItem(
            `${user._id}_StartupOwnerPersonalInfo`,
            JSON.stringify({ ...inputs, personalInfoStatus: 'complete' })
        );
        navigate(`/application/${user._id}/organization`);
    }

    const inputFields = [
        {
            type: 'date',
            name: 'dateOfBirth',
            required: true,
            label: 'Date of Birth',
            readOnly: false,
        },
        {
            type: 'url',
            name: 'linkedInURL',
            label: 'LinkedIn Profile (Optional)',
            icon: icons.linkedIn,
            placeholder: 'Enter LinkedIn profile URL',
            required: false,
            readOnly: false,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="shadow-md shadow-[#f8f0eb] relative">
                {field.icon && (
                    <div className="size-[16px] fill-[#323232] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
                        {field.icon}
                    </div>
                )}
                <input
                    type={field.type}
                    readOnly={field.readOnly}
                    name={field.name}
                    id={field.name}
                    value={inputs[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent`}
                />
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-xs font-medium">
                    {errors[field.name]}
                </div>
            )}
            {field.name === 'dateOfBirth' && !errors.dateOfBirth && (
                <div className="text-xs">
                    Age should be atleast 18 years old.
                </div>
            )}
        </div>
    ));

    return (
        <div className="p-6 w-full bg-[#fff7f2] overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-orange-600 mb-6 text-center">
                Founder/Co-Founder Personal Information
            </h2>
            <div className="w-full flex flex-col items-center justify-center gap-3">
                {errors.root ? (
                    <div className="text-red-500 w-full text-center">
                        {errors.root}
                    </div>
                ) : (
                    <p className="text-red-500 w-full text-center text-[15px]">
                        <span className="font-bold">* </span>Indicates
                        compulsory fields
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-start justify-center gap-1 w-full"
                >
                    {inputElements}

                    {/* Nationality */}
                    <div className="w-full">
                        <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="nationality">
                                <span className="text-red-500">* </span>
                                Nationality
                            </label>
                        </div>
                        <div className="w-full relative">
                            {flag && (
                                <div className="h-[18px] w-[28px] rounded-sm overflow-hidden absolute top-[50%] translate-y-[-50%] left-3">
                                    <img
                                        src={flag}
                                        alt={`${inputs.nationality} flag`}
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                            )}
                            <select
                                name="nationality"
                                id="nationality"
                                value={inputs.nationality}
                                onChange={handleChange}
                                className={`py-[10px] text-ellipsis transition-all ease-in placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${flag ? 'pl-12 pr-3' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent`}
                            >
                                <option value="">Select Nationality</option>
                                {countryList.map((country) => (
                                    <option
                                        key={country.name}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="w-full">
                        <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="address">
                                <span className="text-red-500">* </span>
                                Current Address
                            </label>
                        </div>
                        <div className="w-full relative">
                            <div className="size-[16px] fill-[#323232] absolute top-2 right-3">
                                {icons.locationPinPoint}
                            </div>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Provide your Current address"
                                value={inputs.address}
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                className="shadow-md shadow-[#f8f0eb] py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                            />
                        </div>
                        {errors.address ? (
                            <div className="mt-1 text-red-500 text-sm font-medium">
                                {errors.address}
                            </div>
                        ) : (
                            <div className="text-xs">
                                Only 256 characters are allowed.
                            </div>
                        )}
                    </div>

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setInputs(initialInputs);
                                setErrors(initialErrors);
                                setFlag('');
                            }}
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Reset</p>
                                    <div className="size-[15px] fill-[#f9f9f9]">
                                        {icons.erase}
                                    </div>
                                </div>
                            }
                        />
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            type="submit"
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Save</p>
                                    <div className="size-[14px] fill-[#f9f9f9]">
                                        {icons.next}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
