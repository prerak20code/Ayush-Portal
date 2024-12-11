import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterInvestorContext } from '../contexts';
import { icons } from '../assets/icons';

export default function RegisterInvestorPage() {
    const location = useLocation();
    const pathname = location.pathname;
    const currentURL = pathname.split('/').pop();
    const { currentStep, setCurrentStep, totalData, setTotalData } =
        useRegisterInvestorContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    console.log('total', totalData);
    const steps = [
        {
            name: 'Personal Information',
            path: 'personal',
            onClick: () => setCurrentStep(0),
            status: totalData.personal?.status,
        },
        {
            name: 'Financial Information',
            path: 'financial',
            onClick: () => setCurrentStep(1),
            status: totalData.financial?.status,
        },
        {
            name: 'Banking Information',
            path: 'banking',
            onClick: () => setCurrentStep(2),
            status: totalData.banking?.status,
        },
        {
            name: 'Upload Documents',
            path: 'documents',
            onClick: () => setCurrentStep(3),
            status: totalData.documents?.status,
        },
        {
            name: 'Review & Submit',
            path: 'document',
            onClick: () => setCurrentStep(4),
            status: totalData.reviewd?.status,
        },
    ];

    const stepElements = steps.map((step, index) => (
        <NavLink
            className="cursor-pointer flex flex-col items-center justify-center gap-2"
            key={step.name}
            to={step.path}
            onClick={step.onClick}
        >
            {/* Circle */}
            <div
                className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep === index
                        ? 'bg-[#f68533] text-white shadow-lg scale-105'
                        : step.status === 'complete'
                          ? 'bg-green-600 text-[#f9f9f9] shadow-md'
                          : 'bg-[#f9f9f9] text-[#040606] shadow-md'
                }`}
            >
                {index + 1}
            </div>

            {/* Step Name */}
            <div
                className={`text-sm md:text-[15px] text-wrap max-w-[100px] font-medium text-center ${
                    currentStep === index
                        ? 'text-[#f68533]'
                        : step.status === 'complete'
                          ? 'text-green-600'
                          : 'text-[#040606]'
                }`}
            >
                {step.name}
            </div>

            {/* Connecting Line */}
            {index < steps.length && (
                <div
                    className={`w-full h-[3px] ${
                        currentStep === index
                            ? 'bg-[#f68533]'
                            : step.status === 'complete'
                              ? 'bg-green-400'
                              : 'bg-[#f9f9f9]'
                    }`}
                />
            )}
        </NavLink>
    ));

    useEffect(() => {
        const step = steps.find((step) => step.path === currentURL);
        step?.onClick();
    }, [currentURL]);

    useEffect(() => {
        try {
            setLoading(true);

            let res = localStorage.getItem('InvestorPersonalInfo');
            const { personalInfoStatus, ...personalInfo } = JSON.parse(
                res || '{}'
            ); // Default to empty object

            res = localStorage.getItem('InvestorFinancialInfo');
            const { financialInfoStatus, ...financialInfo } = JSON.parse(
                res || '{}'
            );

            res = localStorage.getItem('InvestorBankingInfo');
            const { bankingInfoStatus, ...bankingInfo } = JSON.parse(
                res || '{}'
            );

            res = localStorage.getItem('InvestorDocuments');
            const { documentsStatus, ...documentsInfo } = JSON.parse(
                res || '{}'
            );

            res = localStorage.getItem('InvestorReviewd');
            const { reviewdStatus } = JSON.parse(res || '{}');

            const data = {
                personal: {
                    data: personalInfo || null,
                    status: personalInfoStatus,
                },
                financial: {
                    data: financialInfo || null,
                    status: financialInfoStatus,
                },
                banking: {
                    data: bankingInfo || null,
                    status: bankingInfoStatus,
                },
                documents: {
                    data: documentsInfo || null,
                    status: documentsStatus,
                },
                reviewd: {
                    status: reviewdStatus,
                },
            };

            setTotalData(data);
        } catch (err) {
            navigate('/server-error');
        } finally {
            setLoading(false);
        }
    }, []);

    return loading ? (
        <div className="w-full fill-[#f68533] text-white size-[30px]">
            {icons.loading}
        </div>
    ) : (
        <div className="w-screen min-h-[calc(100vh-110px)] bg-[#fff7f2] flex flex-col items-center">
            {/* steps */}
            <div className="bg-[#ffd7bb] overflow-x-scroll drop-shadow-md p-4 w-full flex flex-col items-center justify-start gap-8">
                <h1 className="text-center font-semibold text-2xl drop-shadow-md">
                    {steps[currentStep].name}
                </h1>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full transition-all ease-in">
                    {stepElements}
                </div>
            </div>

            {/* forms */}
            <div className="w-full p-4 flex items-center justify-center">
                <div className="bg-white max-w-xl w-full drop-shadow-md rounded-md flex items-center justify-center p-4 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
