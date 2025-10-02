using {
      cuid,
      Country
} from '@sap/cds/common';

namespace schema;

entity BusinessPartners : cuid {
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
