---
number: 15
title: "Rage against the technical-debt "
slug: "rage-against-the-technical-debt"
date: "02-09-2021"
subtitle: "Despite the role, from developer to manager, getting into the topic of technical debt always refers to a nice challenge."
--- 

Despite the role, from developer to manager, getting into the topic of technical debt always refers to a nice challenge.

There are, as always, different ways to handle and explain this situation that we might encounter in any development cycle.

Tech debt is an indicator that is used in software development to illustrate how technical tasks are piling up because shortcuts were taken.

As with most types of debts, the more you procrastinate the bigger it gets, becoming something difficult to pay off.

Mainly because I have seen the benefits of having a clear process, handling tech debt is something that I always push for.

## Getting started

What are those shortcuts or tradeoffs that increase our tech debt, what exactly is what people called tech debt?

In my own words, it is the debt that we have to pay when a short time technical decision was made. The sense of, we were pressured to put something live in production and we took some shortcuts along the way. This will cause that somewhere in the future will have to pay back the lack of time investment we did.

So let's go over and name some of the implications and consequences this has in the long term if we don't take care of it:

- Confusing and hard-to-understand code base structure.
- Hard to automate different processes related to deployment procedures.
- Legacy code, hard to maintain, and migrate to newer versions/libraries.
- Hard to remove or replace external dependencies because there are tightly coupled to our software.
- Hard to introduce new functionality due to messy code.
- Hard to onboard new devs, as there are no standards.

There's no such process that helps to tackle all the things I have mentioned, but small tips you can gradually incorporate.

It's about making tech debt everyone’s problem.

When discussing solutions, It doesn't always have to be planned. I have seen teams keeping track of this in a more dynamic way, but in my opinion, whether you work under agile methodologies (.i.e: Scrum or Kanban ) or even waterfall, the flow goes better if the process is well structured.

Structure doesn't mean a meaningless process or unnecessary documentation to fill up to justify why a purely technical change has to be done.

