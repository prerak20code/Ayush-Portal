import { useContext, createContext, useState } from 'react';

const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <PopupContext.Provider value={{ showPopup, setShowPopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export function usePopupContext() {
    return useContext(PopupContext);
}
