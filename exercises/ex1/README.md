# Exercise 1 - Build Your First Agent in Joule Studio

> [!NOTE]  
> **Learning Objective**:
>
> - Build your first Agent in Joule Studio that responds to inquiries about business partners
> - Learn how you can test and debug the Agent
> - Create a simple Joule Skill and attach it as a tool to the Agent 
>
> **Time Estimate**: Approximately 30 minutes.

## Exercise Steps

1. Login to Joule Studio
   - Visit [Joule Studio](`jouleStudioUrl`).
   - Login with the username and password that were provided to you.
   - Choose the identity provider containing “ondemand.com” in its name.

2. Create a new environment
   - Go to the Control Tower section and create a new environment.
   - Name the environment with your workstation’s printed number included.

3. Create a Joule Skills project
   - Navigate back to the Lobby.
   - There, create a new Joule Skills project.
   - Use your workstation number again as part of the project name to ensure uniqueness.

4. Start building the Business Partner Invoicing Agent
   - Within your Joule Skills project, create a new Agent with the name above.
   - Prompt the Agent to provide information on known business partners in the Business Partner Invoicing scenario.
   - Use the JSON records below and integrate them as is (hard coded) into the prompt of the Agent.

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
   - Click the Test button towards the right of where you prompted your Agent.
   - While the test package is deployed, think of a good question for the Agent to evaluate it.
   - If the Agent doesn't behave as expected, open the logs view to monitor the thinking and decisions of the Agent.
   - If not already done, ask the Agent “Provide information about the business partners called Cymbal Direct.”. Does the response match the details from the JSON records?

7. Create a new Action Project to outsource the business partners information to an external service
   - Go to Connectors -> Actions to create it and use OData Destination as type.
   - As destination select the `BUSINESS_PARTNER_SERVICE` one.
   - Configure the inputs and outputs as needed
   - Test the action and call the `/BusinessPartners` endpoint (GET).
   - Verify the output matches the business partner information from the hardcoded JSON.

8. Define a Joule Skill in your project that wraps and invokes the action
   - In it configure a Skill Output and pass to it the output of the action call

10. Attach the Joule Skill you just created to your Agent as a tool
    - Remove the hardcoded JSON of the records of the business partners entirely from the prompt.
    - Prompt the Agent to instead call your tool to retrieve the information about the business partners.

11. Retest the Agent
    - Click again the test button, and ask it again “Provide information about the business partner called Cymbal Direct.”
    - Verfiy that the response is the same from earlier
    - Review the logs to confirm that the tool was actually called.

Click [here]() to move to the next exercise, exercise 2.