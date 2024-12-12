import mongoose from 'mongoose';

const ManufacturingLicenseSchema = new mongoose.Schema({
    applicantBusiness: {
        type: String,
        required: true,
    },
    manufacturingFacility: {
        type: String,
        required: true,
    },
    landArea: {
        type: Number, // in square feet
        required: true,
        validate: {
            validator: function (value) {
                return value >= 1200; // Minimum land area requirement
            },
            message: 'Land area must be at least 1200 square feet.',
        },
    },
    gmpCertified: {
        type: Boolean,
        required: true,
        default: false,
    },
    ayurvedicExperts: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 2; // Minimum 2 Ayurvedic experts
            },
            message: 'There must be at least 2 Ayurvedic experts.',
        },
    },
    ayurvedicPharmacists: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 2; // Minimum 2 Ayurvedic pharmacists
            },
            message: 'There must be at least 2 Ayurvedic pharmacists.',
        },
    },
    machineryInstalled: {
        type: Boolean,
        required: true,
        default: false,
    },
    documents: {
        manufacturingLicenseCopy: {
            type: String,
            required: true, // File path or URL
        },
        siteLayout: {
            type: String,
            required: true, // File path or URL
        },
        manufacturingFormula: {
            type: String,
            required: true,
        },
        finishedProductSpecification: {
            type: String,
            required: true,
        },
        coppCertificationProducts: {
            type: [String], // Array of products applied/approved for COPP
            required: true,
        },
        processValidationReport: {
            type: String,
            required: true,
        },
        technicalStaffDetails: {
            type: String,
            required: true,
        },
        equipmentList: {
            type: String,
            required: true,
        },
        waterHVACDiagrams: {
            type: String,
            required: true,
        },
        proofOfSafetyAndEffectiveness: {
            type: String,
            required: true,
        },
        nonHerbalIngredientsUndertaking: {
            type: Boolean,
            default: false,
        },
        complianceUndertaking: {
            type: Boolean,
            default: false,
        },
        kycDetails: {
            type: String,
            required: true,
        },
        premisesAddressProof: {
            type: String,
            required: true,
        },
        businessConstitutionDocument: {
            type: String,
            required: true,
        },
    },
    gmpCertificate: {
        type: String, // File path or URL
        required: true,
    },
    coppCertificate: {
        type: String, // File path or URL
        required: false, // Only if applicable
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model(
    'ManufacturingLicense',
    ManufacturingLicenseSchema
);

//dummy data

// {
//     applicantBusiness: "Herbal Care Pvt Ltd",
//     manufacturingFacility: "Industrial Area, Sector 45, New Delhi, India",
//     landArea: 1500, // in square feet
//     gmpCertified: true,
//     ayurvedicExperts: 2,
//     ayurvedicPharmacists: 2,
//     machineryInstalled: true,
//     documents: {
//         manufacturingLicenseCopy: "uploads/manufacturing_license_copy.pdf",
//         siteLayout: "uploads/site_layout.pdf",
//         manufacturingFormula: "HerbalProductManufacturingFormula",
//         finishedProductSpecification: "uploads/finished_product_specification.pdf",
//         coppCertificationProducts: ["Herbal Oil", "Ayurvedic Soap"],
//         processValidationReport: "uploads/process_validation_report.pdf",
//         technicalStaffDetails: "uploads/technical_staff_details.pdf",
//         equipmentList: "uploads/equipment_list.pdf",
//         waterHVACDiagrams: "uploads/water_hvac_diagrams.pdf",
//         proofOfSafetyAndEffectiveness: "uploads/proof_of_safety_and_effectiveness.pdf",
//         nonHerbalIngredientsUndertaking: true,
//         complianceUndertaking: true,
//         kycDetails: "uploads/kyc_details.pdf",
//         premisesAddressProof: "uploads/premises_address_proof.pdf",
//         businessConstitutionDocument: "uploads/business_constitution_document.pdf",
//     },
//     gmpCertificate: "uploads/gmp_certificate.pdf",
//     coppCertificate: "uploads/copp_certificate.pdf",
//     applicationStatus: "Under Review",
//     createdAt: new Date(),
//     updatedAt: new Date(),
// }
