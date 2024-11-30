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

import InvestorType from './Investor Connect/InvestorType.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
        <Route path="/">
            <Route path="" element={<HomePage />} />
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="faqs" element={<FAQpage />} />
            <Route path="Registration" element={<RegisterUser />} />
            <Route path="Login" element={<Login />} />
            <Route path="InvestorType" element={<InvestorType />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
);
