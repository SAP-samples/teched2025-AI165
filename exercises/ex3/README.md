# Exercise 3 - Agent Collaboration via A2A

In the previous exercise, you learned how to discover and invoke an external agent using the A2A protocol through direct API calls. This exercise builds upon that foundation by implementing agent collaboration within SAP Build Code and Joule Studio, demonstrating how agents can seamlessly work together to solve complex business scenarios.

> [!NOTE]  
> **Learning Objectives**:
> 
> - Collaborate with an external agent via the A2A protocol within Joule Studio
> - Test your understanding of Joule Skills and their integration capabilities
> - Practice prompting an agent to invoke external tools for ticket creation
> - Implement end-to-end agent collaboration workflows
>
> **Time Estimate**: Approximately 30 minutes.

## Benefits of Agent Collaboration in Enterprise Scenarios

Agent collaboration through A2A enables sophisticated business workflows where multiple specialized agents contribute their unique capabilities to resolve complex tasks. In this exercise, you'll implement a scenario where your Joule agent collaborates with an external ServiceNow Ticketing Agent to automatically create support tickets when business partners are not found in the system. This demonstrates how enterprises can chain agent interactions to create seamless, automated business processes that span multiple systems and domains.

The integration showcases practical enterprise automation where discovery, validation, and remediation actions are orchestrated across different AI agents, each optimized for specific business functions. This approach reduces manual intervention, accelerates problem resolution, and ensures consistent handling of business exceptions through automated ticket creation and tracking.

## Exercise Steps

1. Inspect the existing Action Project  
   Navigate to the Action Project called "A2A Router Service" in your SAP Build Code environment. This project contains the implementation that programmatically calls the same ServiceNow endpoint you used in Exercise 2. Review the following components:
   - Code structure and endpoint configuration
   - A2A integration implementation at the service layer
   - Authentication and security mechanisms

2. Create a new Joule Skill for ServiceNow integration  
   In Joule Studio, create a new Joule Skill and name it "ServiceNow Ticketing Agent". Configure the skill with:
   - Description specifying the skill is designed for creating tickets in ServiceNow
   - Integration parameters for business partner validation failures
   - Configuration for manual intervention scenarios

3. Attach the skill to your agent  
   Add the newly created ServiceNow Ticketing Agent skill as an additional tool to your existing agent. Modify the agent configuration to include:
   - The ServiceNow Ticketing Agent skill as an available tool
   - Updated agent prompt instructions for automatic ticket creation
   - Seamless fallback handling for missing partner scenarios

4. Test the agent collaboration  
   Execute a test scenario where you request information about a non-existent business partner. During testing, observe:
   - How your agent recognizes the missing partner condition
   - The automatic invocation of the ServiceNow Ticketing Agent
   - The creation of appropriate support tickets
   - Agent reasoning process and decision flow in the logs view

5. Verify ticket creation in ServiceNow  
   Access the ServiceNow system to confirm successful ticket creation. Review the following ticket attributes:
   - Ticket details and categorization
   - Priority settings and assignment
   - Description accuracy and completeness
   - Information transmission through the A2A protocol

6. Deploy and test in production environment  
   Release and deploy your project to make it available in the production environment. Complete the following validation steps:
   - Navigate to Control Tower → Environment → Joule
   - Launch Joule for comprehensive end-to-end testing
   - Validate the complete agent collaboration workflow
   - Confirm production environment functionality

## Expected Outcome

Upon successful completion of this exercise, you will have demonstrated that your agent in Joule Studio can effectively collaborate with an external agent via the A2A protocol. This collaboration enables automated ticket creation workflows that bridge multiple systems, showcasing the power of agent orchestration in enterprise environments.