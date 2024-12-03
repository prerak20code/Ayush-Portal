// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker'; // Import react-datepicker
// import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles
// import {
//     FaUser,
//     FaPhone,
//     FaEnvelope,
//     FaMapMarkerAlt,
//     FaCalendarAlt,
//     FaLinkedin,
// } from 'react-icons/fa';
// import Select from 'react-select'; // React Select for nationality dropdown
// import validator from 'validator'; // For email validation
// import { debounce } from 'lodash'; // Debounce utility to prevent unnecessary filtering

<<<<<<< HEAD
// const PersonalInformation = ({ data = {}, onComplete }) => {
//     const countryList = [
//         { value: 'AF', label: 'Afghanistan' },
//         { value: 'AL', label: 'Albania' },
//         { value: 'DZ', label: 'Algeria' },
//         { value: 'AD', label: 'Andorra' },
//         { value: 'AO', label: 'Angola' },
//         { value: 'AG', label: 'Antigua and Barbuda' },
//         { value: 'AR', label: 'Argentina' },
//         { value: 'AM', label: 'Armenia' },
//         { value: 'AU', label: 'Australia' },
//         { value: 'AT', label: 'Austria' },
//         { value: 'AZ', label: 'Azerbaijan' },
//         { value: 'BS', label: 'Bahamas' },
//         { value: 'BH', label: 'Bahrain' },
//         { value: 'BD', label: 'Bangladesh' },
//         { value: 'BB', label: 'Barbados' },
//         { value: 'BY', label: 'Belarus' },
//         { value: 'BE', label: 'Belgium' },
//         { value: 'BZ', label: 'Belize' },
//         { value: 'BJ', label: 'Benin' },
//         { value: 'BT', label: 'Bhutan' },
//         { value: 'BO', label: 'Bolivia' },
//         { value: 'BA', label: 'Bosnia and Herzegovina' },
//         { value: 'BW', label: 'Botswana' },
//         { value: 'BR', label: 'Brazil' },
//         { value: 'BN', label: 'Brunei' },
//         { value: 'BG', label: 'Bulgaria' },
//         { value: 'BF', label: 'Burkina Faso' },
//         { value: 'BI', label: 'Burundi' },
//         { value: 'CV', label: 'Cabo Verde' },
//         { value: 'KH', label: 'Cambodia' },
//         { value: 'CM', label: 'Cameroon' },
//         { value: 'CA', label: 'Canada' },
//         { value: 'CF', label: 'Central African Republic' },
//         { value: 'TD', label: 'Chad' },
//         { value: 'CL', label: 'Chile' },
//         { value: 'CN', label: 'China' },
//         { value: 'CO', label: 'Colombia' },
//         { value: 'KM', label: 'Comoros' },
//         { value: 'CG', label: 'Congo (Congo-Brazzaville)' },
//         { value: 'CD', label: 'Congo (DRC)' },
//         { value: 'CR', label: 'Costa Rica' },
//         { value: 'CI', label: "Côte d'Ivoire" },
//         { value: 'HR', label: 'Croatia' },
//         { value: 'CU', label: 'Cuba' },
//         { value: 'CY', label: 'Cyprus' },
//         { value: 'CZ', label: 'Czechia (Czech Republic)' },
//         { value: 'DK', label: 'Denmark' },
//         { value: 'DJ', label: 'Djibouti' },
//         { value: 'DM', label: 'Dominica' },
//         { value: 'DO', label: 'Dominican Republic' },
//         { value: 'EC', label: 'Ecuador' },
//         { value: 'EG', label: 'Egypt' },
//         { value: 'SV', label: 'El Salvador' },
//         { value: 'GQ', label: 'Equatorial Guinea' },
//         { value: 'ER', label: 'Eritrea' },
//         { value: 'EE', label: 'Estonia' },
//         { value: 'SZ', label: 'Eswatini (fmr. "Swaziland")' },
//         { value: 'ET', label: 'Ethiopia' },
//         { value: 'FJ', label: 'Fiji' },
//         { value: 'FI', label: 'Finland' },
//         { value: 'FR', label: 'France' },
//         { value: 'GA', label: 'Gabon' },
//         { value: 'GM', label: 'Gambia' },
//         { value: 'GE', label: 'Georgia' },
//         { value: 'DE', label: 'Germany' },
//         { value: 'GH', label: 'Ghana' },
//         { value: 'GR', label: 'Greece' },
//         { value: 'GD', label: 'Grenada' },
//         { value: 'GT', label: 'Guatemala' },
//         { value: 'GN', label: 'Guinea' },
//         { value: 'GW', label: 'Guinea-Bissau' },
//         { value: 'GY', label: 'Guyana' },
//         { value: 'HT', label: 'Haiti' },
//         { value: 'HN', label: 'Honduras' },
//         { value: 'HU', label: 'Hungary' },
//         { value: 'IS', label: 'Iceland' },
//         { value: 'IN', label: 'India' },
//         { value: 'ID', label: 'Indonesia' },
//         { value: 'IR', label: 'Iran' },
//         { value: 'IQ', label: 'Iraq' },
//         { value: 'IE', label: 'Ireland' },
//         { value: 'IL', label: 'Israel' },
//         { value: 'IT', label: 'Italy' },
//         { value: 'JM', label: 'Jamaica' },
//         { value: 'JP', label: 'Japan' },
//         { value: 'JO', label: 'Jordan' },
//         { value: 'KZ', label: 'Kazakhstan' },
//         { value: 'KE', label: 'Kenya' },
//         { value: 'KI', label: 'Kiribati' },
//         { value: 'KW', label: 'Kuwait' },
//         { value: 'KG', label: 'Kyrgyzstan' },
//         { value: 'LA', label: 'Laos' },
//         { value: 'LV', label: 'Latvia' },
//         { value: 'LB', label: 'Lebanon' },
//         { value: 'LS', label: 'Lesotho' },
//         { value: 'LR', label: 'Liberia' },
//         { value: 'LY', label: 'Libya' },
//         { value: 'LI', label: 'Liechtenstein' },
//         { value: 'LT', label: 'Lithuania' },
//         { value: 'LU', label: 'Luxembourg' },
//         { value: 'MG', label: 'Madagascar' },
//         { value: 'MW', label: 'Malawi' },
//         { value: 'MY', label: 'Malaysia' },
//         { value: 'MV', label: 'Maldives' },
//         { value: 'ML', label: 'Mali' },
//         { value: 'MT', label: 'Malta' },
//         { value: 'MH', label: 'Marshall Islands' },
//         { value: 'MR', label: 'Mauritania' },
//         { value: 'MU', label: 'Mauritius' },
//         { value: 'MX', label: 'Mexico' },
//         { value: 'FM', label: 'Micronesia' },
//         { value: 'MD', label: 'Moldova' },
//         { value: 'MC', label: 'Monaco' },
//         { value: 'MN', label: 'Mongolia' },
//         { value: 'ME', label: 'Montenegro' },
//         { value: 'MA', label: 'Morocco' },
//         { value: 'MZ', label: 'Mozambique' },
//         { value: 'MM', label: 'Myanmar (formerly Burma)' },
//         { value: 'NA', label: 'Namibia' },
//         { value: 'NR', label: 'Nauru' },
//         { value: 'NP', label: 'Nepal' },
//         { value: 'NL', label: 'Netherlands' },
//         { value: 'NZ', label: 'New Zealand' },
//         { value: 'NI', label: 'Nicaragua' },
//         { value: 'NE', label: 'Niger' },
//         { value: 'NG', label: 'Nigeria' },
//         { value: 'NO', label: 'Norway' },
//         { value: 'OM', label: 'Oman' },
//         { value: 'PK', label: 'Pakistan' },
//         { value: 'PW', label: 'Palau' },
//         { value: 'PS', label: 'Palestine State' },
//         { value: 'PA', label: 'Panama' },
//         { value: 'PG', label: 'Papua New Guinea' },
//         { value: 'PY', label: 'Paraguay' },
//         { value: 'PE', label: 'Peru' },
//         { value: 'PH', label: 'Philippines' },
//         { value: 'PL', label: 'Poland' },
//         { value: 'PT', label: 'Portugal' },
//         { value: 'QA', label: 'Qatar' },
//         { value: 'RO', label: 'Romania' },
//         { value: 'RU', label: 'Russia' },
//         { value: 'RW', label: 'Rwanda' },
//         { value: 'KN', label: 'Saint Kitts and Nevis' },
//         { value: 'LC', label: 'Saint Lucia' },
//         { value: 'VC', label: 'Saint Vincent and the Grenadines' },
//         { value: 'WS', label: 'Samoa' },
//         { value: 'SM', label: 'San Marino' },
//         { value: 'ST', label: 'Sao Tome and Principe' },
//         { value: 'SA', label: 'Saudi Arabia' },
//         { value: 'SN', label: 'Senegal' },
//         { value: 'RS', label: 'Serbia' },
//         { value: 'SC', label: 'Seychelles' },
//         { value: 'SL', label: 'Sierra Leone' },
//         { value: 'SG', label: 'Singapore' },
//         { value: 'SK', label: 'Slovakia' },
//         { value: 'SI', label: 'Slovenia' },
//         { value: 'SB', label: 'Solomon Islands' },
//         { value: 'SO', label: 'Somalia' },
//         { value: 'ZA', label: 'South Africa' },
//         { value: 'KR', label: 'South Korea' },
//         { value: 'SS', label: 'South Sudan' },
//         { value: 'ES', label: 'Spain' },
//         { value: 'LK', label: 'Sri Lanka' },
//         { value: 'SD', label: 'Sudan' },
//         { value: 'SR', label: 'Suriname' },
//         { value: 'SE', label: 'Sweden' },
//         { value: 'CH', label: 'Switzerland' },
//         { value: 'SY', label: 'Syria' },
//         { value: 'TJ', label: 'Tajikistan' },
//         { value: 'TZ', label: 'Tanzania' },
//         { value: 'TH', label: 'Thailand' },
//         { value: 'TL', label: 'Timor-Leste' },
//         { value: 'TG', label: 'Togo' },
//         { value: 'TO', label: 'Tonga' },
//         { value: 'TT', label: 'Trinidad and Tobago' },
//         { value: 'TN', label: 'Tunisia' },
//         { value: 'TR', label: 'Turkey' },
//         { value: 'TM', label: 'Turkmenistan' },
//         { value: 'TV', label: 'Tuvalu' },
//         { value: 'UG', label: 'Uganda' },
//         { value: 'UA', label: 'Ukraine' },
//         { value: 'AE', label: 'United Arab Emirates' },
//         { value: 'GB', label: 'United Kingdom' },
//         { value: 'US', label: 'United States' },
//         { value: 'UY', label: 'Uruguay' },
//         { value: 'UZ', label: 'Uzbekistan' },
//         { value: 'VU', label: 'Vanuatu' },
//         { value: 'VE', label: 'Venezuela' },
//         { value: 'VN', label: 'Vietnam' },
//         { value: 'YE', label: 'Yemen' },
//         { value: 'ZM', label: 'Zambia' },
//         { value: 'ZW', label: 'Zimbabwe' },
//     ];

