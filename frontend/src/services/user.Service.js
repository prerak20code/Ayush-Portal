class UserService {
    async login(inputs) {
        try {
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in login service: ${err.message}`);
            throw err;
        }
    }

    async register(inputs) {
        try {
            const res = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            console.log('1');
            let data = await res.json();
            console.log(data);

            if (res.status === 500) {
                console.log('2');
                throw new Error(data.message);
            }
            // else if (res.status !== 400) {
            //     console.log("3");
            //     data = await this.login({
            //         email: inputs.email,
            //         password: inputs.password,
            //     });
            // }
            return data;
        } catch (err) {
            console.error(`error in register service: ${err.message}`);
            throw err;
        }
    }

    async verifyEmail(userId, uniqueString) {
        try {
            const res = await fetch(
                `/api/v1/users/verify-email/${userId}/${uniqueString}`,
                {
                    method: 'GET',
                }
            );
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            // setStatus('error');
            // setMessage('An error occurred during verification.');
            console.error(
                `error in email verification service: ${err.message}`
            );

            throw err;
        }
    }

    // async logout() {
    //     try {
    //         const res = await fetch(
    //             '/api/v1/users/logout',
    //             {
    //                 method: 'PATCH',
    //                 credentials: 'include',
    //             }
    //         );

    //         const data = await res.json();
    //         console.log(data);

    //         if (res.status === 500) {
    //             throw new Error(data.message);
    //         }
    //         return data;
    //     } catch (err) {
    //         console.error(`error in logout service: ${err.message}`);
    //         throw err;
    //     }
    // }

    async getCurrentUser() {
        try {
            const res = await fetch('/api/v1/users', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in getCurrentUser service: ${err.message}`);
            throw err;
        }
    }

    async refreshAccessToken() {}
}

export const userService = new UserService();
