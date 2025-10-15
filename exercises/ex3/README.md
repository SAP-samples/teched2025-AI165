# Exercise 3 - Agent Collaboration via A2A

## OUTLINE

learning objectives for this exercise:
- collaborate with an external agent via a2a
- test your understanding of joule skills
- practice prompting an agent to invoke a tool

estimated time: 30 minutes.

1. inspect the Action Project called A2A Router Service, which already exists
    - it calls an endpoint that does the same you did in exercise 2, but in code. you can read the code [here]()
2. create a new Joule Skill that calls the action and name it ServiceNow Ticketing Agent.
    - in the description indicate the skill is for creating tickets in ServiceNow
3. attach the skill to the agent as another tool and adjust the agent prompt for it to create a ticket in ServiceNow if the business partner doesn't exist yet
4. test the agent and confirm a ticket was created
    - debug and review the reasoning of the agent in the logs view
5. checkout the created ticket in ServiceNow
6. this time release and deploy your project. launch joule for a final test under control tower -> environment -> joule

If successful, recognize that the agent in Joule Studio collaborated with an external agent via the A2A protocol!