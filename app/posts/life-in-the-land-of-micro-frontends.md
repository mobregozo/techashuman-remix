---
number: 13
title: "Life in the land of micro-frontends"
slug: "life-in-the-land-of-micro-frontends"
date: "06-15-2021"
subtitle: "Whether you see the need to make this happen, the world keeps evolving, but before you take this step, there are some drawbacks that need to be considered."
---

Whether you see the need to make this happen, the world keeps evolving, but before you take this step, there are some drawbacks that need to be considered.

The main idea of this article is to focus on the non-technical aspects of having this setup and describe some of the pros and cons of going in this direction.

## Context

I would like to explain this evolution from an organizational-human perspective as a result of an iterative process. Because we tend to forget that sometimes the organizational structure we have is the one dictating the architecture we use.

Generally speaking and considering the starting point of a product that is making its first steps, defining a well-structured monolith can be a better and more pragmatic initial plan, otherwise, we might start creating confusion and dependencies from the baseline of our work.

The result of this iterative process explains why we are currently discussing these big migrations and the adoption of new architecture plans, where companies or product decides to split up a large application into more atomic components which are divided by specific domains, driven by the maturation and transformation of the initial idea.

This architectural pattern, far from being something new, started to get some promotion with the raise of the micro-services architecture, mainly in big corporate domains, where migrating from the good old monoliths started to become a common evolution.

Similarly, we can apply the same reasoning to the frontend world, where applications grow to the point that platforms are really hard to maintain and scale. That’s where I see the comparison of this term and mapping from backend micro-services into what we know as micro-frontends. In other words, we split the monolith of UI into smaller blocks to get the same benefits.

## Impact and implications

The fact that it has emerged in recent years, explains the lack of standardization and conventions about what it is a micro-frontend and what it is not. Thus the definitions and ideas can vary on the author or implementation.

But if we take a step back and think about the reasoning behind this, without getting into the technical details, we can think of the necessity of having multiple cross-functional teams with their own autonomy and fewer external dependencies.

A situation where it is valuable to have subject matter experts in a specific area, where a full team can focus on one single topic and increase their expertise on that.

But we need to be clear on something, we don't always need this business model.

There will be times when such autonomy is not even necessary and having that kind of setup will be overkill for the team adding overhead instead of benefits. Just to realize in a late stage that we have created a monster that is really hard to maintain.

Although you can argue that software is developed by humans, still, the best definition I have heard about micro-frontend is:

        It is a technical solution for people problems

At this point, it all sounds negative, or probably it is getting complicated to find what to me is the real need of having this possibility available for us to take, so let's get into that!

As a general rule, I will assume we try to find solutions to maximize our productivity and autonomy as possible.

So, what if we, even though we are building a large-scale frontend application/platform, can split the UI into teams and have autonomy over the rest and manage our own “startup” inside? Well, that's exactly the point where I see why micro-frontends are a **potentially** good idea.

Looking back to our current situation and in the agile world that we live in where the plans and requirements can be diverse over days, having the possibility to be autonomous in big organizations becomes something crucial. Of course, there is no such thing as isolation. There will always be external dependencies from others parties.

But we have to be careful, making this split and having the setup around can be a game-changer but also a big-time investment in terms of resources, education, and tools on making this scalable and robust.

In terms of usage, this can apply to different domains, for instance, I see this happening lately in the world of core systems, as in products that produce multi-tenant sort of solutions, where the challenge is to please the needs and requirements of all the different consumers, and that is when the micro-frontends come to the rescue.

The micro-frontend architecture, in this case, brings the possibility to those consumers to include and develop their own specific domain solutions and plug them into the core system, which in the end is the one putting all the chunks together creating a large-scale frontend solution.

Leaving the technology impact it can have aside, in terms of velocity, it allows the core-system maintainers to focus on their own roadmap and bring new features on their own rhythm instead of trying to feed all the different consumers and the different needs they can have and differ from the others.

