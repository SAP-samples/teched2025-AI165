import cds from "@sap/cds";
import {
    Message,
    MessageSendParams,
    Task,
    TaskQueryParams,
    SendMessageResponse,
    GetTaskResponse,
    SendMessageSuccessResponse,
    GetTaskSuccessResponse,
    TextPart
} from "@a2a-js/sdk";
import { A2AClient } from "@a2a-js/sdk/client";

const { uuid } = cds.utils;

const { SERVICENOW_A2A_SERVER } = process.env;

export default class A2ARouterService extends cds.ApplicationService {
    async init(): Promise<void> {
        await super.init();
        this.on("triggerA2A", this.triggerA2A);
    }

    private triggerA2A = async (request: cds.Request): Promise<string> => {
        const task: string = request.data.task;
        const messageId = uuid();
        const client = await A2AClient.fromCardUrl(SERVICENOW_A2A_SERVER + "/.well-known/agent-card.json");

        let taskId: string | undefined;

        try {
            // 1. Send a message to the agent.
            const sendParams: MessageSendParams = {
                message: {
                    messageId: messageId,
                    role: "user",
                    parts: [{ kind: "text", text: task }],
                    kind: "message"
                },
                configuration: {
                    blocking: true
                }
            };

            const sendResponse: SendMessageResponse = await client.sendMessage(sendParams);
            console.log("Send Message Response:", sendResponse);
            //@ts-ignore
            if (sendResponse.error) {
                //@ts-ignore
                console.error("Error sending message:", sendResponse.error);
                return;
            }

            // On success, the result can be a Task or a Message. Check which one it is.
            const result = (sendResponse as SendMessageSuccessResponse).result;

            if (result.kind === "task") {
                // The agent created a task.
                const taskResult = result as Task;
                console.log("Send Message Result (Task):", taskResult);
                taskId = taskResult.id; // Save the task ID for the next call
            } else if (result.kind === "message") {
                // The agent responded with a direct message.
                const messageResult = result as Message;
                console.log("Send Message Result (Direct Message):", messageResult);
                // No task was created, so we can't get task status.

                // TODO: should return the response text from the message object here
                return;
            }

            // 2. If a task was created, get its status.
            if (taskId) {
                const getParams: TaskQueryParams = { id: taskId };
                const getResponse: GetTaskResponse = await client.getTask(getParams);
                //@ts-ignore
                if (getResponse.error) {
                    //@ts-ignore
                    console.error(`Error getting task ${taskId}:`, getResponse.error);
                    return;
                }

                const getTaskResult = (getResponse as GetTaskSuccessResponse).result;
                console.log("Get Task Result:", getTaskResult);

                const artifactResult = (getTaskResult.status?.message?.parts?.[0] as TextPart).text;
                return artifactResult || "No solution available with this tool, please try another.";
            }
        } catch (error) {
            console.error("A2A Client Communication Error:", error);
            return "No solution available with this tool, please try another.";
        }
    };
}
