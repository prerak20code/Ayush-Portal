import { Button } from '..';
import { icons } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegisterStartupContext, useUserContext } from '../../contexts';

export default function StartupReview() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        setCurrentStep(5);
    }, []);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setCompletedSteps((prev) => [...prev, 'reviewd']);
            const res = await startup
        } catch (err) {
            navigate('/server-error');
        }
    }
    async function handleAbort() {
        localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerFinancialInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerOrganisationInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerDocument`);
        alert('starup registration process are been aborted.');
        navigate('/');
    }

    return (
        <div className="p-6 w-full bg-blue-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-green-600 mb-6 text-center">
                Review and Submit the Form
            </h2>
            <div className="text-center">
                // SHOW DATA 
            </div>

            {/* buttons*/}
            <div className="w-full flex items-center justify-center gap-4 mt-4">
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
