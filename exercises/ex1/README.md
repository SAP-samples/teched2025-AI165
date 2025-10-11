# Exercise 1 - Build Your First Agent in Joule Studio

### Learning Objective
Learn how to create and test an agent in Joule Studio that responds to inquiries about business partners using a predefined dataset. Then integrate live data retrieval via OData actions and Joule skills.

### Time Estimate
Approximately 30 minutes.

### Exercise Steps

1. **Login to Joule Studio**
   - Visit [Joule Studio](jouleStudioUrl).
   - Login with the provided username and password.
   - Choose the identity provider containing “ondemand.com” in its name.

2. **Create a New Environment**
   - Go to the Control Tower section.
   - Create a new environment.
   - Name the environment with your workstation’s printed number included.

3. **Set Up a Joule Skills Project**
   - Navigate to the Lobby.
   - Create a new Joule Skills project.
   - Use your workstation number as part of the project name to ensure uniqueness.

4. **Develop the Business Partner Agent**
   - Within your project, create a new agent named **Business Partner Invoicing Agent**.
   - Configure the agent to provide information on known business partners for the Business Partner Invoicing scenario.
   - Use the JSON records below as the data prompt for the agent.

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

5. **Test the Agent**
   - Click the **Test** button in the project interface.
   - Think of a meaningful question to evaluate the agent.
   - Open the logs to monitor the agent’s actions and ensure proper functioning.

6. **Verify the Agent’s Response**
   - Ask the agent: “Provide information about the business partner called Cymbal Direct.”
   - Confirm that the agent returns a response matching the details from the JSON record.

### Learning Objective
Learn how to create and test an agent in Joule Studio that responds to inquiries about business partners using a predefined dataset, then integrate live data retrieval via OData actions and Joule skills.

7. **Create a new Action Project**
   - Under Connectors -> Actions, create a new Action Project of type "OData Destination."
   - Configure it to use the `BUSINESS_PARTNER_SERVICE` destination to retrieve business partner data.

8. **Test the Action**
   - Test the action and call the `/BusinessPartners` endpoint (GET).
   - Verify the output matches the business partner information from the hardcoded JSON.

9. **Add a Joule Skill to Your Original Project**
   - Return to your Joule Skills project, where your also defined your Agent.
   - Create a new Joule Skill that invokes the action and outputs the business partners.

10. **Integrate the Skill into Your Agent**
    - In the agent definition, register the Joule Skill as a tool.
    - Remove the hardcoded JSON of the records of the business partners entirely from the prompt.
    - Instruct the agent to instead call your tool to retrieve the information about the business partners.

11. **Retest the Upgraded Agent**
    - Test the agent again with the query: “Provide information about the business partner called Cymbal Direct.”
    - Review the logs to confirm the tool is called and live data is used in the response.

### Hints
- Ensure that the environment and project names include your workstation number exactly as printed.
- Use the logs to identify process issues if the test does not yield the expected output.
- Review each configuration step to avoid common setup mistakes.
