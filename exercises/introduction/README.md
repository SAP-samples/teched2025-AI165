# Introduction

## Goal formulation for this hands-on
At the end of the session, you yourself will have:
- Built a custom Agent in Joule Studio
- Attached Tools as Joule Skills to integrate it with an external partner Agent from IBM
- Used the Agent2Agent (A2A) protocol for the communication between the Agents
- Invoked your Agent from within Joule (SAP's AI Copilot) as the entry point

## The scenario: Business Partner Invoicing Agent

> [!IMPORTANT]
> The Business Partner Invoicing Agent described here doesn’t exist and is purely a fictional concept created for a hands-on session scenario.

In this hands-on session, we'll work with a **fictional** "Business Partner Invoicing" scenario where companies send due invoices to their business partners for payment. The scenario demonstrates how two AI agents collaborate seamlessly to handle invoicing workflows that would traditionally require manual intervention across multiple systems.

Two **agents** work together to complete user tasks. The first is SAP's "Business Partner Invoicing Agent," which runs on **SAP BTP** and includes multiple attached tools. Users interact exclusively with this SAP agent to send invoices to business partners and retrieve business partner information. The second is IBM's "**ServiceNow** Ticketing Agent," invoked through **IBM watsonx Orchestrate** in the cloud. These agents communicate using the standardized Agent2Agent (**A2A**) protocol.

When users request to send an invoice to a business partner that doesn't exist in the system, the SAP agent asks if it should create a new business partner record. If approved, the SAP agent automatically collaborates with the IBM agent to generate a ServiceNow ticket for business partner creation. This eliminates workflow bottlenecks and ensures smooth invoicing processes without requiring users to switch between systems or handle manual workarounds.

### Architecture

![the solution diagram](images/solution-diagram.png)

### Demo
(do a quick demo of the desired end result of the hands-on; maybe add a gif too)

## Terms and Definitions
If you're already familiar with these terms and concepts, feel free to skip ahead to the first [exercise](../ex0/README.md).

### LLMs
Large Language Models (**LLMs**) are very large neural networks trained on massive text datasets to understand and generate human-like language and behaviour. These models learn from huge corpora—often a large fraction of the public internet (Wikipedia, news sites, forums, books, code repositories, etc.).

Given an input, an LLM can produce coherent, contextually relevant responses. They are used for tasks such as Q&A, summarization, translation, and code generation.

<img src="images/adi-structure-genai.png" alt="structure GenAI" style="max-width: 76%; height: auto;">

TODO: add subtitle to image

### Agents
An **Agent** is a software system that uses a large language model (LLM) to reason, plan, and take actions in an environment. The term 'Agent' existed before LLMs, but today it usually means an LLM-driven system that can interact with tools and systems.

In essence, the LLM proposes a plan or next action. The Agent invokes tools to carry out that action, then returns results to the LLM for further reasoning or adaptation.

Common types of tools an Agent uses:
- Calling APIs to retrieve data and persist changes in systems
- Execute code and make calculations 
- Searching the web for up-to-date information

By combining LLM reasoning with specialized tools, Agents enable end-to-end automation and can be made more reliable than traditional LLMs (for example, delegating math to a calculator tool).

### Joule Studio
**Joule Studio** is a capability in SAP Build. With it, you can build custom Agents, using its built-in Agent Builder, and attach reusable tools through so called Joule Skills to them.  
**Joule**, SAP’s AI Copilot, can then leverage your custom Agents and their skills to complete a task.

### The A2A Protocol

Agent2Agent (**A2A**) is a protocol designed to enable agentic AI interoperability. Created by Google with SAP being one of multiple founding contributors, the project is now driven as part of the Linux Foundation, following a collaborative and open source approach.

The protocol recognizes that, increasingly, Agents from different vendors and on different platforms need to collaborate with each other. To faciliate this interoperability between Agents, A2A describes a standarized way for Agents to communicate with each other.  
Besides, it now provides SDKs to easily implement this communication pattern, and as such comply with the protocol.
