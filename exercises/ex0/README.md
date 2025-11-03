# Exercise 0 - Terms and Definitions

If you are already familiar with these terms and concepts, please proceed directly to the first practical [exercise](../ex1/README.md).

> [!NOTE]  
> **Learning Objectives**:
>
> - Understand common terminology when discussing agents
> - Differentiate between an agent and an LLM
> - Comprehend how Joule Studio relates to Joule and agents
>
> **Time Estimate**: Approximately 10 minutes.

## Prompting

**Prompting** refers to the practice of crafting input text instructions to **guide** a language model's **behavior** and output. A prompt serves as the communication interface between users and AI systems, defining the context, task requirements, and expected response format. Effective prompting techniques include providing clear instructions, relevant examples, and specific constraints to achieve optimal outcomes.

The quality and structure of prompts significantly **influence** the **performance** of language models. Well-designed prompts enhance accuracy, reduce ambiguity, and ensure consistent results across various use cases. This foundational skill becomes particularly critical when developing agents, as prompts define how the underlying language model interprets tasks and coordinates with various tools and systems.

## LLMs
Large Language Models (**LLMs**) are **extensive** neural networks **trained** on massive text datasets to understand and generate human-like language and behavior. These models learn from comprehensive corpora—often comprising a substantial portion of the public internet (Wikipedia, news sites, forums, books, code repositories, etc.).

Given an input, an LLM can produce coherent, contextually relevant responses. They are utilized for tasks such as question-answering, summarization, translation, and code generation.

<figure>
    <img src="images/adi-structure-genai.png" alt="Generative AI components" width="700">
    <figcaption>Ambiguity of Generative AI terms</figcaption>
</figure>

## Agents
An **Agent** is a software system that utilizes a large language model (LLM) to **reason**, **plan**, and execute **actions** within an environment. While the term 'Agent' predates LLMs, it now typically refers to an LLM-driven system capable of interacting with tools and systems.

Essentially, the LLM proposes a plan or subsequent action. The Agent invokes tools to execute that action, then returns results to the LLM for further reasoning or adaptation.

Common types of tools an Agent utilizes include:
- API calls to retrieve data and persist changes in systems
- Code execution and mathematical calculations 
- Web searches for current information

By combining LLM reasoning with **specialized tools**, Agents enable comprehensive **automation** and can achieve greater reliability than traditional LLMs (for example, by delegating mathematical operations to a calculator tool).

## Joule Studio
**Joule Studio** is a capability within SAP Build that enables the construction of custom Agents using its built-in Agent Builder. Users can attach reusable tools, known as Joule Skills, to these Agents. **Joule**, SAP's AI Copilot, can then leverage your custom Agents and their skills to complete designated tasks.

## The A2A Protocol

Agent2Agent (**A2A**) is a protocol designed to enable agentic AI interoperability. Originally created by Google with SAP as one of multiple founding contributors, the project is now managed under the Linux Foundation, following a collaborative and **open-source** approach.

The protocol acknowledges that Agents from different vendors and platforms increasingly need to collaborate with one another. To facilitate this interoperability between Agents, A2A describes a standardized communication method for Agent-to-Agent interaction.  
Additionally, it provides SDKs to simplify the implementation of this communication pattern and ensure protocol compliance.
