class StartupService {
    async registerStartup(inputs) {
        try {
            const res = await fetch('/api/v1/startups/add', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log('error in register startup service,error', err.message);
            throw err;
        }
    }
}

export const startupService = new StartupService();
