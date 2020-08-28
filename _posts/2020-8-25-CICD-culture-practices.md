---
layout: post
title:  "CI/CD Culture Practices"
date:   2020-08-26 03:25:13 +0300
tags:
  - Software
  - CICD
  - DevOps
  - Security
  - Quality
  - Agile
  - SDLC
  - Continuous Integration
  - Continuous Delivery
  - Continuous Deployment
---

Software development is full of chaos. To be able to transform a painful need or an idea to a fully functioning software deployed on a scalable production environment that is configured to serve users even during natural disasters is no easy task. In all engineering fields, engineers do not only focus on the development of their product, but they also pay extreme attention to the logistics of delivering their product. Engineering software is no different. Software Engineering is different from many other engineering fields in one aspect: Continuity. Continuous Integration and Continuous Delivery (a.k.a CI/CD) allow teams and organizations to continuously develop, test, integrate, and consistently deliver software.

Ever wrote a CI/CD pipelines only to realize that things did not change for the best? CI/CD is not just about the pipeline itself. You may consider the pipeline to be one of the easier steps. Building practices and adopting a cultural change around the pipeline is crucial to find success. This post highlights a few technical terminologies and important concerns when trying to run a consistent CI/CD pipeline. This is more of a high-level overview. If you are looking for a detailed guide into how to use different tools, this will not give you these details. Nevertheless, you might find it helpful in your hunt for the best CI/CD processes and tools.

## Continuous Integration

Continuous integration is the practice of delivering code changes to a shared code repository. This practice should happen as frequently as possible. Continuous integration includes building and testing the code to making sure the introduced changes are integratable with the existing code. In this phase, development teams should ensure the changes they made work and properly unit tested.

It is important to keep this phase easy and as fast as possible. Stuffing this phase with many controls is not a good idea as you may prevent the development team from continuously introducing new changes as they may opt for a larger and less frequent bulk of changes.

## Continuous Delivery and Continuous Deployment

After making sure that the code changes are integrated. You must ensure that this group of changes is in a deliverable state. Continuous delivery is just that, being ready to release. This phase may include many stages such as integration testing, performance testing, different kinds of security testing and may include many other stages. It depends on your organization/company desired controls. It is an important best practice to automate as much of these tasks as you possibly can.

When the changes are in a deliverable state and ready to be released, the code can now be deployed into an infrastructure environment. The infrastructure environment can be development, staging, or production. Depending on your organization/company the environment classification and usage may differ.

## Version Control

To be able to implement different phases and stages of CI/CD, code needs to be version controlled. A popular example of a version management tool is Git. Version control is important and provides many benefits to all teams involved in the development lifecycle. Benefits include:

- Easier collaboration. The code is managed in a central repository where all members can deliver with minimal conflicts.
- Easier tracking of stable vs unstable code.
- Easier rollback when bad changes are delivered.
- Clear history of changes and traceability of software issues.
- and many more.

In almost all modern software developing organizations, adopting a version control tool is probably one of the first and most vital steps when assembling a development team.

Below are some important concepts and terminologies when using version control tools such as git:

### Branches

A branch represents the state of the code repository at a specific development stage. There are a lot of branching strategies out there. You can choose whatever is suitable for the team and the organization/company. It is important to keep this branching strategy consistent. It is also important to understand concepts such as forks, clones, downstream, upstream, merge, pull, fetch, commits, push, and practices such as short running branches vs long running branches.

### Tags

Tagging is a common and important practice when working with code version control. A Tag is a reference to a point in the repository history where it is marked for a version or a release. Tags have many benefits and provide visibility of changes between versions. You can also use tags to define different stages of releases such as alpha, beta, release candidates, and production releases.

### What Should be Version Managed?

Any code that is written to be later deployed into the production environment should be version controlled. This includes infrastructure as code, database scripts, software configurations, and even CI/CD pipelines. CI/CD stages can differ for different types of code. For example, a database migration tool can be used to automate the delivery and deployment of database scripts while a tool such as Terraform can be utilized to test and deploy infrastructure.

## Artifact Management

