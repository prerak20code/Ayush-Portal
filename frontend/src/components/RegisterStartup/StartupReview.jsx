import { Button } from '..';
import { icons } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { startupService } from '../../services';

export default function StartupReview() {
    const { setCurrentStep, setCompletedSteps, setTotalData, totalData } =
        useRegisterStartupContext();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);

    // State to store displayed data
    const [displayData, setDisplayData] = useState({
        personal: {},
        financial: {},
        organization: {},
        banking: {},
        documents: {},
    });

    useEffect(() => {
        setCurrentStep(5);

        const personal = JSON.parse(
            localStorage.getItem(`${user._id}_StartupOwnerPersonalInfo`) || '{}'
        );
        const financial = JSON.parse(
            localStorage.getItem(`${user._id}_StartupOwnerFinancialInfo`) ||
                '{}'
        );
        const organization = JSON.parse(
            localStorage.getItem(`${user._id}_StartupOwnerOrganizationInfo`) ||
                '{}'
        );
        const banking = JSON.parse(
            localStorage.getItem(`${user._id}_StartupOwnerBankingInfo`) || '{}'
        );
        const documents = JSON.parse(
            localStorage.getItem(`${user._id}_StartupOwnerDocuments`) || '{}'
        );

        setDisplayData({
            personal,
            financial,
            organization,
            banking,
            documents,
        });
    }, []);

    const renderDataSection = (title, data) => (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {title}
            </h3>
            {Object.keys(data).length > 0 ? (
                <ul className="list-disc list-inside bg-gray-50 p-4 rounded shadow">
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {String(value)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic">No data available</p>
            )}
        </div>
    );

    const renderDocumentImages = (documents) => (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Uploaded Documents
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                {documents && Object.keys(documents).length > 0 ? (
                    Object.entries(documents).map(([key, url]) => (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={key}
                            className="flex flex-col overflow-clip h-[80px] items-center justify-center text-center border-[0.01rem] drop-shadow-md rounded-lg p-2"
                        >
                            <div className="size-[24px]">{icons.file}</div>
                            <p className="text-[12px] w-fit mt-2 text-gray-800">
                                {key}
                            </p>
                        </a>
                    ))
                ) : (
                    <p className="text-gray-500 italic">
                        No documents uploaded
                    </p>
                )}
            </div>
        </div>
    );

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setCompletedSteps((prev) => [...prev, 'reviewd']);
            setTotalData((prev) => ({
                ...prev,
                reviewd: { status: 'complete' },
            }));
            console.log('data', totalData);
            const res = await startupService.registerStartup(totalData);
            if (
                res &&
                res.message === 'startup has been registered successfully'
            ) {
                alert(res.message);
                localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerFinancialInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerOrganizationInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
                navigate('/');
            }
        } catch (err) {
            navigate('/server-error');
        }
    }

    async function handleAbort() {
        localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerFinancialInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerOrganizationInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
        alert('Startup registration process has been aborted.');
        navigate('/');
    }

    return (
        <div className="p-6 w-full bg-blue-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-green-600 mb-6 text-center">
                Review and Submit the Form
            </h2>

            {/* Display Data */}
            {renderDataSection('Personal Information', displayData.personal)}
            {renderDataSection('Financial Information', displayData.financial)}
            {renderDataSection(
                'Organization Information',
                displayData.organization
            )}
            {renderDataSection('Banking Information', displayData.banking)}
            {renderDocumentImages(displayData.documents)}

            {/* Buttons */}
            <div className="w-full flex items-center justify-center gap-4 mt-10">
                <Button
                    className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-500 hover:to-orange-600"
                    onClick={handleSubmit}
                    type="submit"
                    btnText={
                        loading ? (
                            <div className="fill-[#f9f9f9] text-blue-400 size-[20px]">
                                {icons.loading}
                            </div>
                        ) : (
                            <p className="text-[#f9f9f9] text-lg">Submit</p>
                        )
                    }
                />
                <Button
                    className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-red-500 to-red-600 hover:from-orange-500 hover:to-orange-600"
                    onClick={handleAbort}
                    type="submit"
                    btnText={
                        loading ? (
                            <div className="fill-[#f9f9f9] text-blue-400 size-[20px]">
                                {icons.loading}
                            </div>
                        ) : (
                            <p className="text-[#f9f9f9] text-lg">Abort</p>
                        )
                    }
                />
            </div>
        </div>
    );
}
