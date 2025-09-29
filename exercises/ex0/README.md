# Terms and Definitions

If you're already familiar with these terms and concepts, feel free to skip ahead to the first [exercise](../ex1/).

## LLMs
Large Language Models (**LLMs**) are very large neural networks trained on massive text datasets to understand and generate human-like language and behaviour. These models learn from huge corpora—often a large fraction of the public internet (Wikipedia, news sites, forums, books, code repositories, etc.).

Given an input, an LLM can produce coherent, contextually relevant responses. They are used for tasks such as Q&A, summarization, translation, and code generation.

<img src="images/adi-structure-genai.png" alt="structure GenAI" style="max-width: 76%; height: auto;">

TODO: add subtitle to image

## Agents
An **Agent** is a software system that uses a large language model (LLM) to reason, plan, and take actions in an environment. The term 'Agent' existed before LLMs, but today it usually means an LLM-driven system that can interact with tools and systems.

In essence, the LLM proposes a plan or next action. The Agent invokes tools to carry out that action, then returns results to the LLM for further reasoning or adaptation.

Common types of tools an Agent uses:
- Calling APIs to retrieve data and persist changes in systems
- Execute code and make calculations 
- Searching the web for up-to-date information

By combining LLM reasoning with specialized tools, Agents enable end-to-end automation and can be made more reliable than traditional LLMs (for example, delegating math to a calculator tool).

## Joule Studio
**Joule Studio** is a capability in SAP Build. With it, you can build custom Agents, using its built-in Agent Builder, and attach reusable tools through so called Joule Skills to them.  
**Joule**, SAP’s AI Copilot, can then leverage your custom Agents and their skills to complete a task.

## The A2A Protocol

Agent2Agent (**A2A**) is a protocol designed to enable agentic AI interoperability. Created by Google with SAP being one of multiple founding contributors, the project is now driven as part of the Linux Foundation, following a collaborative and open source approach.

The protocol recognizes that, increasingly, Agents from different vendors and on different platforms need to collaborate with each other. To faciliate this interoperability between Agents, A2A describes a standarized way for Agents to communicate with each other.  
Besides, it now provides SDKs to easily implement this communication pattern, and as such comply with the protocol.
