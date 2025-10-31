# Exercise 1 - Build Your First Agent in Joule Studio

> [!NOTE]  
> **Learning Objectives**:
>
> - Build your first agent in Joule Studio that responds to inquiries about business partners
> - Learn how to test and debug the agent
> - Create a simple Joule Skill and attach it as a tool to the agent 
>
> **Time Estimate**: Approximately 1 hour.

You can always jump to the solution [here](../../solution/full-agent-prompt.md) for a possible, full agent prompt or in Joule Studio [here](https://ai-agent-beta-build-default-eu12-ai165.canary-eu12.process-automation.build.cloud.sap/studio/?action=open&id=eu12.ai-agent-beta-build-default-eu12-ai165.solutionbusinesspartnerinvoicing#/studio/project/2d116da5-5615-4568-bfdc-308fb9c87292/?), especially for the definitions of the Joule Skills. However, we encourage you to try the exercise without it first.

## Exercise Steps

1. Log in to Joule Studio
   - Navigate to [Joule Studio](https://ai-agent-beta-build-default-eu12-ai165.eu12.build.cloud.sap/lobby).
   - Log in with the username T-AI165-XXX@education.cloud.sap where XXX is your workstation's printed number, for example 002, 018 and 038.
   - Use the password that was provided to you before.
   - Select the identity provider containing "ondemand.com" in its name.

2. Activate Private Environment
   - This will be needed to test the agent later on.
   - Navigate to the Control Tower (in the menu to the left) and click on the Environments tile.
   - Click the button in the top right corner to activate the Private Environment.

3. Create new project to work in
   - Return to the Lobby (again in the menu to the left) and create a project of type "Joule Agent and Skill".
   - Include your workstation number in the project name to ensure uniqueness, for example "018 - Business Partner Invoicing".

4. Build the Business Partner Invoicing Agent
   - Open the project if it hasn't opened already
   - Click the Create button to the right and select Joule Agent
   - Name it Business Partner Invoicing Agent, leave the identifier unchanged and use the following as description: "An AI Agent working with records about business partners."
   - After creation, copy the initial prompt and settings from the [template](./agent-template.md) over to your agent to get started.
   - **Add one sentence** at the start of the Additional Context section of the agent prompt. It should instruct the agent to always go through the records of known business partners below in the prompt first.
   - The agent needs to have at least one tool to test it in the next step. Click Add Tool and simply add the Calculator for now. 
   - <details><summary>Sentence Solution</summary>"The first step is to always go through the records of known BP below."</details>

5. Test the agent
   - Click the green Test button in the top right corner. A test package of your agent will be deployed. This might take a minute.
   - Test the agent by asking:
      - "Provide information about the business partner called Cymbal Direct." (this business partner is in the records)
      - "Provide information about the business partner called Siiidneeey Promo." (the agent should infer that you probably meant Sydney Promotions)
   - Does the agent behave as expected? If not, try the same question one more time first. If the issue persists, go through the (timeline) logs to see where the issue might be and ask the speakers for help.

6. Create Joule Skill to externalize business partner information
   - In a realistic scenario the data about the business partners wouldn't be part of the prompt, but come from another service/system. This is the purpose of the Joule Skill that you will create next.
   - Still within the same project, go back to the project overview. Click again the Create button and select Joule Skill.
   - Name it get-business-partners, keep the identifier and use the following as description: "A skill to retrieve the records of known business partners."
   - Turn off "Allow skill to be started directly by a user"
   - Click the plus button under the Start node and select Call Action. Then select the action "Invoke function getBusinessPartners" to add it as a new step/node.
   - Select the added node for the action and create a new Destination Variable in the menu to the right. Name it BUSINESS_PARTNERS_SERVICE
   - **Define a Skill Output** named businessPartners in the Start node. As type set the `get_getGetBusinessPartners_200_output_schema`.
   - **Set the value of the Skill Output** in the End node to the result of the previous "Invoke function getBusinessPartners" step.
   - Check for any errors in the Design Console to the bottom of the page
   - **If you get stuck**, you can simply replicate the same Skill from [here](https://ai-agent-beta-build-default-eu12-ai165.canary-eu12.process-automation.build.cloud.sap/studio/?action=open&id=eu12.ai-agent-beta-build-default-eu12-ai165.solutionbusinesspartnerinvoicing#/studio/project/2d116da5-5615-4568-bfdc-308fb9c87292) 

7. Add Joule Skill as tool to agent
   - Go back to the definition of your Business Partner Invoicing Agent. Click the Add Tool button near the bottom of the page, select Joule Skill and select the `get-business-partners` Skill to add it as a tool to the agent.
   - Remove the business partner information from the Additional Context section of the agent prompt.
   - Change the first sentence of the Additional Context section to instruct the agent to always use the tool "get-business-partners" first to retrieve the records of the business partners.
   - <details><summary>Solution - Additional Context Section of the agent prompt</summary>The first step is always to use the "get-business-partners" tool to retrieve the records of BP. After going through the records:<br>
      - If there is at best a close match (when it comes to the name) for the BP in the records, just use that one.<br><br>
      ### Final Answer<br>
      Be verbose and explain the reasoning behind what you're doing, following a professional tone.</details>

9. Retest the agent
   - Click again the green Test button to deploy a test package and test the agent.
   - You will be asked to set the Destination Variable BUSINESS_PARTNERS_SERVICE. Set it to the destination with the same name BUSINESS_PARTNERS_SERVICE
   - Ask the agent for the same information about the business partners as you did in the previous test in step 5 of this exercise.
   - Does the agent still behave as expected and answer as before? 

Click [here](../ex2/README.md) to proceed to the next exercise, Exercise 2.