//     // State for form fields
//     const [formData, setFormData] = useState({
//         fullName: data.fullName || '',
//         phoneNumber: data.phoneNumber || '',
//         email: data.email || '',
//         address: data.address || '',
//         dateOfBirth: data.dateOfBirth || '',
//         nationality: data.nationality || '', // This should be a valid country code (e.g., "IN")
//         linkedIn: data.linkedIn || '',
//         photo: data.photo || null,
//     });

//     // State for tracking form validation
//     const [isFormComplete, setIsFormComplete] = useState(false);
//     const [nationalityInput, setNationalityInput] = useState(''); // For tracking nationality input
=======
const PersonalInformation = ({ data = {}, onComplete }) => {
    const countryList = [
        { value: 'AF', label: 'Afghanistan' },
        { value: 'AL', label: 'Albania' },
        { value: 'DZ', label: 'Algeria' },
        { value: 'AD', label: 'Andorra' },
        { value: 'AO', label: 'Angola' },
        { value: 'AG', label: 'Antigua and Barbuda' },
        { value: 'AR', label: 'Argentina' },
        { value: 'AM', label: 'Armenia' },
        { value: 'AU', label: 'Australia' },
        { value: 'AT', label: 'Austria' },
        { value: 'AZ', label: 'Azerbaijan' },
        { value: 'BS', label: 'Bahamas' },
        { value: 'BH', label: 'Bahrain' },
        { value: 'BD', label: 'Bangladesh' },
        { value: 'BB', label: 'Barbados' },
        { value: 'BY', label: 'Belarus' },
        { value: 'BE', label: 'Belgium' },
        { value: 'BZ', label: 'Belize' },
        { value: 'BJ', label: 'Benin' },
        { value: 'BT', label: 'Bhutan' },
        { value: 'BO', label: 'Bolivia' },
        { value: 'BA', label: 'Bosnia and Herzegovina' },
        { value: 'BW', label: 'Botswana' },
        { value: 'BR', label: 'Brazil' },
        { value: 'BN', label: 'Brunei' },
        { value: 'BG', label: 'Bulgaria' },
        { value: 'BF', label: 'Burkina Faso' },
        { value: 'BI', label: 'Burundi' },
        { value: 'CV', label: 'Cabo Verde' },
        { value: 'KH', label: 'Cambodia' },
        { value: 'CM', label: 'Cameroon' },
        { value: 'CA', label: 'Canada' },
        { value: 'CF', label: 'Central African Republic' },
        { value: 'TD', label: 'Chad' },
        { value: 'CL', label: 'Chile' },
        { value: 'CN', label: 'China' },
        { value: 'CO', label: 'Colombia' },
        { value: 'KM', label: 'Comoros' },
        { value: 'CG', label: 'Congo (Congo-Brazzaville)' },
        { value: 'CD', label: 'Congo (DRC)' },
        { value: 'CR', label: 'Costa Rica' },
        { value: 'CI', label: "Côte d'Ivoire" },
        { value: 'HR', label: 'Croatia' },
        { value: 'CU', label: 'Cuba' },
        { value: 'CY', label: 'Cyprus' },
        { value: 'CZ', label: 'Czechia (Czech Republic)' },
        { value: 'DK', label: 'Denmark' },
        { value: 'DJ', label: 'Djibouti' },
        { value: 'DM', label: 'Dominica' },
        { value: 'DO', label: 'Dominican Republic' },
        { value: 'EC', label: 'Ecuador' },
        { value: 'EG', label: 'Egypt' },
        { value: 'SV', label: 'El Salvador' },
        { value: 'GQ', label: 'Equatorial Guinea' },
        { value: 'ER', label: 'Eritrea' },
        { value: 'EE', label: 'Estonia' },
        { value: 'SZ', label: 'Eswatini (fmr. "Swaziland")' },
        { value: 'ET', label: 'Ethiopia' },
        { value: 'FJ', label: 'Fiji' },
        { value: 'FI', label: 'Finland' },
        { value: 'FR', label: 'France' },
        { value: 'GA', label: 'Gabon' },
        { value: 'GM', label: 'Gambia' },
        { value: 'GE', label: 'Georgia' },
        { value: 'DE', label: 'Germany' },
        { value: 'GH', label: 'Ghana' },
        { value: 'GR', label: 'Greece' },
        { value: 'GD', label: 'Grenada' },
        { value: 'GT', label: 'Guatemala' },
        { value: 'GN', label: 'Guinea' },
        { value: 'GW', label: 'Guinea-Bissau' },
        { value: 'GY', label: 'Guyana' },
        { value: 'HT', label: 'Haiti' },
        { value: 'HN', label: 'Honduras' },
        { value: 'HU', label: 'Hungary' },
        { value: 'IS', label: 'Iceland' },
        { value: 'IN', label: 'India' },
        { value: 'ID', label: 'Indonesia' },
        { value: 'IR', label: 'Iran' },
        { value: 'IQ', label: 'Iraq' },
        { value: 'IE', label: 'Ireland' },
        { value: 'IL', label: 'Israel' },
        { value: 'IT', label: 'Italy' },
        { value: 'JM', label: 'Jamaica' },
        { value: 'JP', label: 'Japan' },
        { value: 'JO', label: 'Jordan' },
        { value: 'KZ', label: 'Kazakhstan' },
        { value: 'KE', label: 'Kenya' },
        { value: 'KI', label: 'Kiribati' },
        { value: 'KW', label: 'Kuwait' },
        { value: 'KG', label: 'Kyrgyzstan' },
        { value: 'LA', label: 'Laos' },
        { value: 'LV', label: 'Latvia' },
        { value: 'LB', label: 'Lebanon' },
        { value: 'LS', label: 'Lesotho' },
        { value: 'LR', label: 'Liberia' },
        { value: 'LY', label: 'Libya' },
        { value: 'LI', label: 'Liechtenstein' },
        { value: 'LT', label: 'Lithuania' },
        { value: 'LU', label: 'Luxembourg' },
        { value: 'MG', label: 'Madagascar' },
        { value: 'MW', label: 'Malawi' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'MV', label: 'Maldives' },
        { value: 'ML', label: 'Mali' },
        { value: 'MT', label: 'Malta' },
        { value: 'MH', label: 'Marshall Islands' },
        { value: 'MR', label: 'Mauritania' },
        { value: 'MU', label: 'Mauritius' },
        { value: 'MX', label: 'Mexico' },
        { value: 'FM', label: 'Micronesia' },
        { value: 'MD', label: 'Moldova' },
        { value: 'MC', label: 'Monaco' },
        { value: 'MN', label: 'Mongolia' },
        { value: 'ME', label: 'Montenegro' },
        { value: 'MA', label: 'Morocco' },
        { value: 'MZ', label: 'Mozambique' },
        { value: 'MM', label: 'Myanmar (formerly Burma)' },
        { value: 'NA', label: 'Namibia' },
        { value: 'NR', label: 'Nauru' },
        { value: 'NP', label: 'Nepal' },
        { value: 'NL', label: 'Netherlands' },
        { value: 'NZ', label: 'New Zealand' },
        { value: 'NI', label: 'Nicaragua' },
        { value: 'NE', label: 'Niger' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'NO', label: 'Norway' },
        { value: 'OM', label: 'Oman' },
        { value: 'PK', label: 'Pakistan' },
        { value: 'PW', label: 'Palau' },
        { value: 'PS', label: 'Palestine State' },
        { value: 'PA', label: 'Panama' },
        { value: 'PG', label: 'Papua New Guinea' },
        { value: 'PY', label: 'Paraguay' },
        { value: 'PE', label: 'Peru' },
        { value: 'PH', label: 'Philippines' },
        { value: 'PL', label: 'Poland' },
        { value: 'PT', label: 'Portugal' },
        { value: 'QA', label: 'Qatar' },
        { value: 'RO', label: 'Romania' },
        { value: 'RU', label: 'Russia' },
        { value: 'RW', label: 'Rwanda' },
        { value: 'KN', label: 'Saint Kitts and Nevis' },
        { value: 'LC', label: 'Saint Lucia' },
        { value: 'VC', label: 'Saint Vincent and the Grenadines' },
        { value: 'WS', label: 'Samoa' },
        { value: 'SM', label: 'San Marino' },
        { value: 'ST', label: 'Sao Tome and Principe' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'SN', label: 'Senegal' },
        { value: 'RS', label: 'Serbia' },
        { value: 'SC', label: 'Seychelles' },
        { value: 'SL', label: 'Sierra Leone' },
        { value: 'SG', label: 'Singapore' },
        { value: 'SK', label: 'Slovakia' },
        { value: 'SI', label: 'Slovenia' },
        { value: 'SB', label: 'Solomon Islands' },
        { value: 'SO', label: 'Somalia' },
        { value: 'ZA', label: 'South Africa' },
        { value: 'KR', label: 'South Korea' },
        { value: 'SS', label: 'South Sudan' },
        { value: 'ES', label: 'Spain' },
        { value: 'LK', label: 'Sri Lanka' },
        { value: 'SD', label: 'Sudan' },
        { value: 'SR', label: 'Suriname' },
        { value: 'SE', label: 'Sweden' },
        { value: 'CH', label: 'Switzerland' },
        { value: 'SY', label: 'Syria' },
        { value: 'TJ', label: 'Tajikistan' },
        { value: 'TZ', label: 'Tanzania' },
        { value: 'TH', label: 'Thailand' },
        { value: 'TL', label: 'Timor-Leste' },
        { value: 'TG', label: 'Togo' },
        { value: 'TO', label: 'Tonga' },
        { value: 'TT', label: 'Trinidad and Tobago' },
        { value: 'TN', label: 'Tunisia' },
        { value: 'TR', label: 'Turkey' },
        { value: 'TM', label: 'Turkmenistan' },
        { value: 'TV', label: 'Tuvalu' },
        { value: 'UG', label: 'Uganda' },
        { value: 'UA', label: 'Ukraine' },
        { value: 'AE', label: 'United Arab Emirates' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'US', label: 'United States' },
        { value: 'UY', label: 'Uruguay' },
        { value: 'UZ', label: 'Uzbekistan' },
        { value: 'VU', label: 'Vanuatu' },
        { value: 'VE', label: 'Venezuela' },
        { value: 'VN', label: 'Vietnam' },
        { value: 'YE', label: 'Yemen' },
        { value: 'ZM', label: 'Zambia' },
        { value: 'ZW', label: 'Zimbabwe' },
    ];
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: type === 'file' ? files[0] : value,
//         }));
//     };

//     const handleDateChange = (date) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             dateOfBirth: date ? date.toISOString().split('T')[0] : '', // Store in YYYY-MM-DD format
//         }));
//     };

//     // Handle nationality change from select
//     const handleNationalityChange = (selectedOption) => {
//         console.log('Selected Option:', selectedOption);
//         setFormData((prevData) => ({
//             ...prevData,
//             nationality: selectedOption ? selectedOption.value : '', // Correctly set nationality value
//         }));
//     };

//     // Validate form completeness
//     const validateForm = () => {
//         const requiredFields = [
//             'fullName',
//             'phoneNumber',
//             'email',
//             'address',
//             'dateOfBirth',
//             'nationality',
//         ];
//         const isComplete =
//             requiredFields.every((field) => formData[field]?.trim() !== '') &&
//             validator.isEmail(formData.email) &&
//             validateEmailDomain(formData.email);

//         setIsFormComplete(isComplete);
//     };

//     // Custom email domain validation
//     const validateEmailDomain = (email) => {
//         // Check if email ends with popular domains like gmail.com or email.com
//         const validDomains = [
//             'gmail.com',
//             'email.com',
//             'outlook.com',
//             'yahoo.com',
//         ];
//         return validDomains.some((domain) => email.endsWith(domain));
//     };

//     // Call validateForm on every change
//     useEffect(() => {
//         validateForm();
//     }, [formData]);

<<<<<<< HEAD
//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormComplete) {
//             // Pass the completed data back to the parent component
//             onComplete(formData);
//         } else {
//             alert(
//                 'Please complete all required fields and ensure email is valid.'
//             );
//         }
//     };
=======
    // Custom email domain validation
    const validateEmailDomain = (email) => {
        // Check if email ends with popular domains like gmail.com or email.com
        const validDomains = [
            'gmail.com',
            'email.com',
            'outlook.com',
            'yahoo.com',
        ];
        return validDomains.some((domain) => email.endsWith(domain));
    };
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf

//     // Debounce the nationality input to avoid excessive filtering
//     const debouncedInputChange = debounce((inputValue) => {
//         setNationalityInput(inputValue);
//     }, 300); // 300ms debounce time

<<<<<<< HEAD
//     return (
//         <div className="p-6 bg-orange-100 rounded-lg shadow-md border border-gray-200">
//             {/* Section Title */}
//             <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//                 Founder/Co-Founder Personal Information
//             </h2>
=======
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormComplete) {
            // Pass the completed data back to the parent component
            onComplete(formData);
        } else {
            alert(
                'Please complete all required fields and ensure email is valid.'
            );
        }
    };
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf

