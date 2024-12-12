import { icons } from '../assets/icons';
import { useState } from 'react';
import { Button } from '../components';

export default function LicenseGeneratorPage() {
    const [inputs, setInputs] = useState({});
    const [licenseType, setLicenseType] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, files } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: files[0],
        }));
    };

    function onMouseOver() {
        if (Object.values(inputs).some((value) => !value)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleLicenseTypeChange = (event) => {
        setLicenseType(event.target.value);
        setInputs({}); // Reset the input fields when license type changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            'All documents have been successfully submitted & payment is Done!!'
        );
    };

    const manufactureFields = [
        {
            name: 'manufacturingLicense',
            label: 'Copy of Manufacturing License',
            required: true,
        },
        {
            name: 'siteLayout',
            label: 'Site layout of the manufacturing facility',
            required: true,
        },
        {
            name: 'manufacturingFormula',
            label: 'Manufacturing formula and process',
            required: true,
        },
        {
            name: 'productSpecification',
            label: 'Finished product specification report',
            required: true,
        },
        {
            name: 'coppProducts',
            label: 'List of applied and approved products for COPP certification',
            required: true,
        },
        {
            name: 'processValidation',
            label: 'Process Validation Report for 3 batches',
            required: true,
        },
        {
            name: 'technicalStaffDetails',
            label: 'Details of technical staff',
            required: true,
        },
        {
            name: 'equipmentList',
            label: 'List of equipment to be used',
            required: true,
        },
        {
            name: 'waterHVAC',
            label: 'Water & HVAC system diagrams',
            required: true,
        },
        {
            name: 'proofSafetyEffectiveness',
            label: 'Proof of Safety & Effectiveness',
            required: true,
        },
        {
            name: 'herbalUndertaking',
            label: 'Undertaking regarding herbal ingredients',
            required: true,
        },
        {
            name: 'complianceUndertaking',
            label: 'Compliance Undertaking',
            required: true,
        },
        {
            name: 'kycDetails',
            label: 'KYC details of the applicant',
            required: true,
        },
        {
            name: 'addressProof',
            label: 'Address Proof (Rent Agreement)',
            required: true,
        },
        {
            name: 'constitutionDocument',
            label: 'Constitution Document of the business',
            required: true,
        },
    ];

    const loanFields = [
        {
            name: 'loanApplication',
            label: 'Loan Application Form',
            required: true,
        },
        { name: 'loanApproval', label: 'Loan Approval Letter', required: true },
        {
            name: 'bankStatement',
            label: 'Bank Statements (last 6 months)',
            required: true,
        },
        {
            name: 'collateralProof',
            label: 'Collateral Proof Document',
            required: true,
        },
        {
            name: 'financialReports',
            label: 'Financial Reports (last 3 years)',
            required: true,
        },
        { name: 'businessPlan', label: 'Business Plan', required: true },
        ...manufactureFields.slice(6), // Reuse remaining fields from manufacture license
    ];

    const retailWholesaleFields = [
        {
            name: 'retailApplication',
            label: 'Retail License Application Form',
            required: true,
        },
        {
            name: 'wholesaleApplication',
            label: 'Wholesale License Application Form',
            required: true,
        },
        {
            name: 'storeDetails',
            label: 'Details of Store/Outlet',
            required: true,
        },
        {
            name: 'inventoryRecords',
            label: 'Inventory Records',
            required: true,
        },
        {
            name: 'distributionPlan',
            label: 'Distribution Plan',
            required: true,
        },
        ...manufactureFields.slice(5), // Reuse remaining fields from manufacture license
    ];

    const fileFields =
        licenseType === 'loan'
            ? loanFields
            : licenseType === 'retailWholesale'
              ? retailWholesaleFields
              : manufactureFields;

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="w-full transition-all ease-in">
            <div className="bg-orange-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="relative">
                <input
                    type="file"
                    name={field.name}
                    id={field.name}
                    onChange={handleChange}
                    className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] bg-transparent"
                />
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-xs font-medium">
                    {errors[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="p-6 w-full bg-orange-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                License Generator Document Verification
            </h2>

            <form
                className="flex flex-col items-start justify-center gap-1 w-full"
                onSubmit={handleSubmit}
            >
                {/* Dropdown for License Type */}
                <div className="w-full mb-4">
                    <label
                        htmlFor="licenseType"
                        className="text-lg font-medium"
                    >
                        Select License Type
                    </label>
                    <select
                        id="licenseType"
                        name="licenseType"
                        value={licenseType}
                        onChange={handleLicenseTypeChange}
                        className="py-[10px] rounded-md px-3 w-full border-[0.01rem] border-[#858585] bg-transparent"
                    >
                        <option value="">Select License Type</option>
                        <option value="manufacture">Manufacture License</option>
                        <option value="loan">Loan License</option>
                        <option value="retailWholesale">
                            Retail & Wholesale License
                        </option>
                    </select>
                </div>

                {/* Render file input fields based on selected license type */}
                {fileElements}

                <div className="w-full flex items-center justify-end gap-4 mt-4">
                    <Button
                        disabled={disabled}
                        onMouseOver={onMouseOver}
                        className="text-[#f9f9f9] rounded-md h-[40px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                        type="submit"
                        btnText={
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-[#f9f9f9] text-nowrap">
                                    Pay 2000 and continue
                                </p>
                            </div>
                        }
                    />
                </div>
            </form>
        </div>
    );
}
