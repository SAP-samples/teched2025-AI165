@path: '/a2a-router'
service A2ARouterService {
    action triggerA2A(task: String) returns { taskId: String; agentResponse: String; };
}