//             {/* Form */}
//             <form className="space-y-6" onSubmit={handleSubmit}>
//                 {/* Full Name */}
//                 <div className="flex items-center space-x-3">
//                     <FaUser className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder="Enter full name"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                         />
//                     </div>
//                 </div>
//                 {/* Other Fields */} {/* Phone Number */}
//                 <div className="flex items-center space-x-3">
//                     <FaPhone className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Phone Number
//                         </label>
//                         <input
//                             type="tel"
//                             name="phoneNumber"
//                             placeholder="Enter phone number"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                         />
//                     </div>
//                 </div>
//                 {/* Email */}
//                 <div className="flex items-center space-x-3">
//                     <FaEnvelope className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter email address"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                         />
//                     </div>
//                 </div>
//                 {/* Address */}
//                 <div className="flex items-center space-x-3">
//                     <FaMapMarkerAlt className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Address
//                         </label>
//                         <textarea
//                             name="address"
//                             placeholder="Enter complete address"
//                             rows="3"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                         ></textarea>
//                     </div>
//                 </div>
//                 {/* Date of Birth */}
//                 <div className="flex items-center space-x-3">
//                     <FaCalendarAlt className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Date of Birth
//                         </label>
//                         <DatePicker
//                             selected={
//                                 formData.dateOfBirth
//                                     ? new Date(formData.dateOfBirth)
//                                     : null
//                             }
//                             onChange={handleDateChange}
//                             dateFormat="yyyy-MM-dd"
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                             placeholderText="Select your date of birth"
//                             required
//                         />
//                     </div>
//                 </div>
//                 {/* Nationality */}
//                 <div className="flex items-center space-x-3">
//                     <FaUser className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Nationality
//                         </label>
//                         <Select
//                             options={countryList}
//                             value={
//                                 countryList.find(
//                                     (option) =>
//                                         option.value === formData.nationality
//                                 ) || null
//                             }
//                             onChange={handleNationalityChange}
//                             onInputChange={debouncedInputChange}
//                             placeholder="Select your nationality"
//                             isClearable={true} // Allow clearing selection
//                             filterOption={(candidate, input) =>
//                                 candidate.label
//                                     .toLowerCase()
//                                     .includes(input.toLowerCase())
//                             }
//                             className="mt-1"
//                         />
//                     </div>
//                 </div>
//                 {/* LinkedIn Profile */}
//                 <div className="flex items-center space-x-3">
//                     <FaLinkedin className="text-orange-500" />
//                     <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700">
//                             LinkedIn Profile (Optional)
//                         </label>
//                         <input
//                             type="url"
//                             name="linkedIn"
//                             placeholder="Enter LinkedIn profile URL"
//                             value={formData.linkedIn}
//                             onChange={handleChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                         />
//                     </div>
//                 </div>
//                 {/* Submit Button */}{' '}
//                 <div className="text-center">
//                     <button
//                         type="submit"
//                         className={`py-2 px-6 rounded-md font-semibold text-white ${
//                             isFormComplete
//                                 ? 'bg-orange-500 hover:bg-orange-600'
//                                 : 'bg-gray-400 cursor-not-allowed'
//                         }`}
//                         disabled={!isFormComplete}
//                     >
//                         Save Information
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

