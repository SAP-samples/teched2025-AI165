import cds from "@sap/cds";
import {
    MessageSendParams,
    SendMessageResponse,
    SendMessageSuccessResponse,
    Task,
    TextPart
} from "@a2a-js/sdk";
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
        const messageId: string = uuid();
        if (!process.env.SERVICENOW_A2A_SERVER_URL) throw new Error("A2A Server url is not set.");
        let url: string = process.env.SERVICENOW_A2A_SERVER_URL;
        if (url?.endsWith("/")) url = url?.slice(0, -1);
        logger.log("A2A Server url is set to", url);

        const client = await A2AClient.fromCardUrl(url + "/.well-known/agent-card.json");
        // workaround: use correct url for a2a server
        // @ts-ignore
        if (client.serviceEndpointUrl.includes(":8080")) client.serviceEndpointUrl = client.serviceEndpointUrl.replace(":8080", ""); 

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
            //@ts-ignore
            if (sendResponse.error) {
                //@ts-ignore
                logger.error("Error sending message:", sendResponse.error);
            }

            // On success, assume it's a Task.
            const taskResult = (sendResponse as SendMessageSuccessResponse).result as Task;
            logger.log("Send Message Result (Task):", taskResult);
            const artifactResult = (taskResult.status?.message?.parts?.[0] as TextPart).text;
            return { taskId: taskResult.id, agentResponse: artifactResult };
        } catch (error) {
            logger.error("A2A Client Communication Error:", error);
            return { taskId: null, agentResponse: "No solution available with this tool, please try another." };
        }
    };
}