CI/CD stages produce artifacts. Artifacts can be a variety of things: coverage reports, test reports, performance reports, tagged build artifacts...etc. Defining what artifacts are required and what to do with them is important when building a CI/CD process. For example, you can deploy coverage and test reports to a test management tool or upload tagged build artifacts to a private or public artifact repository. Some artifacts are more important than others. For example, versioned build artifacts allow you to quickly roll back deployments to an older version without having to undo code changes or re-run CI/CD pipeline effectively saving a lot of time in case of emergencies.

## Infrastructure: To Automate or Not to Automate?!

You can run CI/CD pipelines regardless of how you provision your infrastructure. Yes, you do not need infrastructure automation to run CI/CD pipelines. But it helps. With no infrastructure automation, compute, storage, and network resources must be manually configured. This may reduce the efficiency of your pipelines, but they should still run.

It depends on the type of team and organization you work with. An environment where changes are infrequent may consider investing in an infrastructure automation tool to be a waste of money. But most software environments are dynamic and change frequently. For instance, when managing a microservice architecture, different resources are changing, new compute is constantly being added, and services are scaling up and down. Managing this manually can be a nightmare.

### CI/CD in an Automated Infrastructure

Running CI/CD pipelines in an environment where infrastructure is automated gives you an advantage and allows teams to innovate and utilize resources efficiently. Especially when it comes to utilizing the available resources. Whether you are running on a fully managed data center where you have a finite amount of resources or running on a cloud and trying to save the cost of managing development and staging environments. Utilizing platforms such as Kubernetes allows you to efficiently use compute resources. If you do not have Kubernetes or similar platforms you may want to provide a strategy to decommission unused resources and allow your CI/CD pipelines to provision resources if they are not available.

It is also important to be consistent when automating infrastructure deployments. A staging environment must be identical to production to allow you to run accurate performance and security tests while you may want to run a scaled-down development environment to save up on cost. Defining these strategies up ahead may save you a lot of time in the future.

## Securing DevOps Tools

DevOps tools are important and valuable assets for your organization. Code and artifact repositories may hold valuable information to your team or business while deployment tools can provide production access if not secured properly. Defining a secured architecture for these tools is as important as effectively using them. Common best practices are:

- Utilize the principle of least privilege. Only give the required access to the required users.
- If you are running automated deployment in production, isolate production tools from other environments.
- Encrypt and manage secrets, certificates, and keys using a secret management system.
- If you are using external dependencies in your code or for your tools, constantly verify them for any security issues and keep them up to date.
- Sign build artifacts to ensure their integrity and verify the signature before deploying.
- Implement access logs and automated controls to easily monitor and audit activities.
- Avoid running CI/CD processes with administration privileges.
- There are many more controls that depend on the type of tools and environment of your team/organization.

## Scaling DevOps tools

DevOps tools like any application can get into situations where scaling up is required. Whether you are running test servers with hundreds of services to be tested or a build server where you are running hundreds of pipelines, thinking about scalability is a must. If you ignore it, your pipelines will slow down, and your tests will potentially fail. Most of the popular tools recommend how to scale up or down. Study and plan to avoid unexpected failure when you do not need it.

## Considerations when Procuring Technologies

It is easy to forget about developers and DevOps when looking at a new fancy tool with hundreds of features. But these features can quickly be your worst nightmare if you do not consider how development teams (including QA, Security, Infrastructure, ...etc.) will work and deliver using these tools. The following are a few recommendations to consider when looking for various tools (from my experience):

- Always look for tools with an easier learning curve.
- Look for tools with a strong community and have published well-known practices.
- Have a look at the tool's documentation. It will give you an indication of how easy it is to acquire information.
- When looking for tools such as API management tools, Service Bus, ...etc. make sure to consider how well can these tools integrate with your CI/CD and DevOps process.
- Consider how the delivery will work in an isolated multi-environment setup.
- Favor modern tools that provide a better user(developer) experience.
- When looking for deployment tools, opt-in for agentless deployment tools if possible.
    * Easier to manage agentless vs an agent for each virtual/physical deployment server.
    * Save on cost, especially if the tool is licensed per agent.

## Conclusion

If you are seeking to adopt DevOps practices including CI/CD, paying attention to the enabling tools only will not be sufficient. The processes, environment, and of course the culture around these enabling tools are as important. DevOps is all about shared responsibility, consistency, and transparency. Paying attention to the development practices, quality, security, and infrastructure services is crucial to building efficient CI/CD pipelines and adopting a healthy DevOps culture.