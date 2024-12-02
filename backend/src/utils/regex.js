export const validateRegex = async (fieldType, value) => {
    if (value) {
        switch (fieldType) {
            case 'email': {
                if (
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/.test(
                        value
                    )
                ) {
                    return 'please enter a valid email.';
                }
            }

            case 'name': {
                if (/^[a-zA-Z ]*$/.test(value)) {
                    return 'only letters are allowed and should not exceed 15 characters.';
                }
            }

            case 'password':
            case 'newPassword': {
                if (value.length <= 8 && value.length >= 12) {
                    return 'Password length should be at least 8 characters';
                }
            }

            case 'dateOfBirth': {
                if (isNaN(new Date(dateOfBirth).getTime())) {
                    return 'Invalid DOB entered';
                }
            }

            default: {
                console.log("Doesn't have a defined regex.");
                return;
            }
        }
    }
};
