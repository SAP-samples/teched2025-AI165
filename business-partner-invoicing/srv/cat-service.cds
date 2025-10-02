using schema from '../db/schema';

service BusinessPartnersService {
    entity BusinessPartners as projection on schema.BusinessPartners;
}
