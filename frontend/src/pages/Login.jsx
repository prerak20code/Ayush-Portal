import Header from './components/layout/Header';
import Small_Footer from './components/layout/Small_Footer';

function App() {
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col">
            <Header />

            <div className="relative flex-1">
                {/* Background container */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-x-[-1] filter brightness-75"
                    style={{
                        backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/c3/c9/ee/impressive-construction.jpg')`,
                    }}
                />

                <div className="relative z-10 flex items-center justify-center sm:justify-end h-full pr-4 sm:pr-12">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-between">
                        <h1 className="text-3xl font-bold text-center mb-6">
                            Welcome Back!
                        </h1>
                        <form className="flex flex-col space-y-4">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-semibold mb-2"
                                    htmlFor="userId"
                                >
                                    User ID:
                                </label>
                                <input
                                    type="text"
                                    id="userId"
                                    placeholder="Enter your UserID"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-semibold mb-2"
                                    htmlFor="password"
                                >
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your Password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition duration-200"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Small_Footer />
        </div>
    );
}

export default App;
