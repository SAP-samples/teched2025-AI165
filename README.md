# AI165 - Interconnect custom AI agents with your cloud and partner ecosystem

This repository contains the material for the SAP TechEd 2025 session called AI165 - Interconnect custom AI agents with your cloud and partner ecosystem.

## Goal formulation for this hands-on
At the end of the session, you yourself will have:
- Built a custom Agent in Joule Studio
- Attached Tools as Joule Skills to integrate it with an external partner Agent from IBM
- Used the Agent2Agent (A2A) protocol for the communication between the Agents
- Invoked your Agent from within Joule (SAP's AI Copilot) as the entry point

## The scenario: Business Partner Invoicing

> [!IMPORTANT]
> The Business Partner Invoicing Agent described here doesn’t exist and is purely a fictional concept created for a hands-on session scenario.

In this hands-on session we'll work with a **fictional** "Business Partner Invoicing" scenario in which business partners send invoices that your company must pay. As a first step, an **agent** will extract the invoice information and store it in the correct **business partner** record in SAP S/4HANA. This agent is called the "Business Partner Invoicing Agent" and was previously defined in **Joule Studio** as a custom agent. Assume the invoice has already been received (for example, via email).

Joule Studio is a capability within SAP Build that enables the construction of custom Agents using its built-in Agent Builder. Users can attach reusable tools, known as Joule Skills, to these Agents. **Joule**, SAP's AI Copilot, can then leverage your custom Agents and their skills to complete designated tasks.

You, as the end user, interact only with the Business Partner Invoicing Agent, which in turn has several attached **tools**. If the agent cannot find a matching business partner, it asks whether to create a new one. With approval, it automatically collaborates with IBM's "**ServiceNow** Ticketing Agent" (invoked via **IBM watsonx Orchestrate** in the cloud) in the background to open a ServiceNow ticket requesting business partner creation.

IBM watsonx Orchestrate is IBM’s open platform for building, managing, observing, and governing AI agents. In addition to its low-code and pro-code agent development capabilities, it also provides a catalog of prebuilt agents that simplify access to AI tools from various domains like Human Resources, Sales, Procurement, and Customer Care. This workshop leverages the latter, integrating ServiceNow customer care capabilities like ticket management.
Reference: https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base

Note that the two agents communicate using the Agent2Agent (**A2A**) protocol. This workflow minimizes manual work and speeds up the storage and processing of invoices that your company must pay.

### Architecture Diagram
(maybe we should add 1-2 sentences here, describing the architecture)

![the solution diagram](docs/solution-diagram.png)

### Demo
(add a demo video or maybe a demo gif. during the hands-on session we can think of doing a quick live demo)

## Requirements
There are only a few requirements to follow the exercises. Everything will already be installed on the machine provided for the live hands-on session. You will also be given access to Joule Studio and its Agent Builder.

- A Chromium-based browser (e.g., Google Chrome)
- Node.js v22.17.0 (LTS)
- A text editor, such as VS Code
- Access to Joule Studio and its Agent Builder

## Exercises

- [Terms and Definitions](exercises/ex0/README.md)
- [Exercise 1 - Build Your First Agent in Joule Studio](exercises/ex1/README.md)
- [Exercise 2 - Discover and Invoke Agent via A2A](exercises/ex2/README.md)
- [Exercise 3 - Agent Collaboration via A2A](exercises/ex3/README.md)

## Contributing
Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) to understand the contribution guidelines.

## Code of Conduct
Please read the [SAP Open Source Code of Conduct](https://github.com/SAP-samples/.github/blob/main/CODE_OF_CONDUCT.md).

## How to obtain support

Support for the content in this repository is available during the actual time of the online session for which this content has been designed. Otherwise, you may request support via the [Issues](../../issues) tab.

## License
Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
