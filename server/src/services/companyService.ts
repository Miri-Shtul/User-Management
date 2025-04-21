import { Company } from "../models/Company";

export class CompanyService {
    static async getCompanyById(id: string) {
        try {
            const company = await Company.findById(id);
            if (!company) {
                throw new Error('Company not found');
            }
            console.info('Company fetched successfully', { companyId: id });
            return company;
        } catch (error) {
            console.error('Error fetching company:', error);
            throw error;
        }
    }
}