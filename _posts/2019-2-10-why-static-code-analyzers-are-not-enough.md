---
layout: post
title:  "Why Static Code Analyzers are Not Engough"
date:   2020-02-10 22:45:13 +0300
tags:
  - Software
  - Static code analysis
  - Quality
---

Software is often written in complex environments with so many random variables and changes that are hard to predict. To deal with uncertainty, organizations with IT focus are trying to shift into Agile development. This shift is often accompanied by the need for automation. This automation movement has touched many aspects of the software development lifecycle. Most importantly, code quality.

Static code analyzers are software tools that automate a set of "quality" rules and statically check code repositories against these rules to identify violations. They also provide insights into test coverage percentages and common bugs. These tools, in the eye of many people on the internet, are great for ensuring the quality of codebases. They give early feedback for the kind of issues produced by the configured rules. They also, in the eye of the same people, can help developers write more secure code. In practice, however, these tools are doing more harm than good.

## design is dynamic

Code is written to conform to design and designs are made to implement a business objective. Business requirements are dynamic, so is the design. To introduce static measures for such dynamic variables produces misleading and inaccurate results.

Static code analyzers are dump. They are unfamiliar with what the software does, the process and complexity of producing such software and even the frameworks and, in many cases, the technologies used. Measuring code quality with just how many lines of code written, spaces or tabs and unit test coverage is ultimately devaluing the effort, time, communication and objective of the produced software. Combining such measures with the need for speed produces wonders and workarounds just to make code analyzers flag the code as green. In the end, you end up with a pile of never-ending technical debt, non-existent design and even to business requirements tailored to some technical assumptions only a few know about.

Writing code requires humans to think and interact. Quality design and code are hard to produce. Uniformity of the code does not indicate good design. Test coverage does not guarantee code is working as intended. At the end, who confirms that your tests are correct?

## Quality Needs Time

Think of software as a plant. It needs light, air and just enough water to grow. If these variables are out of balance, your plant will eventually die. You cannot make it grow faster by overwatering it. The time and effort spent to build quality software will eventually reduce your time and cost of putting out production fires. Quality code needs time and focus. If all tools, environmental and technical, are not available the value of automation is reduced to none.

Agile is not about speed. It does not mean the project will finish faster. Agile is all about delivering incremental chunks of value to users for faster and clearer feedback. Allowing design and requirements to evolve with limited assumptions.

## Code Review is the Ultimate Tool

Nothing is better than a human eye. Nothing is better than a human eye that understands the context and the environment in which code was written in. Do not ever consider code review as a waste of time. And do not ever externalize the review to some members outside the team. Individuals within the team value each other's opinions. They have the dynamics and all barriers are brought down for better constructive feedback. Outside inspectors will give comments that are out of context without considering the design considerations and the culture surrounding the code. It is not their fault, they are simply not in the position to review such code.

## Conclusion

Static code analyzers will not magically fix design and quality issues. Paying attention to team dynamics and building healthy environments makes everyone feel safe to ask questions and give feedback. Technical design is important. Agile does not mean no design. Agile does not mean speed. Speed comes naturally. Focus on what value is delivered and give things their proper time. Write tests to make sure code works. Don't write tests to increase coverage. Review code within the team and avoid externalizing code review to outside inspectors.

Leave static code analysis tools to do what they are designed for: Keep code uniform. Static code analysis tools, in my humble opinion, should never be a primary source of code quality metrics.