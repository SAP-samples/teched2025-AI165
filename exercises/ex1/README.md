# Exercise 1 - Build Your First Agent in Joule Studio

> [!NOTE]  
> **Learning Objectives**:
>
> - Build your first Agent in Joule Studio that responds to inquiries about business partners
> - Learn how to test and debug the Agent
> - Create a simple Joule Skill and attach it as a tool to the Agent 
>
> **Time Estimate**: Approximately 30 minutes.

## Exercise Steps

1. Log in to Joule Studio
   - Navigate to [Joule Studio](`jouleStudioUrl`).
   - Log in using the username and password provided to you.
   - Select the identity provider containing "ondemand.com" in its name.

2. Create a new environment
   - Navigate to the Control Tower section and create a new environment.
   - Include your workstation's printed number in the environment name.

3. Create a Joule Skills project
   - Return to the Lobby.
   - Create a new Joule Skills project.
   - Include your workstation number in the project name to ensure uniqueness.

4. Build the Business Partner Invoicing Agent
   - Within your Joule Skills project, create a new Agent with the name "Business Partner Invoicing Agent".
   - Configure the Agent to provide information about known business partners in the Business Partner Invoicing scenario.
   - Use the JSON records below and integrate them as hardcoded data into the Agent's prompt.

   ```json
   {
     "value": [
       {
         "name": "Cymbal Direct",
         "description": "Ships T-Shirts for events like SAP TechEd and SAP Sapphire",
         "industry": "Merchandise",
         "country_code": "US",
         "street": "100 Event Lane",
         "zipcode": "94107",
         "city": "San Francisco",
         "emailAddress": "cymbal@cymbaldirect.com",
         "phoneNumber": "+1-415-555-0100",
         "checkingAccountNumber": "US123456789"
       },
       {
         "name": "Bayern Maschinenbau",
         "description": "Industrial machinery supplier",
         "industry": "Manufacturing",
         "country_code": "DE",
         "street": "Industriestrasse 7",
         "zipcode": "80331",
         "city": "Munich",
         "emailAddress": "info@bayern-mb.de",
         "phoneNumber": "+49-89-1234567",
         "checkingAccountNumber": "DE987654321"
       },
       {
         "name": "London Office Supplies",
         "description": "Office stationery and event materials",
         "industry": "Retail",
         "country_code": "GB",
         "street": "12 Fleet Street",
         "zipcode": "EC4Y 1AA",
         "city": "London",
         "emailAddress": "sales@londonos.co.uk",
         "phoneNumber": "+44-20-7946-0001",
         "checkingAccountNumber": "GB11223344"
       },
       {
         "name": "Sydney Promotions",
         "description": "Event promotional goods and logistics",
         "industry": "Marketing",
         "country_code": "AU",
         "street": "5 Harbour Rd",
         "zipcode": "2000",
         "city": "Sydney",
         "emailAddress": "hello@sydpromos.au",
         "phoneNumber": "+61-2-9012-3456",
         "checkingAccountNumber": "AU55667788"
       },
       {
         "name": "Dublin Tech Partners",
         "description": "IT services and partner integrations",
         "industry": "IT",
         "country_code": "IE",
         "street": "3 Trinity St",
         "zipcode": "D02 F6P9",
         "city": "Dublin",
         "emailAddress": "contact@dublintech.ie",
         "phoneNumber": "+353-1-234-5678",
         "checkingAccountNumber": "IE33445566"
       }
     ]
   }
   ```

5. Test the Agent
   - Click the Test button located to the right of the Agent prompt area.
   - While the test package is being deployed, prepare a suitable question to evaluate the Agent's performance.
   - If the Agent does not behave as expected, open the logs view to monitor the Agent's reasoning and decision-making process.
   - Test the Agent by asking: "Provide information about the business partner called Cymbal Direct." Verify that the response matches the details from the JSON records.

6. Create a new Action Project to externalize business partner information
   - Navigate to Connectors → Actions to create a new action project using OData Destination as the type.
   - Select the `BUSINESS_PARTNER_SERVICE` destination.
   - Configure the inputs and outputs as required.
   - Test the action by calling the `/BusinessPartners` endpoint (GET operation).
   - Verify that the output matches the business partner information from the hardcoded JSON.

7. Define a Joule Skill that wraps and invokes the action
   - Create a new Joule Skill in your project.
   - Configure a Skill Output and pass the output of the action call to it.

8. Attach the Joule Skill to your Agent as a tool
   - Remove the hardcoded JSON records entirely from the Agent's prompt.
   - Update the Agent's prompt to instruct it to call your tool to retrieve business partner information.

9. Retest the Agent
   - Click the test button again and ask: "Provide information about the business partner called Cymbal Direct."
   - Verify that the response is identical to the previous test results.
   - Review the logs to confirm that the tool was successfully invoked.

Click [here](../ex2/README.md) to proceed to the next exercise, Exercise 2.