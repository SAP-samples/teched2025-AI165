using {Country} from '@sap/cds/common';

@path: '/business-partners'
service BusinessPartnerService {

    type BusinessPartner {
        name                  : String;
        description           : String;
        industry              : String;
        country               : Country;
        street                : String;
        zipcode               : String;
        city                  : String;
        emailAddress          : String;
        phoneNumber           : String;
        checkingAccountNumber : String;
    }

    function getBusinessPartners() returns {
        value : array of BusinessPartner;
    };
}
