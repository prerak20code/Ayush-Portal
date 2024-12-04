import { useState } from 'react';
// import {
//     FaBuilding,
//     FaCalendarAlt,
//     FaMoneyBillWave,
//     FaMapMarkerAlt,
//     FaFilePdf,
// } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRegisterStartupContext } from '../../contexts';
import { icons } from '../../assets/icons';
import { Button } from '..';

export default function OrganizationInformation() {
    const initialInputs = {
        startupName: '',
        dateOfEstablishment: '',
        valuation: '',
        address: '',
        industry: '',
        website: '',
        pdf: null,
        businessType: '',
        country: '', // Add country field
    };
    const initialErrors = {
        root: '',
        startupName: '',
        dateOfEstablishment: '',
        valuation: '',
        address: '',
        industry: '',
        website: '',
        pdf: null,
        businessType: '',
        country: '', // Add country field
    };
    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const { currentStep, setCurrentStep, setTotalData,setCompletedSteps } =
        useRegisterStartupContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setInputs((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    function handleBlur(e) {
        let { name, type, value } = e.target;
        if (type !== 'file') {
            verifyRegex(name, value, setErrors);
        } else {
            // file restrictions
        }
    }

    function onMouseOver() {
        if (
            Object.values(inputs).some(
                (value) => !value // nothing is optional
            ) ||
            Object.entries(errors).some(
                ([key, value]) => value !== '' && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setCompletedSteps((prev) => [...prev, 'organization']);

            // set total data & send backend request
        } catch (err) {
            navigate('/server-error');
        }
    };

    const inputFields = [
        {
            type: 'text',
            name: 'startupName',
            label: 'Startup Name',
            placeholder: 'Enter your Startup Name',
            required: true,
        },
        {
            type: 'date',
            label: 'Date of Establishment',
            required: true,
            name: 'dateOfEstablishment',
        },
        {
            type: 'number',
            name: 'valuation',
            placeholder: 'Enter valuation in crores',
            label: 'Current Valuation (in crores)',
            required: true,
        },
        {
            type: 'url',
            name: 'website',
            label: 'Website URL',
            placeholder: 'Enter website URL',
            required: true,
        },
        {
            type: 'file',
            name: 'pdf',
            required: false,
            accept: '.pdf',
            label: 'Attach Documents (Optional)',
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="shadow-md shadow-[#f8f0eb]">
                {field.type !== 'file' ? (
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={inputs[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={field.placeholder}
                        className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                    />
                ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        accept={field.accept}
                        onChange={handleChange}
                        className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] bg-transparent"
                    />
                )}
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-sm font-medium">
                    {errors[field.name]}
                </div>
            )}
            {field.name === 'password' && !errors.password && (
                <div className="text-xs">
                    This password will be used for further verification.
                </div>
            )}
            {field.name === 'pdf' && (
                <div className="text-xs">Only .pdf files are accepted.</div>
            )}
        </div>
    ));

    const bussinessOptions = [
        { name: 'Select Business Type', value: '' },
        {
            name: 'Sole Partnership',
            value: 'Sole Partnership',
        },
        {
            name: 'Partnership',
            value: 'Partnership',
        },
        {
            name: 'Corporation (Private or Public)',
            value: 'Corporation',
        },
        {
            name: 'LLC',
            value: 'Limited Liability Company (LLC)',
        },
        {
            name: 'Nonprofit',
            value: 'Nonprofit',
        },
    ];

    return (
        <div className="p-6 w-full bg-violet-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-violet-700 mb-6 text-center">
                Startup/Organization Information
            </h2>

            <div className="w-full flex flex-col items-center justify-center gap-3">
                {errors.root ? (
                    <div className="text-red-500 w-full text-center">
                        {errors.root}
                    </div>
                ) : (
                    <p className="text-red-500 w-full text-center text-[15px]">
                        <span className="font-bold">* </span>Indicates
                        complusory fields
                    </p>
                )}
                {/* Form */}
                <form
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
                    {inputElements}

                    {/* Business Type */}
                    {/* <FaBuilding className="text-blue-500" /> */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="address">
                                <span className="text-red-500">* </span>
                                Bussiness Type
                            </label>
                        </div>
                        <select
                            name="businessType"
                            value={inputs.businessType}
                            onChange={handleChange}
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                        >
                            {bussinessOptions.map((option) => (
                                <option value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Address */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="address">
                                <span className="text-red-500">* </span>
                                Address (Headquarter)
                            </label>
                        </div>
                        <div className="w-full">
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Provide your headquarter address"
                                value={inputs.address}
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                className="shadow-md shadow-[#f8f0eb] py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-violet-600 to-violet-700 hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setInputs(initialInputs);
                                setErrors(initialErrors);
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-violet-600 to-violet-700 hover:from-green-600 hover:to-green-700"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            type="submit"
                            btnText={
                                loading ? (
                                    <div className="fill-[#f9f9f9] text-blue-400 size-[20px]">
                                        {icons.loading}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-[#f9f9f9]">Save</p>
                                        <div className="size-[14px] fill-[#f9f9f9]">
                                            {icons.next}
                                        </div>
                                    </div>
                                )
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

// PENDING ***************************************************************
// {
//     /* Country Dropdown */
// }
// <div className="flex items-center space-x-3">
//     {/* <FaMapMarkerAlt className="text-blue-500" /> */}
//     <div className="w-full relative">
//         <label className="block text-sm font-medium text-gray-700">
//             Country
//         </label>
//         <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange} // Use handleChange to update formData
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         >
//             <option value="">Select Country</option>
//             {countryOptions.map((country) => (
//                 <option key={country.value} value={country.value}>
//                     {country.label}
//                 </option>
//             ))}
//         </select>
//     </div>
// </div>;

// {
//     /* Industry Dropdown */
// }
// <div className="flex items-center space-x-3">
//     {/* <FaBuilding className="text-blue-500" /> */}
//     <div className="w-full relative">
//         <label className="block text-sm font-medium text-gray-700">
//             Industry
//         </label>
//         <div className="relative">
//             <select
//                 name="industry"
//                 value={formData.industry}
//                 onChange={handleIndustryChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             >
//                 <option value="">Select Industry</option>
//                 {sectorOptions.map((option, index) => (
//                     <option key={index} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>
//             {/* Dropdown Custom Styling */}
//             {isDropdownVisible && (
//                 <div
//                     className="absolute left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-10"
//                     style={{
//                         maxHeight: '200px',
//                         overflowY: 'auto',
//                     }}
//                 >
//                     {sectorOptions.map((sector, index) => (
//                         <div
//                             key={index}
//                             onClick={() => handleSectorSelect(sector)}
//                             className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
//                         >
//                             {sector}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     </div>
// </div>;

{
    /* // State for sector dropdown visibility and options
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const sectorOptions = [
//         'Ayurveda',
//         'Yoga and Naturopathy',
//         'Unani',
//         'Siddha',
//         'Homoeopathy',
//     ];

//     // State for country options
//     const [countryOptions, setCountryOptions] = useState([]);

//     // Load saved data from localStorage on component mount
//     useEffect(() => {
//         const savedData = localStorage.getItem('organizationInformation');
//         if (savedData) {
//             setFormData(JSON.parse(savedData));
//         }
//     })

// // Fetch countries dynamically
// const fetchCountries = async () => {
//     try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countries = response.data.map((country) => ({
//             label: country.name.common,
//             value: country.name.common,
//         }));
//         countries.sort((a, b) => a.label.localeCompare(b.label)); // Sort countries alphabetically
//         setCountryOptions(countries);
//     } catch (error) {
//         console.error('Error fetching country data:', error);
//     }
// };

//         fetchCountries(); // Fetch countries on component mount
//     }, []);

//     // Save form data to localStorage whenever it changes
//     useEffect(() => {
//         localStorage.setItem(
//             'organizationInformation',
//             JSON.stringify(formData)
//         );
//     }, [formData]);

    
//     // Handle industry input change
//     const handleIndustryChange = (e) => {
//         const value = e.target.value;
//         setFormData((prevData) => ({
//             ...prevData,
//             industry: value,
//         }));
//         setIsDropdownVisible(value.trim() !== '');
//     };

//     // Handle selection from dropdown
//     const handleSectorSelect = (sector) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             industry: sector,
//         }));
//         setIsDropdownVisible(false); // Hide dropdown after selection
//     }; */
}

// DONE*****************************************************************

// {
//     /* Date of Establishment */
// }
// <div className="flex items-center space-x-3">
//     {/* <FaCalendarAlt className="text-blue-500" /> */}
//     <div className="w-full">
//         <label className="block text-sm font-medium text-gray-700">
//             Date of Establishment
//         </label>
//         <input
//             type="date"
//             name="dateOfEstablishment"
//             value={formData.dateOfEstablishment}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         />
//     </div>
// </div>;

// {
//     /* Business Type */
// }
// <div className="flex items-center space-x-3">
//     {/* <FaBuilding className="text-blue-500" /> */}
//     <div className="w-full">
//         <label className="block text-sm font-medium text-gray-700">
//             Type of Business Entity
//         </label>
//         <select
//             name="BusinessType"
//             value={formData.BusinessType} // Bind to BusinessType
//             onChange={handleChange} // Directly use handleChange to update formData
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         >
//             <option value="">Select Business Type</option>
//             <option value="Sole Partnership">Sole Partnership</option>
//             <option value="Partnership">Partnership</option>
//             <option value="Corporation">Corporation (Private or Public)</option>
//             <option value="LLC">Limited Liability Company (LLC)</option>
//             <option value="Nonprofit">Nonprofit</option>
//         </select>
//     </div>
// </div>;

{
    /* Startup Name */
}
{
    /* <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Startup Name
                        </label>
                        <input
                            type="text"
                            name="startupName"
                            placeholder="Enter startup name"
                            value={formData.startupName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div> */
}

{
    /* Evaluation */
}
{
    /* <div className="flex items-center space-x-3">
                     <FaMoneyBillWave className="text-blue-500" />
                     <div className="w-full">
                         <label className="block text-sm font-medium text-gray-700">
                             Evaluation (in Crores)
                         </label>
                      <input
                            type="number"
                            name="evaluation"
                            placeholder="Enter evaluation in crores"
                            value={formData.evaluation}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div> */
}

{
    /* Address */
}
{
    /* <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Address (Headquarter)
                        </label>
                        <textarea
                            name="address"
                            placeholder="Enter complete address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div> */
}

{
    /* <div className="flex items-center space-x-3">
    <FaBuilding className="text-blue-500" />
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
            Website
        </label>
        <input
            type="url"
            name="website"
            placeholder="Enter website URL"
            value={formData.website}
            onChange={handleChange}
            required // Make the field required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
</div>;

<div className="flex items-center space-x-3">
    <FaFilePdf className="text-blue-500" />
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
            Upload PDF (Optional)
        </label>
        <input
            type="file"
            name="pdf"
            accept=".pdf"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
</div>; */
}
