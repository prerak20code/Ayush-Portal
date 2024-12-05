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
    // ConnectedStartupsPage,
    // TargettedStartupsPage,
    // OwnerConnectPage,
    ServerErrorPage,
    NotFoundPage,
    RegisterYourStartupPage,
} from './pages';

import {
    LayoutOne,
    LayoutTwo,
    LayoutThree,
    // InvestorType,
    EmailVerification,
    ResetPassword,
    Redirect,
    FinancialInformation,
    BankingInformation,
    PersonalInformation,
    OrganizationInformation,
    Review,
} from './components';

import {
    ProfileDropdownContextProvider,
    VariantContextProvider,
    UserContextProvider,
    RegisterStartupContextProvider,
} from './contexts';

// import ConnectedStartups from './pages/ConnectedStartups.jsx';
// import InvestorType from './InvestorConnect/InvestorType.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DocumentsCheck from './pages/DocumentsCheck.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<LayoutOne />}>
                <Route path="" element={<HomePage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact-us" element={<ContactUsPage />} />
                <Route path="faqs" element={<FAQpage />} />
                <Route
                    path="user/register-startup"
                    element={
                        <RegisterStartupContextProvider>
                            <RegisterYourStartupPage />
                        </RegisterStartupContextProvider>
                    }
                >
                    {/* Default to PersonalInformation for empty path */}
                    <Route index element={<PersonalInformation />} />
                    <Route path="personal" element={<PersonalInformation />} />
                    <Route
                        path="organization"
                        element={<OrganizationInformation />}
                    />
                    <Route
                        path="financial"
                        element={<FinancialInformation />}
                    />
                    <Route path="banking" element={<BankingInformation />} />
                    <Route path="review" element={<Review />} />
                </Route>
            </Route>
            <Route path="" element={<LayoutTwo />}>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="user/verify/:userId/:uniqueString"
                    element={
                        <Redirect path="/" ifLoggedIn={true}>
                            <EmailVerification />
                        </Redirect>
                    }
                />
                <Route
                    path="user/reset-password/:userId/:resetString"
                    element={
                        <Redirect path="/login">
                            <ResetPassword />
                        </Redirect>
                    }
                />
                {/* <Route path="InvestorType" element={<InvestorType />} /> */}
            </Route>
            <Route path="" element={<LayoutThree />}>
                {/* <Route
                    path="connected-startups/:userId"
                    element={<ConnectedStartups />}
                /> */}
            </Route>
            <Route
                path="AdminDashboard"
                element={
                    <Redirect path="/login">
                        <AdminDashboard />
                    </Redirect>
                }
            />
            <Route
                path="/startup/:id/documents"
                element={
                    <Redirect path="/login">
                        <DocumentsCheck />
                    </Redirect>
                }
            />
            <Route path="/server-error" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <UserContextProvider>
        <ProfileDropdownContextProvider>
            <VariantContextProvider>
                <RouterProvider router={router} />
            </VariantContextProvider>
        </ProfileDropdownContextProvider>
    </UserContextProvider>
    // </StrictMode>
);
