# Exercise 2 - Discover and Invoke Agent via A2A

We mentioned briefly already what the A2A protocol is and who created it. In this exercise, you'll get to know A2A in more detail, and put that knowledge to use in order to discover and invoke an agent via A2A.

> [!NOTE]  
> **Learning Objectives**:
> 
> - Understand the purpose of the Agent Card and its structure
> - Understand the request/response structure when using A2A
> - Send such a request to an A2A Server to invoke an agent
> - How A2A handles asynchronous, long-running tasks
>
> **Time Estimate**: Approximately 30 minutes.

## Benefits of A2A

The Agent2Agent (A2A) protocol enables seamless interoperability between AI agents developed by different vendors or using varied frameworks. This protocol breaks down traditional silos by allowing agents to communicate without requiring shared infrastructure, memory, or tools. The result is a collaborative AI ecosystem where specialized agents can combine their individual strengths to tackle complex tasks that would exceed the capabilities of any single agent. Enterprises can therefore automate sophisticated workflows across diverse systems, leveraging contributions from over 50 technology partners including SAP.

A2A enhances security and preserves agent opacity during interactions. Agents exchange information without exposing their internal logic, proprietary tools, or operational state, thereby protecting valuable intellectual property. The protocol incorporates enterprise-grade authentication mechanisms such as OAuth tokens or API keys, and builds upon established standards including HTTP(S) and JSON-RPC 2.0 for reliable and secure transmissions. This design philosophy treats remote agents as black boxes, significantly reducing risks in multi-agent collaborations while enabling safe coordination on long-running tasks with comprehensive status synchronization.

The protocol supports flexible and efficient communication modes tailored to specific task requirements. Key communication capabilities include:

- **Agent discovery** through JSON-based Agent Cards for informed partner selection
- **Format negotiation** supporting text, files, and media content types
- **Synchronous requests** for immediate response scenarios
- **Real-time streaming** via Server-Sent Events for continuous data flow
- **Asynchronous notifications** accommodating extended operations spanning multiple hours

These features collectively streamline task management, minimize errors in multi-turn workflows, and establish a scalable foundation for innovation in AI applications across enterprise environments.

## Agent Card for Agent Discovery 

The **Agent Card** is a JSON metadata document that functions as a digital business card for AI agents in the Agent2Agent (A2A) protocol, encapsulating essential details to facilitate initial discovery and secure interaction setup. It includes the agent's identity, service endpoint URL, A2A capabilities, authentication requirements, and a list of skills, allowing clients to parse this information and assess suitability for specific tasks.

The primary purpose of the Agent Card lies in enhancing discoverability, enabling clients—acting on behalf of users—to locate and evaluate available A2A servers by retrieving and analyzing these cards, which reveal whether a remote agent's capabilities align with interaction needs, such as required operations or secure communication protocols. This **discoverability mechanism** streamlines partner selection, reduces integration friction, and promotes efficient collaboration in multi-agent ecosystems without exposing internal agent logic.

## Exercise Steps

Take a look at the Agent Card of the ServiceNow Ticketing Agent, which we'll be using in the scenario.

1. Open the Agent Card in your Browser - [Agent Card](https://wxo-a2a-server.cfapps.eu10-004.hana.ondemand.com/.well-known/agent-card.json)  
  Notice how the path in the URL is `.well-known/agent-card.json`. The Agent Card can always be found under this path. Identify the:  
    - the capabilities of the agent
    - the URL to invoke the agent later on
    - the mandatory information that the agent needs to create a new ticket in ServiceNow

2. Open a terminal emulator (e.g., PowerShell on Windows) and run the curl command below to instruct the agent to create a ServiceNow ticket.  
  Prepare the following:
    - Replace $A2A_SERVER_URL with the "service" or "invoke" URL from the Agent Card.
    - Update the message payload to include the mandatory fields for ticket creation: short description and priority.
    - Set configuration.blocking to true so the request waits for the agent to return the created ticket details.

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
                "text": "Instruct the agent here..."
              }
            ],
            "messageId": "1"
          },
          "configuration": {
            "blocking": true
          }
        }
      }'
    ```

3. Handle long-running tasks with asynchronous invocation and polling  
  In many real-world cases the agent will perform work that takes more time (validations, external API calls, or multi-step processing). To avoid blocking your client:
    - Set configuration.blocking back to false so the server returns an immediate acknowledgement.
    - The acknowledgement typically contains a task identifier (taskId) and a task status you can poll.
    - You can continue other work locally and poll the task status periodically until completion.

    Submit a long-running task (non-blocking). We'll simply leave out the short description of the ticket, so that the agent cannot complete the task just yet.

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
          },
          "configuration": {
            "blocking": false
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

5. The agent says it requires an additional input, which is of course the short description of the ticket. Provide it and reference again the previous task id. This way the agent knows the request is related to the same task.

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
          "messageId": "3",
          "taskId": "'$TASK_ID'"
        }
      }
    }' 
    ```

6. Poll the task status again to know if the ticket was created successfully this time around.


Click [here](../ex3/README.md) to move to the last exercise, exercise 3.

## Test your Understanding

1. Try to summarize the purpose of the Agent Card in two sentences or less.

2. How does A2A facilitate handling of long-running tasks?

2. What two protocol standards does A2A build on to send requests and for the request structure itself?