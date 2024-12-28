import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
//
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        setUser(userInfo);

        // if (!userInfo) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const chatState = () => {
    return useContext(ChatContext);
};
