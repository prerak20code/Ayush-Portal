// import React, { useState } from 'react';
// import PersonalInformation from '../components/RegisterStartup/PersonalInformation';
// import OrgInformation from '../components/RegisterStartup/OrgInformation';
// import FinancialInformation from '../components/RegisterStartup/FinancialInformation';
// import BankingInformation from '../components/RegisterStartup/BankingInformation';

// export default function RegisterYourStartupPage() {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [completedSteps, setCompletedSteps] = useState([]);
//     const [formData, setFormData] = useState({
//         personal: {},
//         organization: {},
//         financial: {},
//         banking: {},
//     });

//     const steps = [
//         'Personal Information',
//         'Organization Information',
//         'Financial Information',
//         'Banking Information',
//         'Review & Submit',
//     ];

//     const isStepComplete = (stepIndex) => completedSteps.includes(stepIndex);

//     const updateStepData = (stepKey, data) => {
//         setFormData((prev) => ({
//             ...prev,
//             [stepKey]: data,
//         }));
//     };

//     const completeCurrentStep = (data) => {
//         const stepKeys = ['personal', 'organization', 'financial', 'banking'];

//         if (stepKeys[currentStep]) {
//             updateStepData(stepKeys[currentStep], data);
//         }

//         setCompletedSteps((prev) => {
//             const updatedSteps = [...prev, currentStep];
//             return [...new Set(updatedSteps)];
//         });

//         if (currentStep < steps.length - 1) {
//             setCurrentStep((prevStep) => prevStep + 1);
//         }
//     };

//     const handleStepClick = (stepIndex) => {
//         if (stepIndex <= currentStep) {
//             setCurrentStep(stepIndex);
//         }
//     };

//     const handleFinalSubmit = async () => {
//         try {
//             const response = await fetch('/api/submit-form', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Form submitted successfully!');
//             } else {
//                 alert('Failed to submit form.');
//             }
//         } catch (error) {
//             console.error('Submission error:', error);
//         }
//     };

//     const renderContent = () => {
//         switch (currentStep) {
//             case 0:
//                 return (
//                     <PersonalInformation
//                         data={formData.personal}
//                         onComplete={(data) => completeCurrentStep(data)}
//                     />
//                 );
//             case 1:
//                 return (
//                     <OrgInformation
//                         data={formData.organization}
//                         onComplete={(data) => completeCurrentStep(data)}
//                     />
//                 );
//             case 2:
//                 return (
//                     <FinancialInformation
//                         data={formData.financial}
//                         onComplete={(data) => completeCurrentStep(data)}
//                     />
//                 );
//             case 3:
//                 return (
//                     <BankingInformation
//                         data={formData.banking}
//                         onComplete={(data) => completeCurrentStep(data)}
//                     />
//                 );
//             case 4:
//                 return (
//                     <div className="p-4">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                             Review and Submit
//                         </h2>
//                         <pre>{JSON.stringify(formData, null, 2)}</pre>
//                         <button
//                             onClick={handleFinalSubmit}
//                             className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg transform hover:scale-105 transition-all duration-300"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 );
//             default:
//                 return <div className="p-4">Unknown Step</div>;
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 to-white">
//             {/* Steps Navigation */}
//             <div className="bg-orange-100 py-6 shadow-lg">
//                 <div className="flex flex-wrap items-center justify-between mx-auto max-w-full px-6 gap-4">
//                     {/* Current Step Label */}
//                     <div className="w-full text-center mb-4">
//                         <h2 className="text-xl font-bold text-orange-600 transition-all duration-300">
//                             Current Step: {steps[currentStep]}
//                         </h2>
//                     </div>

//                     {/* Steps Navigation */}
//                     <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between ">
//                         {steps.map((step, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center w-full sm:w-auto flex-1 cursor-pointer mb-2 sm:mb-0"
//                                 onClick={() => handleStepClick(index)}
//                                 style={{
//                                     pointerEvents:
//                                         index <= currentStep ? 'auto' : 'none',
//                                 }}
//                             >
//                                 {/* Step Circle */}
//                                 <div
//                                     className={`flex items-center justify-center w-16 h-16 rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
//                                         index === currentStep
//                                             ? 'bg-orange-500 text-white border-orange-500 scale-110 shadow-xl'
//                                             : isStepComplete(index)
//                                               ? 'bg-green-400 text-white border-green-400'
//                                               : 'bg-gray-200 text-gray-700 border-gray-300'
//                                     }`}
//                                 >
//                                     {index + 1}
//                                 </div>

//                                 {/* Step Name */}
//                                 <div className="text-center mx-2 sm:mx-4">
//                                     <span
//                                         className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
//                                             index === currentStep
//                                                 ? 'text-orange-600'
//                                                 : 'text-gray-600'
//                                         }`}
//                                     >
//                                         {step}
//                                     </span>
//                                 </div>

//                                 {/* Connecting Line */}
//                                 {index < steps.length - 1 && (
//                                     <div
//                                         className={`w-full sm:h-2 sm:mx-2 h-2 mx-2 transition-all duration-300 ${
//                                             isStepComplete(index + 1)
//                                                 ? 'bg-green-400'
//                                                 : 'bg-gray-300'
//                                         }`}
//                                         style={{
//                                             flex: 1,
//                                             marginLeft: '8px', // Adjust for small screens
//                                         }}
//                                     ></div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Dynamic Content */}
//             <main className="flex-grow flex justify-center items-start py-10">
//                 <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg p-8 transition-all duration-300">
//                     {renderContent()}
//                 </div>
//             </main>
//         </div>
//     );
// }
