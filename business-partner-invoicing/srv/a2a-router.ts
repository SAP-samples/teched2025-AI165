import cds from "@sap/cds";
import { MessageSendParams, SendMessageResponse, Task, TextPart } from "@a2a-js/sdk";
import { A2AClient } from "@a2a-js/sdk/client";

const { uuid } = cds.utils;

const logger = cds.log("A2ARouter");

export default class A2ARouterService extends cds.ApplicationService {
    async init(): Promise<void> {
        await super.init();
        this.on("triggerA2A", this.triggerA2A);
    }

    private triggerA2A = async (request: cds.Request): Promise<{ taskId: string | null; agentResponse: string }> => {
        const task = request.data.task as string;
        if (!task) request.reject(400, "task for agent is required.");

        let url = process.env.SERVICENOW_A2A_SERVER_URL;
        if (!url) {
            logger.error("SERVICENOW_A2A_SERVER_URL variable is not set.");
            return { taskId: null, agentResponse: "No solution available with this tool, please try another." };
        }
        if (url?.endsWith("/")) url = url?.slice(0, -1);

        try {
            const client = await A2AClient.fromCardUrl(url + "/.well-known/agent.json");
            // SEND A MESSAGE TO THE AGENT.
            const sendParams: MessageSendParams = {
                message: {
                    messageId: uuid(),
                    role: "user",
                    parts: [{ kind: "text", text: task }],
                    kind: "message"
                },
                configuration: {
                    blocking: true
                }
            };
            const sendResponse: SendMessageResponse = await client.sendMessage(sendParams);

            if ("error" in sendResponse) {
                logger.error("Error sending message:", sendResponse.error);
                return { taskId: null, agentResponse: "No solution available with this tool, please try another." };
            }

            // ON SUCCESS, WE KNOW IT'S A TASK.
            const taskResult = sendResponse.result as Task;
            logger.log("Send Message Result (Task):", taskResult);
            const artifactResult = (taskResult.status?.message?.parts?.[0] as TextPart).text;
            return { taskId: taskResult.id, agentResponse: artifactResult };
        } catch (error) {
            logger.error("A2A Client Communication Error:", error);
            return { taskId: null, agentResponse: "No solution available with this tool, please try another." };
        }
    };
}
