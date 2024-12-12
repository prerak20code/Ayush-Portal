import { icons } from '../assets/icons';
import { useState } from 'react';
import { Button } from '../components';

export default function LicenseGeneratorPage() {
    const [inputs, setInputs] = useState({
        manufacturingLicense: null,
        siteLayout: null,
        manufacturingFormula: null,
        productSpecification: null,
        coppProducts: null,
        processValidation: null,
        technicalStaffDetails: null,
        equipmentList: null,
        waterHVAC: null,
        proofSafetyEffectiveness: null,
        herbalUndertaking: null,
        complianceUndertaking: null,
        kycDetails: null,
        addressProof: null,
        constitutionDocument: null,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            'All documents have been successfully submitted & payment is Done!!'
        );
    };

    const fileFields = [
        {
            name: 'manufacturingLicense',
            label: 'Copy of Manufacturing License, if the applicant is manufacturing AYUSH products',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'siteLayout',
            label: 'Site layout of the manufacturing facility',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'manufacturingFormula',
            label: 'Details of Manufacturing formula and manufacturing process',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'productSpecification',
            label: 'Finished product specification report',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'coppProducts',
            label: 'List of applied and approved products for COPP certification',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'processValidation',
            label: 'Process Validation Report for 3 batches',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'technicalStaffDetails',
            label: 'Details of the technical staff, their names, experience, and qualifications',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'equipmentList',
            label: 'List of equipment to be used for manufacturing',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'waterHVAC',
            label: 'Water & HVAC system diagrams',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'proofSafetyEffectiveness',
            label: 'Proof of Safety & Effectiveness according to Rule 158B of Drugs & Cosmetics Rules, 1945',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'herbalUndertaking',
            label: 'Undertaking regarding the absence of non-herbal ingredients, applicable in case of herbal products',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'complianceUndertaking',
            label: 'Undertaking regarding compliance with the Drugs and Cosmetics Act, Drugs and Cosmetic Rules, Drugs & Magic Remedies (Objectionable Advertisements) Act, 1954, and its corresponding rules (applicable in case of herbal products only)',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'kycDetails',
            label: 'KYC details of the applicant',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'addressProof',
            label: 'Address Proof of the Premises (Rent Agreement)',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'constitutionDocument',
            label: 'Constitution Document of the business',
            required: true,
            icon: icons.file,
            type: 'file',
        },
    ];

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="w-full transition-all ease-in">
            <div className="bg-orange-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="relative">
                {field.icon && (
                    <div className="size-[16px] fill-[#323232] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
                        {field.icon}
                    </div>
                )}
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    accept={field.accept}
                    onChange={handleChange}
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] bg-transparent`}
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
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
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
