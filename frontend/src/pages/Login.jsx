import { useState } from 'react';
import { Header } from '../components';
import Small_Footer from '../components/layout/Small_Footer';
import Owner_Type from '../components/LoginPage/Owner_Type';
import Stakeholder_Type from '../components/LoginPage/Stakeholder_Type';
import Government_Type from '../components/LoginPage/Government_Type';

function App() {
    const [role, setRole] = useState('Startup Owner'); // Default role

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            <div className="relative flex-1 flex items-center justify-center bg-gray-100">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center transform scale-x-[-1] filter brightness-75"
                    style={{
                        backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/c3/c9/ee/impressive-construction.jpg')`,
                    }}
                />

                {/* Main Content */}
                <div className="relative z-10 bg-gray-200 p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <h1 className="text-xl font-bold text-gray-800 mb-4">
                        Welcome Back!
                    </h1>
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Select Your Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Startup Owner">Startup Owner</option>
                        <option value="Stakeholder">Stakeholder</option>
                        <option value="Govt. Official">Govt. Official</option>
                    </select>

                    {/* Conditional Rendering */}
                    {role === 'Startup Owner' && <Owner_Type />}
                    {role === 'Stakeholder' && <Stakeholder_Type />}
                    {role === 'Govt. Official' && <Government_Type />}
                </div>
            </div>
            <Small_Footer />
        </div>
    );
}

export default App;
