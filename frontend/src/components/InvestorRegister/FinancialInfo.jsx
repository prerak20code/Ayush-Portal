import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';
import { useRegisterInvestorContext, useUserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';

export default function InvestorFinancialInfo() {
    const initialInputs = {
        revenue: '',
        netWorth: '',
        businessLicenseNumber: '',
        taxPayerIdentification: '',
        idType: '',
        idValue: '',
    };
    const [inputs, setInputs] = useState(initialInputs);
    const { user } = useUserContext();

    const initialErrors = {
        root: '',
        revenue: '',
        netWorth: '',
        businessLicenseNumber: '',
        taxPayerIdentification: '',
        idType: '',
        idValue: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [investorTypeData, setInvestorTypeData] = useState('');

    const idOptions = [
        { value: 'drivingLicense', name: 'Driving License' },
        { value: 'aadhaarCard', name: 'Aadhaar Card' },
        { value: 'passport', name: 'Passport' },
        { value: 'voterId', name: 'Voter ID' },
    ];

    const handleGovtIssuedIdentificationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            govtIssuedIdentification: {
                ...prevData.govtIssuedIdentification,
                [name]: value,
            },
        }));
    };

    useEffect(() => {
        setCurrentStep(1);
        const savedData = localStorage.getItem('InvestorFinancialInfo');
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
        const personalInfo = JSON.parse(
            localStorage.getItem('InvestorPersonalInfo')
        );
        setInvestorTypeData(personalInfo?.investorType || '');
    }, []);

    function onMouseOver() {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key !== 'linkedIn'
            ) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            console.log(inputs);
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            'InvestorFinancialInfo',
            JSON.stringify({ ...inputs, financialInfoStatus: 'pending' })
        );
    }

    const inputFields = [
        {
            name: 'revenue',
            label: 'Revenue',
            placeholder: 'Enter your Organization Name',
            required: true,
            icon: icons.building,
            type: 'text',
            show: inputs.investorType === 'organization',
        },
        {
            type: 'date',
            name: 'dateOfBirth',
            required: true,
            label: 'Date of Birth',
            show: true,
        },
        {
            type: 'url',
            name: 'linkedIn',
            label: 'LinkedIn Profile (Optional)',
            icon: icons.linkedIn,
            placeholder: 'Enter LinkedIn profile URL',
            required: false,
            show: true,
        },
    ];

    const inputElements = inputFields.map(
        (field) =>
            field.show && (
                <div key={field.name} className="w-full transition-all ease-in">
                    <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                        <label htmlFor={field.name}>
                            {field.required && (
                                <span className="text-red-500">* </span>
                            )}
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
            )
    );

    return (
        <div className="p-6 w-full bg-blue-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                Financial Information
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
                {/* Form */}
                <form
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
                    {/* Revenue */}
                    <div className="flex items-center space-x-3">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Revenue
                            </label>
                            <input
                                type="text"
                                name="revenue"
                                placeholder="Enter Revenue"
                                value={formData.revenue}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Net Worth */}
                    <div className="flex items-center space-x-3">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Net Worth (in Crores)
                            </label>
                            <input
                                type="number"
                                name="netWorth"
                                placeholder="Enter Net Worth in Crores"
                                value={formData.netWorth}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {investorTypeData === 'Institutional' ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                    Business License Number (optional)
                                </label>
                                <input
                                    type="number"
                                    name="businessLicenseNumber"
                                    placeholder="Enter License Number"
                                    value={formData.businessLicenseNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    ) : null}
                    <div className="flex items-center space-x-3">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                {investorTypeData === 'Institutional'
                                    ? 'Tax Registration Number or VAT/GST Number'
                                    : ' PAN or Equivalent ID'}
                            </label>
                            <input
                                type="number"
                                name="taxPayerIdentification"
                                placeholder={
                                    investorTypeData === 'Institutional'
                                        ? ' enter TRN or GST Number'
                                        : 'Enter PAN/Equivalent ID'
                                }
                                value={formData.taxPayerIdentification}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Government ID */}
                    <div className="flex items-center space-x-3">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Government Issued Identification
                            </label>
                            <select
                                name="type"
                                value={formData.govtIssuedIdentification.type}
                                onChange={handleGovtIssuedIdentificationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Government ID</option>
                                {govtIdentification.map((govtId) => (
                                    <option
                                        key={govtId.value}
                                        value={govtId.value}
                                    >
                                        {govtId.label}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="typeValue"
                                placeholder={`Enter ${formData.govtIssuedIdentification.type || 'ID'} Number`}
                                value={
                                    formData.govtIssuedIdentification.typeValue
                                }
                                onChange={handleGovtIssuedIdentificationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`py-2 px-6 rounded-md font-semibold text-white ${
                                isFormComplete
                                    ? 'bg-blue-500 hover:bg-blue-600'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!isFormComplete}
                        >
                            Save Financial Information
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
