import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';
import { useUserContext, useRegisterStartupContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';
import {uploadOnS3Service} from "../../services"

export default function StartupOwnerDocuments() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();
    const { user } = useUserContext();

    const initialFiles = {
        startupLogo: null,
        balanceSheet: null,
        governmentIdProof: null,
        GSTCertificate: null,
        businessDocuments: null,
    };
    const [files, setFiles] = useState(initialFiles);
    const initialErrors = {
        root: '',
        startupLogo: '',
        balanceSheet: '',
        governmentIdProof: '',
        GSTCertificate: '',
        businessDocuments: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, files } = e.target;
        setFiles((prev) => ({ ...prev, [name]: files[0] }));
    };

    useEffect(() => {
        setCurrentStep(4);
        const savedData = localStorage.getItem(
            `${user._id}_startupOwnerDocuments`
        );
        if (savedData) {
            setFiles(JSON.parse(savedData));
        }
    }, []);

    function onMouseOver() {
        if (
            Object.values(files).some((value) => !value) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCompletedSteps((prev) => [...prev, 'documents']);
        setTotalData((prev) => ({
            ...prev,
            documents: { data: files, status: 'complete' },
        }));
        localStorage.setItem(
            'documentsInfo',
            JSON.stringify({ ...files, documentsStatus: 'complete' })
        );
        navigate(`/application/${user._id}/review`);
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            'documentsInfo',
            JSON.stringify({ ...files, documentsStatus: 'pending' })
        );
    }

    const fileFields = [
        {
            name: 'startupLogo',
            label: 'Upload Startup Logo',
            required: true,
            icon: icons.image,
            type: 'file',
        },
        {
            name: 'balanceSheet',
            label: 'Upload Balance Sheet',
            required: true,
            icon: icons.money,
            type: 'file',
        },
        {
            name: 'governmentIdProof',
            label: 'Upload any Government ID',
            required: true,
            icon: icons.card,
            type: 'file',
        },
        {
            name: 'GSTCertificate',
            label: 'Upload GST Registration Certificate',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'businessDocuments',
            label: 'Upload Businness Registration Documents',
            required: true,
            icon: icons.file,
            type: 'file',
        },
    ];

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="w-full transition-all ease-in">
            <div className="bg-orange-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="relative">
                {field.icon && (
                    <div className="size-[16px] fill-[#323232] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
                        {field.icon}
                    </div>
                )}
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    accept={field.accept}
                    onChange={handleChange}
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] bg-transparent`}
                />
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-xs font-medium">
                    {errors[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="p-6 w-full bg-orange-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-orange-600 mb-6 text-center">
                Upload Your Documents
            </h2>

            <div className="w-full flex flex-col items-center justify-center gap-3">
                {errors.root ? (
                    <div className="text-red-500 w-full text-center">
                        {errors.root}
                    </div>
                ) : (
                    <p className="text-red-500 w-full text-center text-[15px]">
                        <span className="font-bold">* </span>Indicates
                        compulsory fields
                    </p>
                )}
                {/* Form */}
                <form
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
                    {fileElements}

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setInputs(initialInputs);
                                setErrors(initialErrors);
                                setFlag('');
                            }}
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Reset</p>
                                    <div className="size-[15px] fill-[#f9f9f9]">
                                        {icons.erase}
                                    </div>
                                </div>
                            }
                        />
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            type="submit"
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Save</p>
                                    <div className="size-[14px] fill-[#f9f9f9]">
                                        {icons.next}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}


const DocumentUpload = () => {
    const [documents, setDocuments] = useState({
        startupLogo: {
            s3Name: null, FileName: null
        },
        balanceSheet: {s3Name: null, FileName: null},
        governmentIdProof: {s3Name: null, FileName: null},
        GSTCertificate: {s3Name: null, FileName: null},
        businessDocuments: {s3Name: null, FileName: null},
    });

    const [uploadedDocs, setUploadedDocs] = useState({
        startupLogo: {
            s3Name: null, signedUrl: null
        },
        balanceSheet: {s3Name: null, signedUrl: null},
        governmentIdProof: {s3Name: null, signedUrl: null},
        GSTCertificate: {s3Name: null, signedUrl: null},
        businessDocuments: {s3Name: null, signedUrl: null},
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            setDocuments({
                ...documents,
                [name]: file,
            });
            uploadToBackend(file, name); // Automatically upload the file to the backend as soon as it's selected
        }
    };

    // Handle document upload to the backend
    const uploadToBackend = async (file, docName) => {
        const formData = new FormData();
        formData.append('image', file); // Appending the file as expected by the backend
        formData.append('Documentname', docName); // Adding document name
        formData.append('userId', user._id); // Adding the userId as part of the form data

        try {
            const res = await uploadOnS3Service.uploadDocuments(formData);
            if(res && res.data.signedUrl) {
                // Assuming the backend provides a signed URL for S3 access
                setUploadedDocs({
                    ...uploadedDocs,
                    [docName]: {
                        s3Name: response.data.FileName,
                        signedUrl: response.data.signedUrl,
                    },
                });

                setDocuments({
                    ...documents,
                    [docName]: {
                        s3Name: response.data.FileName,
                        FileName: response.data.document.name,
                    },
                });
                alert('Document uploaded successfully!');
            } else {
                alert('Failed to get document URL from server.');
            }
            // const response = await axios.post(
            //     '/api/documents/upload', // Backend API for file upload
            //     formData,
            //     {
            //         headers: {
            //             'Content-Type': 'multipart/form-data', // Ensuring the request type is set to multipart/form-data
            //         },
            //     }
            // );

            // if (response.data.signedUrl) {
            //     // Assuming the backend provides a signed URL for S3 access
            //     setUploadedDocs({
            //         ...uploadedDocs,
            //         [docName]: {
            //             s3Name: response.data.FileName,
            //             signedUrl: response.data.signedUrl,
            //         },
            //     });

            //     setDocuments({
            //         ...documents,
            //         [docName]: {
            //             s3Name: response.data.FileName,
            //             FileName: response.data.document.name,
            //         },
            //     });

            //     alert('Document uploaded successfully!');
            // } else {
            //     alert('Failed to get document URL from server.');
            // }
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error uploading the document.');
        }
    };

    const handleViewDocument = (docName) => {
        const url = uploadedDocs[docName]?.signedUrl;
        if (url) {
            window.open(url, '_blank'); // Open the document URL in a new tab
        } else {
            alert('Document not found.');
        }
    };

    const handleDeleteDocument = async (docName) => {
        const s3Name = documents[docName].s3Name;
        // Ensure s3Name is correct and exists
        console.log('Deleting document:', s3Name);

        if (!s3Name) {
            alert('Document does not exist.');
            return; // Exit if there's no document to delete
        }

        const token = localStorage.getItem('token');
        console.log('Authorization Token:', token);

        try {
            const res = await 
            // const response = await axios.post(
            //     '/api/documents/delete',
            //     { s3Name, fileName: docName }, // Ensure correct key and value
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             // Authorization: Bearer ${token}, // If auth token is required
            //         },
            //     }
            // );

            console.log('Delete Response:', response);
            if (response.status === 200) {
                setDocuments((prevDocs) => ({
                    ...prevDocs,
                    [docName]: { s3Name: null, FileName: null }, // Clear the deleted document
                }));
                setUploadedDocs((prevUploaded) => ({
                    ...prevUploaded,
                    [docName]: { s3Name: null, FileName: null }, // Clear the uploaded document's URL
                }));

                alert(Document ${docName} deleted successfully!);
            } else {
                alert('Failed to delete document.');
            }
        } catch (error) {
            console.error(
                'Error deleting document:',
                error.response?.data || error
            );
            alert('An error occurred while deleting the document.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Upload Documents
                </h2>
                <form className="space-y-4">
                    {['doc1', 'doc2', 'doc3', 'doc4'].map((doc, index) => (
                        <div key={doc} className="space-y-2">
                            <label
                                className="block font-medium mb-2"
                                htmlFor={doc}
                            >
                                Document {index + 1} (e.g.,{' '}
                                {index === 3 ? 'Optional' : 'Required'})
                            </label>
                            <input
                                type="file"
                                id={doc}
                                name={doc}
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required={index < 3} // Make the first three fields required
                            />
                            {documents[doc] && (
                                <div className="flex justify-between items-center mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handleViewDocument(doc)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteDocument(doc)
                                        }
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default DocumentUpload;