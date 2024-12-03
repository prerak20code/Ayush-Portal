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
    ConnectedStartupsPage,
    // TargettedStartupsPage,
    OwnerConnectPage,
    ServerErrorPage,
    // RegisterYourStartupPage,
} from './pages';

import EmailVerification from './components/EmailVerifiaction/EmailVerification.jsx';

import { LayoutOne, LayoutTwo, LayoutThree, InvestorType } from './components';

import { VariantContextProvider, UserContextProvider } from './contexts';
<<<<<<< HEAD
=======
// import ConnectedStartups from './pages/ConnectedStartups.jsx';
import InvestorType from './Investor Connect/InvestorType.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DocumentsCheck from './pages/DocumentsCheck.jsx';
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<LayoutOne />}>
                <Route path="" element={<HomePage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact-us" element={<ContactUsPage />} />
                <Route path="faqs" element={<FAQpage />} />
                {/* <Route
                    path="user/RegisterYourStartup"
                    element={<RegisterYourStartups />}
<<<<<<< HEAD
                /> */}
=======
                />
               
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf
            </Route>
            <Route path="" element={<LayoutTwo />}>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="user/verify/:userId/:uniqueString"
                    element={<EmailVerification />}
                />
                <Route path="InvestorType" element={<InvestorType />} />
            </Route>
            <Route path="" element={<LayoutThree />}>
                {/* <Route
                    path="connected-startups/:userId"
<<<<<<< HEAD
                    element={<ConnectedStartupsPage />}
                />
            </Route>
            <Route path="/server-error" element={<ServerErrorPage />} />
=======
                    element={<ConnectedStartups />}
                /> */}
            </Route>
            <Route path ="AdminDashboard" element =  {<AdminDashboard/>} />
            <Route path="/startup/:id/documents" element={<DocumentsCheck />} />
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <UserContextProvider>
        <VariantContextProvider>
            <RouterProvider router={router} />
        </VariantContextProvider>
    </UserContextProvider>
    // </StrictMode>
);
