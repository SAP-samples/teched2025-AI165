# Exercise 3 - Agent Collaboration via A2A

In the previous exercise, you learned how to discover and invoke an external agent using the A2A protocol through direct API calls. This exercise builds upon that foundation by implementing agent collaboration within Joule Studio, demonstrating how agents can seamlessly work together to solve complex business scenarios.

> [!NOTE]  
> **Learning Objectives**:
> 
> - Collaborate with an external agent via the A2A protocol within Joule Studio
> - Test your understanding of Joule Skills and their integration capabilities
> - Practice prompting an agent to actually invoke an external agent for ticket creation
> - Implement end-to-end agent collaboration workflows
>
> **Time Estimate**: Approximately 30 minutes.

## Benefits of Agent Collaboration in Enterprise Scenarios

Agent collaboration through A2A enables sophisticated business workflows where multiple specialized agents contribute their unique capabilities to resolve complex tasks. In this exercise, you'll implement the part of the where your agent in Joule Studio collaborates with an external ServiceNow Ticketing Agent to automatically create support tickets when business partners are not found in the system. This demonstrates how enterprises can chain agent interactions to create seamless, automated business processes that span multiple systems and domains.

The integration showcases practical enterprise automation where discovery, validation, and remediation actions are orchestrated across different AI agents, each optimized for specific business functions. This approach reduces manual intervention, accelerates problem resolution, and ensures consistent handling of business exceptions through automated ticket creation and tracking.

## Exercise Steps

1. Inspect the A2A Router Service  
   Navigate to Actions (in the menu to the left under Connectors) in Joule Studio and click on the item "A2A Router Service". Review the following components of the shown action `Invoke action triggerA2A`:
   - The inputs and outputs of the action
   - The underlying [code](../../business-partner-invoicing/srv/a2a-router.ts) of the `triggerA2A` endpoint that is called. Notice how it's invoking the same ServiceNow Ticketing Agent from exercise 2.
   - To test the action, select the Test tab, select the destination `A2A_ROUTER_SERVICE` under Connectivity -> Destination, and enter one of the messages that you used with `curl` in exercise 2 as the value for the `task` input. Then click the Test button to the right. It takes a few seconds to get the response.

2. Wrap the `triggerA2A` action in a new Joule Skill
   Navigate back to the Lobby (in the menu to the left) and click again on your own project. Therein, create a new Joule Skill and name it "ServiceNow Ticketing Agent". This Skill will act as the integration between the Business Partner Invoicing Agent and the ServiceNow Ticketing Agent via the A2A protocol.
   - As description use: "A skill to talk to the ServiceNow Ticketing Agent, which can create tickets in ServiceNow."
   - Again turn off "Allow skill to be started directly by a user".
   - Add a new step/node after the Start node that invokes the `triggerA2A` action.
   - Configure the inputs and outputs of the skill accordingly:
      - Define a Skill Input `task`, check the "Required" box and give it the description: "the task for the agent"
      - Define two Skill Outputs called `taskId` and `agentResponse` with the descriptions "id of the task" and "the agent response". Check the "Required" box for both outputs.
      - Bind the Skill Outputs accordingly to the outputs of the previous step/node, which invokes the `triggerA2A` action.
      - Don't forget to click on the Save button.

3. Attach the Joule Skill to enable agent collaboration
   Attach the Skill, which you created in the previous step, as a tool to the existing Business Partner Invoicing Agent
   - Add "Create tickets in ServiceNow to add a new BP to the records." to the Instructions section of the agent prompt.
   - Describe in the Additional Context section when the tool should be invoked and its input.
   - Hint: Make sure the input includes the priority 2 (high) and a short description for the ticket.
   - Again, feel free to check the full solution [here](../../solution/full-agent-prompt.md).

4. Test the agent collaboration end to end  
   Click again the Test button to deploy a test package. Then prompt the agent accordingly to trigger the creation of a new ticket:
   - Ask it to provide you with information on a business partner that is clearly not in the records of known business partners.
   - Verify in the (timeline) logs that there is a step about creating the ticket.
   - Find again the raw response from the agent, so not from Joule, in the logs.

## Expected Outcome

Upon successful completion of this exercise, you will have demonstrated that your agent in Joule Studio can effectively collaborate with an external agent via the A2A protocol. This collaboration enables automated ticket creation workflows that bridge multiple systems, showcasing the power of agent orchestration in enterprise environments.