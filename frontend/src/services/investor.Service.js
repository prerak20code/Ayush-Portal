class InvestorService {
    async getInvestor(id) {
        try {
            const res = await fetch(`/api/v1/investors/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log('error in get investor service, error:', err.message);
            throw err;
        }
    }
}

export const investorService = new InvestorService();