So I am basically telling you not to define an overkill process for the team. Baby steps to the rescue! define agreements that will make it easier to save time to work on these things at the right time to prevent the [snowball effect](https://en.wikipedia.org/wiki/Snowball_effect).

The difference between wasting time and investing time is critical to understand this, if any of the people involved are seeing this as a waste of time, you have to stop the flow, define, explain, and set the context about why it's not the right time to tackle this.

As a developer, I see speaking out, as a mandatory skill to have. Speaking out, as in, sharing concerns as soon as they are discovered. Procrastination will never be a way out.

Speaking out can also include a mix of negotiation skills because at some point we have to "sell" our idea, and why, whatever we have discovered, needs to be handled, otherwise, their future effects will be worse.

## Causes

Let's get a little bit more technical, and discuss some of the reasons tech debts usually exist.

In my experience, regardless of the type of business, from small products to big solutions, tech debt will always be there. And the main goal here is to reduce it as much as possible.

## Not upgrading dependencies

Using the process of updating any of the existing JavaScript frontend frameworks as an example, we can imagine if we keep on postponing this task, on a technical level, the breaking changes will be much more difficult to fix at a late stage.

Thus if no action is taken to tackle this on time, our debt will be exponentially higher.

Updating doesn't mean we always have to be at the top, but just keep a balance.

**Where's the value of this? How can we convince the team to reserve time to work on this?** Better performance to our end users, smaller bundle sizes, use of newer APIs, less critical bugs, among others. From another perspective, it can also attract potential newcomers to work with state-of-the-art technology and easy to promote innovations when frameworks release something brand new.

What works better in my experience was to dedicate time to work on this every month or quarter, depending on the release process of the libraries you are using.

Side note: Defining a deprecation policy, usually helps to push forward and prevents supporting a high range of versions.

## Not refactoring on time

Most of the devs are aware that part of the codebase could have been done in a better way, it has evolved into complicated software because of the number of quick fixes introduced. But due to the lack of time, it's hard to find the time to work on this and redesign it.

**Impact and value:** A new roadmap has been established, the company is taking a new road, and you as a dev who knows about the codebase take this opportunity to share some concerns and get time to refactor some parts of the code, because otherwise it will hold our backs and prevent the company to iterate in the new direction.

## Lack of context

The lack of context when technical decisions are made, and missing the ability to foresee problems in the future, are as well, some of the most common root causes of tech debt.

The context in the sense of, when developing a new feature, trying to get a common understanding of why we are doing it, what's the impact, and what's the way to measure it. Basically, know all the information to make a good technical decision by knowing the long-term plan of this new functionality.

## High pressure

There are times when external dependencies and business pressure force us to take shortcuts and quick technical decisions.

In some cases, there is nothing that can be done in this regard, but what usually helps is to keep the quality and distribute the deliverables in smaller iterations, keep the deadlines but deliver something that doesn't compromise the quality of the software.

Negotiation is a key strength to have, and try not to underestimate it due to high pressure.

And last but not least, speak out on time. Don't be afraid of being the party pooper, having quicker feedback, becomes handy to define better plans.

## How to structure it

Having discussed the main reasons, let's try to define how can we make this less painful.

And, as you might be guessing, it depends!

The first thing to clarify, try to find a structure or process that fits your team's necessities, and business needs. Don't copy something you have seen online or heard about, whatever works for others could end up in an overkill process for you.

Talk to the product team! Whether you have a Product Owner or a Product Manager, there must be a stakeholder around from whom you can get feedback first. Feedback about the roadmap and priorities so then it is easier for you to come up with a plan in how to structure and prioritize the tech debt.

As engineers, we have to provide the potential risks and which things have to be mitigated urgently or the ones that could be postponed for a while, especially if we can already predict that they can influence the goals and road map of the product. Extra points if you have data and metrics to prove that.

Once the priorities are clear and the negotiation with the stakeholders has been done, the next step that I recommend is to come up with a structure for it, in the sense of making it part of the development cycle you have. Just to avoid converting it into something you take upon ONLY on demand. In other words, be preventive and not reactive.

The best formula I have worked with is to score the priority level as a balance based on the value/impact and the risks.

Depending on the team, and the preferred methodologies there are multiple ways to tackle this. There are the ones who prefer to have 10% or 20% of the stories of a Scrum sprint related to tech debt. The ones who prefer to do rotations on a Kanban setup, and make sure the team always finds a time slot to work on tech debt.

As I said before, it is a team effort and responsibility to come up with a plan that fits the team and not the other way around.

Other things that help to keep things organized:

- Document improvements or potential risks.
- Define quick-wins. Small tasks that can be done in a time slot when switching between big tasks can make a high impact in the really short term. And reduce the context switching.
- Having workshops to try out different solutions.
- Take some time apart to prioritize and investigate the technical limitations of the codebase.

## Responsibilities

Like with many other things in the agile world, this is not a one-person responsibility nor something that one particular role has to act as the owner.

I am not a big fan of this phrase because it is used to justify when no one is taking the lead on a particular subject, but this is also a team responsibility.

I just picked what seems to be a general team composition, but this might differ depending on the setup you work at.

Although we are all equally responsible we might find different ways to see this depending on our roles.

**Product Managers and Product Owners** From the team and from the product perspective, based on the feedback from the engineers understand how pure technical tasks can influence and impact the roadmap and the upcoming features.

**Managers** Understand the reasons and support the team's members, and make sure there's time allocated to deal with these problems.

**Engineers** Share feedback constantly about limitations, and concerns, and be clear when a rushed decision has been made. Be transparent when it is known that it will have future implications. And last, be alert when the roadmap is presented if any known issues can be dependent on its progress.

## Further Reading

There is a nice post in this subreddit that I like, where this topic was already discussed: https://www.reddit.com/r/ExperiencedDevs/comments/patayy/should_we_reduce_tech_debt_silently/