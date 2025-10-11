# Exercise 2 - Discover and Invoke Agent as per A2A

We mentioned briefly already what the A2A protocol is and who created it. In this exercise, you'll get to know A2A in more detail, and put that knowledge to use in order to invoke an Agent as per A2A.

**Learning Objectives**:

- Understand the purpose of the Agent Card and its structure
- See the structure of the request/response when using A2A
- Send a request to an A2A Server in order to invoke an Agent
- Learn about how A2A handles asynchronous, long-running tasks

## Why use A2A?

The Agent2Agent (A2A) protocol enables seamless interoperability between AI agents developed by different vendors or using varied frameworks. It breaks down silos by allowing agents to communicate without shared infrastructure, memory, or tools. This fosters a collaborative AI ecosystem where specialized agents can combine strengths for complex tasks that one agent alone cannot handle. As a result, enterprises can automate sophisticated workflows across diverse systems, supported by contributions from over 50 technology partners like Atlassian and Salesforce.

A2A enhances security and preserves agent opacity during interactions. Agents exchange information without exposing internal logic, proprietary tools, or state, protecting intellectual property. It incorporates enterprise-grade authentication, such as OAuth tokens or API keys, and builds on standards like HTTP(S) and JSON-RPC 2.0 for reliable, secure transmissions. This design treats remote agents as black boxes, reducing risks in multi-agent collaborations while enabling safe coordination on long-running tasks with status synchronization.

The protocol supports flexible and efficient communication modes tailored to task needs. Agents discover capabilities through JSON-based Agent Cards, allowing informed selection of partners and negotiation of formats like text, files, or media. It handles synchronous requests, real-time streaming via Server-Sent Events, and asynchronous notifications, accommodating quick replies or extended operations that span hours. These features streamline task management, minimize errors in multi-turn workflows, and promote scalable innovation in AI applications.

## Agent Card for Agent Discovery 

The **Agent Card** is a JSON metadata document that functions as a digital business card for AI agents in the Agent2Agent (A2A) protocol, encapsulating essential details to facilitate initial discovery and secure interaction setup. It includes the agent's identity, service endpoint URL, A2A capabilities, authentication requirements, and a list of skills, allowing clients to parse this information and assess suitability for specific tasks.

The primary purpose of the Agent Card lies in enhancing discoverability, enabling clients—acting on behalf of users—to locate and evaluate available A2A servers by retrieving and analyzing these cards, which reveal whether a remote agent's capabilities align with interaction needs, such as required operations or secure communication protocols. This **discoverability mechanism** streamlines partner selection, reduces integration friction, and promotes efficient collaboration in multi-agent ecosystems without exposing internal agent logic.

Take a look at the Agent Card of the ServiceNow Ticketing Agent, which we'll be using in the scenario.

1. Open the Agent Card in your Browser - [Agent Card](`serviceNowTicketingAgentUrl`.well-known/agent.json)  
  Notice how the path in the URL is `.well-known/agent.json`. The Agent Card can always be found under this path. Identify the:  
    - the capabilities of the Agent
    - the URL to invoke the Agent later on
    - the mandatory information that the Agent needs to create a new ticket in ServiceNow

## Invoke ServiceNow Ticketing Agent (A2A)

Now, it's time to use the information from the Agent Card to actually invoke the Agent.

2. Open a terminal emulator (e.g., PowerShell on Windows) and run the curl command below to instruct the Agent to create a ServiceNow ticket.  
  Prepare the following:
    - Replace $A2A_SERVER_URL with the "service" or "invoke" URL from the Agent Card.
    - Update the message payload to include the mandatory fields for ticket creation: short description and priority.
    - Set configuration.blocking to true so the request waits for the Agent to return the created ticket details.

    ```
    curl --request POST \
      --url "$A2A_SERVER_URL" \
      --data '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "message/send",
        "params": {
          "message": {
            "role": "user",
            "parts": [
              {
                "kind": "text",
                "text": "Instruct the Agent here..."
              }
            ],
            "messageId": "1"
          },
          "configuration": {
            "blocking": false
          }
        }
      }'
    ```

3. Handle long-running tasks with asynchronous invocation and polling  
  In many real-world cases the Agent will perform work that takes more time (validations, external API calls, or multi-step processing). To avoid blocking your client:
    - Set configuration.blocking back to false so the server returns an immediate acknowledgement.
    - The acknowledgement typically contains a task identifier (taskId) and a task status you can poll.
    - You can continue other work locally and poll the task status periodically until completion.

    Submit a long-running task (non-blocking). We'll simply leave out the short description of the ticket, so that the Agent cannot complete the task just yet.

    ```
    curl --request POST \
      --url "$A2A_SERVER_URL" \
      --data '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "message/send",
        "params": {
          "message": {
            "role": "user",
            "parts": [
              {
                "kind": "text",
                "text": "Create a ticket with priority 2"
              }
            ],
            "messageId": "2"
          }
        }
      }'
    ```

4. Poll the current status of the task. Make sure to replace `$TASK_ID` with the task id from the previous response.

    ```
    curl --request POST \
      --url "$A2A_SERVER_URL" \
      --data '{
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tasks/get",
        "params": {
          "id": "'$TASK_ID'"
        }
      }'
    ```

5. The Agent says it requires an additional input, which is of course the short description of the ticket. Provide it and reference again the previous task id. This way the Agent knows the request is related to the same task.

    ```
    curl --request POST \
    --url "$A2A_SERVER_URL" \
    --data '{
      "jsonrpc": "2.0",
      "id": 3,
      "method": "message/send",
      "params": {
        "message": {
          "role": "user",
          "parts": [
            {
              "kind": "text",
              "text": "The short description is: Problem in chair not in computer."
            }
          ],
          "messageId": "2",
          "taskId": "'$TASK_ID'"
        }
      }
    }' 
    ```

6. Poll the task status again to know if the ticket was created successfully this time around.