# Exercise 1 - Build Your First Agent in Joule Studio

> [!NOTE]  
> **Learning Objectives**:
>
> - Build your first agent in Joule Studio that responds to inquiries about business partners
> - Learn how to test and debug the agent
> - Create a simple Joule Skill and attach it as a tool to the agent 
>
> **Time Estimate**: Approximately 45 minutes.

You can always jump to the solution [here](../../solution/full-agent-prompt.md) for a possible, full agent prompt or in Joule Studio [here](https://ai-agent-beta-build-default-eu12-ai165.canary-eu12.process-automation.build.cloud.sap/studio/?action=open&id=eu12.ai-agent-beta-build-default-eu12-ai165.solutionbusinesspartnerinvoicing#/studio/project/2d116da5-5615-4568-bfdc-308fb9c87292/?), especially for the definitions of the Joule Skills. However, we encourage you to try the exercise without it first.

## Exercise Steps

1. Log in to Joule Studio
   - Navigate to [Joule Studio](https://ai-agent-beta-build-default-eu12-ai165.eu12.build.cloud.sap/lobby).
   - Log in with the username T-AI165-XXX@education.cloud.sap where XXX is your workstation's printed number, for example 002, 018 and 038.
   - The initial password is Acce$$teched25 and you will need to set a new password.
   - Select the identity provider containing "ondemand.com" in its name.

2. Create a new environment
   - Navigate to the Control Tower section and create a new environment.
   - Include your workstation's printed number in the environment name to ensure uniqueness.

3. Create a Joule Skills project
   - Return to the Lobby.
   - Create a new Joule Skills project.
   - Include your workstation number in the project name to ensure uniqueness.

4. Start building (finally) the Business Partner Invoicing Agent
   - Within your Joule Skills project, create a new agent and use the name, description and initial prompt from the [template](./agent-template.md) to get started.
   - Add one or two sentences to the beginning of the Additional Context section to instruct the agent to first always go through the records of known business partners. Also, the agent should look for a close match and use that one, if there is no exact match (when it comes to the name).

5. Test the agent
   - Once your prompt is ready for a test, click the Test button located to the right. It takes a minute to deploy the test package.
   - Test the agent by asking:
      - "Provide information about the business partner called Cymbal Direct."
      - "Provide information about the business partner called Siiidneeey Promo." (the agent should infer that you probably meant Sydney Promotions)
   - Should the agent not behave as expected, go through the (timeline) logs to try to find the issue.

6. Create a new Action Project to externalize business partner information
   - Navigate to Connectors → Actions to create a new action project using OData Destination as the type.
      - Include again your workstation's printed number in the name to ensure uniqueness.
   - Select the `BUSINESS_PARTNER_SERVICE` destination.
   - Add the action `Invoke function getBusinessPartners`
   - Test the action with BUSINESS_PARTNER_SERVICE selected under Connectivity -> Destination.
   - Verify that the output matches the business partner information from the hardcoded JSON in the prompt.

7. Define a Joule Skill that wraps and invokes the action
   - Create a new Joule Skill called `get-business-partners` in your project.
      - As description use: "A skill to retrieve the records of known business partners."
   - Turn off "Allow skill to be started directly by a user"
   - Add a new step that invokes the action, which you defined previously. Configure the outputs of the skill accordingly.

8. Attach the Joule Skill to your agent as a tool
   - Remove the hardcoded JSON records entirely from the agent's prompt.
   - Change the prompt in the Additional Context section to instruct the agent to use the tool instead.

9. Retest the agent

Click [here](../ex2/README.md) to proceed to the next exercise, Exercise 2.