As you might be thinking, there are not only benefits, having that in place can trigger difficulties in the process in alignment, synchronization, quality control, standardization, visibility, etc.

We can think of many others applications, it is just a matter of creativity, but as a top takeaway from this article let these changes happen organically with the growth of the business.

## Advantages

As I described before, having this setup in place can give some benefits, especially in terms of team dynamics. So let's name some of them.

- Autonomy is the one with the biggest impact, in terms of progressive and continuous deliverables, velocity, scoped roadmap, dependencies, and experimentation (A/B testing), among other subjects we can think of.
- Productivity boosts in terms of technology because people can work in the framework they feel more comfortable with. Taking into account the performance implications, it is possible to develop something framework agnostic, which can also contribute to moving things faster in a more pragmatic way.
- Productivity boost in terms of scope, having a close scope makes it easier to be productive and gain expertise in the area with less context switching. You don't need to know it all and can focus on what your team is trying to solve.
- Easy ramp-up newcomers as it is a small app, easy to get set up with the environment, and less overhead when getting an idea about the rest of the app/setup that you will learn over time.

Having individual domains makes it easy to swap small pieces of the software we are creating. And just in case the company decides to outsource a particular part of the app this can make that switch easier to move forward.

## Challenges

By all means, there are always some buts, and this is not meant to be for every organization. Here are some of the drawbacks caused by implementing this. I wouldn’t call it disadvantages but challenges that you may encounter if you decide to follow this road.

- Having all the parts connected and aligned has the cost of synchronization, negotiation, and even the politics involved in the process. This can also include the need of having a team to coordinate that.
- Developer Experience, as you have to invest time in building the infrastructure the developer experience we build on top of that can impact knowledge retention in terms of people.
- It can take time to educate and build the mindset needed before taking this approach. And If you're not disciplined it can lead to chaos and memory leaks all over the place.
- Defining a standard, guidelines, etc - Now that the application is broken into smaller parts, it can be hard to keep all teams working off the same standards. Some teams might advance more than others and either improve or diminish the quality. Keeping everyone on the same page is important to delivering a high-quality user experience.
- Interaction between the different parts can be complicated if it is not well structured/organized.
- Complexity in design, deployment, and testing. Now that our application dynamically loads content, it can be harder to have a full picture of the full application. Making sure to keep track of all the micro-frontends is a task in itself.
- Deployments can become riskier, as you’re not 100% sure what’s being loaded into the application at run time. This leads to harder testing. Each front end can be tested in isolation, but getting a full end-to-end test is tough, real-world user test is needed to make sure the application works for the end user.
- It might be good to have managers to protect your team, but it can also encourage competition if the community's feeling is not well taken or adopted.

## Usage

As micro-frontends are not always a good fit for every problem we have, here are some cases or situations where I wouldn't recommend using them.

- When the problem we are trying to solve is highly coupled, which in the end goes against the main purpose of having micro-frontends.
- When the capacity of having different teams is out of the table because you have a single cross-functional team responsible for the whole application, which can also be summarized as the fact of having a small team.
- When the backend is not a well-defined monolith, which will make things complicated in case we want to move blocks of our frontends in iterative processes in an autonomous way. A refactor, and team re-organization can be a side effect of this.
- When your organization has a lot of contractors/freelancers because it makes it hard to keep the knowledge and having to keep expertise in all the subjects.
- When the possibility of having a team to build the platform is out of the table - the tooling around micro-frontends is hard to build, maintain, and customize.

This analysis was based mainly on personal experience with large teams and stories from other colleagues.

Hope this helps to at least get an introduction into this subject and clarifies the basic idea of what micro-frontends are slowly becoming a common thing around us.

## Further Reading:

Here are some articles and further reading I recommend. 

https://www.sitepoint.com/a-beginners-guide-to-the-micro-front-end-architecture/

https://en.wikipedia.org/wiki/Domain-driven_design

https://css-tricks.com/micro-frontends/

https://medium.com/dazn-tech/identifying-micro-frontends-in-our-applications-4b4995f39257