<<<<<<< HEAD
// export default PersonalInformation;
=======
    return (
        <div className="p-6 bg-orange-100 rounded-lg shadow-md border border-gray-200">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                Founder/Co-Founder Personal Information
            </h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="flex items-center space-x-3">
                    <FaUser className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>
                {/* Other Fields */} {/* Phone Number */}
                <div className="flex items-center space-x-3">
                    <FaPhone className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>
                {/* Email */}
                <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>
                {/* Address */}
                <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            name="address"
                            placeholder="Enter complete address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        ></textarea>
                    </div>
                </div>
                {/* Date of Birth */}
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <DatePicker
                            selected={
                                formData.dateOfBirth
                                    ? new Date(formData.dateOfBirth)
                                    : null
                            }
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            placeholderText="Select your date of birth"
                            required
                        />
                    </div>
                </div>
                {/* Nationality */}
                <div className="flex items-center space-x-3">
                    <FaUser className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Nationality
                        </label>
                        <Select
                            options={countryList}
                            value={
                                countryList.find(
                                    (option) =>
                                        option.value === formData.nationality
                                ) || null
                            }
                            onChange={handleNationalityChange}
                            onInputChange={debouncedInputChange}
                            placeholder="Select your nationality"
                            isClearable={true} // Allow clearing selection
                            filterOption={(candidate, input) =>
                                candidate.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            className="mt-1"
                        />
                    </div>
                </div>
                {/* LinkedIn Profile */}
                <div className="flex items-center space-x-3">
                    <FaLinkedin className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            LinkedIn Profile (Optional)
                        </label>
                        <input
                            type="url"
                            name="linkedIn"
                            placeholder="Enter LinkedIn profile URL"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>
                {/* Submit Button */}{' '}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`py-2 px-6 rounded-md font-semibold text-white ${
                            isFormComplete
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isFormComplete}
                    >
                        Save Information
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
>>>>>>> 05e8d532690256bde70d9f4f32dd6a1b664f24bf
