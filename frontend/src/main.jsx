// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

import { AboutUsPage, ContactUsPage, FAQpage, HomePage } from './pages';

import RegisterUser from './pages/RegisterUser.jsx';
import Login from './pages/Login.jsx';

<<<<<<< HEAD
import { VariantContextProvider } from './contexts';
=======
import InvestorType from './Investor Connect/InvestorType.jsx';
>>>>>>> 0747724ad644a714da498eadde3171577e7898a1

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<HomePage />} />
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="faqs" element={<FAQpage />} />
            <Route path="register" element={<RegisterUser />} />
            <Route path="login" element={<Login />} />
            <Route path="InvestorType" element={<InvestorType />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <VariantContextProvider>
        <RouterProvider router={router} />
    </VariantContextProvider>
    // </StrictMode>
);
