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

import {
    AboutUsPage,
    ContactUsPage,
    FAQpage,
    HomePage,
    RegisterPage,
    LoginPage,
} from './pages';

import { LayoutOne, LayoutTwo } from './components';

import { VariantContextProvider } from './contexts';
// import InvestorType from './Investor Connect/InvestorType.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<LayoutOne />}>
                <Route path="" element={<HomePage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact-us" element={<ContactUsPage />} />
                <Route path="faqs" element={<FAQpage />} />
            </Route>
            <Route path="" element={<LayoutTwo />}>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>
            {/* <Route path="InvestorType" element={<InvestorType />} /> */}
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
