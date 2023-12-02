---
number: 29
title: "Evolving the Legacy"
slug: "evolving-the-legacy"
date: "12-20-2022"
subtitle: "One of the benefits of working in product companies is watching your product evolve, nevertheless, that road won’t be only a matter of innovation but avoid things turning into impossible to mature legacy systems."
photoId: "U-aQ76kHWqc"
photoAuthor: "@roaming_angel"
--- 

One of the benefits of working in product companies is watching your product evolve, nevertheless, that road won’t be only a matter of innovation but avoid things turning into impossible to mature legacy systems.

One of my favorite references to the term I came across, which also motivated me to write about this, is from a book called *[“Kill it with fire”](https://www.goodreads.com/book/show/54716655-kill-it-with-fire)* which I truly recommend.

As [Marianne Bellotti](https://twitter.com/bellmar) says in her book:

> To understand legacy systems, you have to be able to define how the initial requirements were determined. You have to excavate an entire thought process and figure out what the trade-offs look like now that the options are different. Simply being old is not enough to make something legacy.

The reality of the moment something was created doesn’t mean we have to carry on all the decisions when making a refactor or an upgrade, as the definition says tradeoffs might take a different path depending on newer contexts.

## Technology

Modernizing technology for the sake of using something newer can be mistakenly confused as a way of dealing with legacy systems.

Defining which part of our solution needs to be evolved is where the puzzle is. Switching product A to a newer technology doesn’t mean it will be easy to adapt to the new reality.

I have seen this situation happening in places where a framework is introduced as a result of a partnership or just because it’s trending.

Although it can have drawbacks, using a well-known framework can also have benefits, as, it will make it easier to get new people on board. Imagine that if we have to still provide support to an old system that developers are unlikely to find, we might end up blocked.

## Identifying the steps

As part of the previous point, we need to identify and scope as small as possible which is the part that needs to modernize.

Things like refactors and revisiting past decisions, and old vs new requirements can become crucial in the way we define the parts that are considered legacy against just old but functional.

Having deprecation policies will help us in regard to communication with our customers or consumers. It will make innovation and migration a lot easier to handle.

We have to make people aware of the change by explaining, not turning this into a revolutionary change, provide context and data on which we based our decisions.

There was a time I worked on a project that involved convincing people to move to a mono-repo setup and it was quite important to emphasize the communication of it, explaining the reasons behind the change, in order to have everyone onboard by understanding the reasons and not only the technology implications.

Communication is key, in preaching the idea and the people that might be affected by any change we would like to introduce. Speaking a common language to convince stakeholders what needs to be done, will play an important role in the whole process.

## Undocumented code

How often have you heard the phrase: “it has to work like this”?

In situations like this, where requirements are not set, and by looking at the code it’s tricky to abstract the decisions that were made while that was developed.

Moreover, as we cannot understand the context and historical decisions, is quite easy to drag errors or mistakes that were made back then and pull them into the new solution.

After going through this situation a few times, I try to remind myself to write conclusions and decisions that I have made when developing something. Rather than putting documentation that can be seen in the code, I focus on context. So that if someone is reading my code plus reads the story I tell, it will be much easier to avoid mistakes.

The same concept applies when submitting solutions for the take-home type of code challenges in technical interviews. It will help the interviewer to understand my way of thinking and the tradeoffs I have to consider while thinking about the future, which could be completely wrong. But in a situation where the future is unknown and requirements are vague, it’s completely valid.

## Institutional Knowledge

One of the things that people tend to forget when dealing with this situation is institutional knowledge (also known as [institutional memory](https://www.notion.so/Managers-en-tiempo-record-f2b1e3fcac0b465b8feac219fd0a8a1b)), and how tight these decisions of evolving a legacy are to the process and the culture of the company.

Having people who are long committed to the company culture, and have been working there for several years in multiple positions, will help to move the process easier.

As you can imagine in places with low retention and high attrition, having people leaving constantly will cause the institutional knowledge to be gone. Thus, having discussions or defining processes to move legacy systems would be more difficult to structure and move forward.

## Politics and reorgs

A bit related to institutional knowledge, there are cases where evolving something legacy affects the shape of the organization as well.

Coupled software tends to be by definition, more complex to maintain, difficult to test and scale, and hard to adapt to new situations, among other technical advantages, but from a business and strategical perspective keeping the parts decoupled can benefit from outsourcing part of our solution, to name one example.

Let's imagine we have an e-commerce website, and we have our custom in-house logging system if that was coupled or de-coupled, it can make the transition to external solutions simpler or more complex.