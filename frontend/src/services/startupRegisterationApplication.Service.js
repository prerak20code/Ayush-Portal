class StartupRegistrationApplicationService {
    async startApplication() {
        try {
            const res = await fetch(`/api/v1/applications/start`, {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in starting startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }

    async getApplication() {
        try {
            const res = await fetch(`/api/v1/applications`, {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in getting startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }

    async markApplicationComplete() {
        try {
            const res = await fetch(`/api/v1/applications/complete`, {
                method: 'PATCH',
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in marking complete startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }
}

export const startupRegistrationApplicationService =
    new StartupRegistrationApplicationService();
