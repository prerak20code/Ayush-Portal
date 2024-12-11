import { createContext, useContext, useState } from 'react';

const RegisterStartupContext = createContext();

export const RegisterStartupContextProvider = ({ children }) => {
    const [existingApp, setExistingApp] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [totalData, setTotalData] = useState({
        personal: {
            data: {},
            status: 'pending',
        },
        organization: { data: {}, status: 'pending' },
        financial: { data: {}, status: 'pending' },
        banking: { data: {}, status: 'pending' },
        reviewd: { status: 'pending' },
    });

    return (
        <RegisterStartupContext.Provider
            value={{
                existingApp,
                setExistingApp,
                currentStep,
                setCurrentStep,
                totalData,
                setTotalData,
                completedSteps,
                setCompletedSteps,
            }}
        >
            {children}
        </RegisterStartupContext.Provider>
    );
};

export function useRegisterStartupContext() {
    return useContext(RegisterStartupContext);
}
