import { useState } from 'react';

export default function OwnerConnectPage() {
    const [selectedChat, setSelectedChat] = useState(null); // Track selected chat
    const [messages, setMessages] = useState([]); // Track messages for the chat
    const [newMessage, setNewMessage] = useState(''); // Input field for new message

    // Dummy data for chats
    const chats = [
        { id: 1, name: 'STARTUP_1' },
        { id: 2, name: 'STARTUP_2' },
        { id: 3, name: 'STARTUP_3' },
        { id: 4, name: 'STARTUP_4' },
        { id: 5, name: 'STARTUP_5' },
        { id: 6, name: 'STARTUP_6' },
        { id: 7, name: 'STARTUP_7' },
        { id: 8, name: 'STARTUP_8' },
    ];

    // Handle selecting a chat
    const handleChatClick = (chat) => {
        setSelectedChat(chat.name);
        setMessages([
            { sender: 'STARTUP', content: `Welcome to ${chat.name}'s chat!` },
        ]); // Example message
    };

    // Handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { sender: 'You', content: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header />

            {/* Main layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <div className="lg:w-1/4 w-full md:max-w-xs bg-gray-100 border-r border-gray-300 overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 p-4 text-gray-700">
                        Chats
                    </h2>
                    <div className="space-y-1 px-4">
                        {chats.map((chat) => (
                            <button
                                key={chat.id}
                                className={`w-full text-left py-3 px-4 rounded-md ${
                                    selectedChat === chat.name
                                        ? 'bg-gray-300 text-gray-800'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                                onClick={() => handleChatClick(chat)}
                            >
                                {chat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-900 bg-gray-300 ">
                                <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                                    Chat with {selectedChat}
                                </h3>
                            </div>

                            {/* Messages */}
                            <div className="flex-grow h-full p-4 bg-gray-50 overflow-hidden">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center mb-4 ${
                                            msg.sender === 'You'
                                                ? 'justify-end'
                                                : 'justify-start'
                                        }`}
                                    >
                                        {msg.sender === 'STARTUP' && (
                                            <span className="mr-2 text-2xl">
                                                💼
                                            </span>
                                        )}
                                        <p
                                            className={`inline-block px-4 py-2 rounded-lg ${
                                                msg.sender === 'You'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            <strong>{msg.sender}:</strong>{' '}
                                            {msg.content}
                                        </p>
                                        {msg.sender === 'You' && (
                                            <span className="ml-2 text-2xl">
                                                👤
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-300 bg-gray-300">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                    />
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onClick={handleSendMessage}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <h3 className="text-gray-600 text-lg md:text-xl">
                                Select a chat to start messaging.
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
