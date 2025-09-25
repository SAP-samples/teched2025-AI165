# Introduction

## Goal formulation for this hands-on
At the end of the session, you yourself will have:
- Built a custom Agent in Joule Studio
- Attached Tools as Joule Skills to integrate it with an external partner Agent from IBM
- Used the Agent-to-Agent (A2A) protocol for the communication between the Agents
- Invoked your Agent from within Joule (SAP's AI Copilot) as the entry point

### Architecture and Demo
describe shortly the use case in 2-3 sentences here

(do a quick demo of the desired end result of the hands-on)

![solution diagram](images/solution-diagram-example.svg)

## Terms and Definitions
If you're already familiar with these terms and concepts, feel free to skip ahead to the first [exercise](../ex0/README.md).

### LLMs
Large Language Models (**LLMs**) are very large neural networks trained on massive text datasets to understand and generate human-like language and behaviour. These models learn from huge corpora—often a large fraction of the public internet (Wikipedia, news sites, forums, books, code repositories, etc.).

Given an input, an LLM can produce coherent, contextually relevant responses. They are used for tasks such as Q&A, summarization, translation, and code generation.

![structure GenAI](images/adi-structure-genai.png)

TODO: make the image smaller, and add subtitle

### Agents
An **Agent** is a software system that uses a large language model (LLM) to reason, plan, and take actions in an environment. The term 'Agent' existed before LLMs, but today it usually means an LLM-driven system that can interact with tools and systems.

In essence, the LLM proposes a plan or next action. The Agent invokes tools to carry out that action, then returns results to the LLM for further reasoning or adaptation.

Common types of tools an Agent uses:
- Calling APIs to retrieve data and persist changes in systems
- Execute code and make calculations 
- Searching the web for up-to-date information

By combining LLM reasoning with specialized tools, Agents enable end-to-end automation and can be made more reliable than traditional LLMs (for example, delegating math to a calculator tool).

### Joule Studio
Joule Studio is a capability in SAP Build. With it, you can build custom Agents, using its built-in Agent Builder, and attach reusable tools through so called Joule Skills to them.  
Joule, SAP’s AI Copilot, can then leverage your custom Agents and their skills to complete a task.
