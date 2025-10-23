import cds from "@sap/cds";
import fs from "node:fs/promises";

interface BusinessPartner {
    name: string;
    description: string;
    industry: string;
    country: string;
    street: string;
    zipcode: string;
    city: string;
    emailAddress: string;
    phoneNumber: string;
    checkingAccountNumber: string;
}

const logger = cds.log("BusinessPartnersService");

export default class BusinessPartnersService extends cds.ApplicationService {
    async init(): Promise<void> {
        await super.init();
        this.on("getBusinessPartners", this.getBusinessPartners);
    }

    private getBusinessPartners = async (request: cds.Request): Promise<{ value: BusinessPartner[] }> => {
        try {
            const content = await fs.readFile("srv/business-partners.json", "utf-8");
            const businessPartners = JSON.parse(content) as { value: BusinessPartner[] };
            return businessPartners;
        } catch (error) {
            logger.error(error);
            return { value: [] };
        }
    };
}
