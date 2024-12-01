import React, { useState } from 'react';
import { Header, Footer } from '../components';
import PersonalInformation from '../components/RegisterStartup/PersonalInformation';
import OrgInformation from '../components/RegisterStartup/OrgInformation';
import FinancialInformation from '../components/RegisterStartup/FinancialInformation';
import BankingInformation from '../components/RegisterStartup/BankingInformation';

export default function HomePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [formData, setFormData] = useState({
        personal: {},
        organization: {},
        financial: {},
        banking: {},
    });

    const steps = [
        'Personal Information',
        'Organization Information',
        'Financial Information',
        'Banking Information',
        'Review & Submit',
    ];

    const isStepComplete = (stepIndex) => completedSteps.includes(stepIndex);

    const updateStepData = (stepKey, data) => {
        setFormData((prev) => ({
            ...prev,
            [stepKey]: data,
        }));
    };

    const completeCurrentStep = (data) => {
        const stepKeys = ['personal', 'organization', 'financial', 'banking'];

        // Update formData for the current step
        if (stepKeys[currentStep]) {
            updateStepData(stepKeys[currentStep], data);
        }

        // Mark current step as complete
        setCompletedSteps((prev) => {
            const updatedSteps = [...prev, currentStep];
            return [...new Set(updatedSteps)];
        });

        // Move to the next step
        if (currentStep < steps.length - 1) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handleStepClick = (stepIndex) => {
        // Allow navigation only to completed or current steps
        if (stepIndex <= currentStep) {
            setCurrentStep(stepIndex);
        }
    };

    const handleFinalSubmit = async () => {
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form.');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    const renderContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PersonalInformation
                        data={formData.personal}
                        onComplete={(data) => completeCurrentStep(data)}
                    />
                );
            case 1:
                return (
                    <OrgInformation
                        data={formData.organization}
                        onComplete={(data) => completeCurrentStep(data)}
                    />
                );
            case 2:
                return (
                    <FinancialInformation
                        data={formData.financial}
                        onComplete={(data) => completeCurrentStep(data)}
                    />
                );
            case 3:
                return (
                    <BankingInformation
                        data={formData.banking}
                        onComplete={(data) => completeCurrentStep(data)}
                    />
                );
            case 4:
                return (
                    <div className="p-4">
                        <h2>Review and Submit</h2>
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                        <button
                            onClick={handleFinalSubmit}
                            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                );
            default:
                return <div className="p-4">Unknown Step</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 to-white">
            <Header />

            {/* Steps Navigation */}
            <div className="bg-orange-100 py-6 shadow-sm">
                <div className="flex items-center justify-between mx-auto max-w-full px-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full"
                            onClick={() => handleStepClick(index)}
                            style={{
                                cursor:
                                    index <= currentStep
                                        ? 'pointer'
                                        : 'default',
                            }}
                        >
                            {/* Circle for each step */}
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-semibold ${
                                    index === currentStep
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : isStepComplete(index)
                                          ? 'bg-green-400 text-white border-green-400'
                                          : 'bg-gray-200 text-gray-700 border-gray-300'
                                }`}
                            >
                                {index + 1}
                            </div>

                            {/* Line or Arrow between steps */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-full h-1 mx-2 ${
                                        isStepComplete(index + 1)
                                            ? 'bg-green-400'
                                            : 'bg-gray-300'
                                    }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Content */}
            <main className="flex-grow flex justify-center items-start py-10">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
                    {renderContent()}
                </div>
            </main>

            <Footer />
        </div>
    );
}
