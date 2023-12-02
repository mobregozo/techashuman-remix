---
number: 5
title: "The human side of Pull Requests"
slug: "humanize-code-reviews"
date: "01-26-2021"
subtitle: "I started to get interested in this topic when I came across an article called \"How to Do Code Reviews Like a Human\" by @deliberatecoder."
---

I started to get interested in this topic when I came across an [article](https://mtlynch.io/human-code-reviews-2/) called "How to Do Code Reviews Like a Human" by [@deliberatecoder](https://twitter.com/deliberatecoder), which immediately caught my attention I think did an amazing job of exposing this topic in the way he did.

        TL;DR Be respectful and empathic, it will help you more than you think.

For those who are not familiar with the term, Pull requests (PRs) occur when a developer requests that their changes be considered for merging with a project's main repository. It is usually part of the development workflow, helping to prevent potential problems at an early stage.

Having said that, I would like to start this conversation by saying that from my understanding, and having looked up some references, the purpose of code review is to learn and point out what can evolve into errors in the future (it can also be seen as a quality assurance mechanism) and not play the blame game or showing other how much do you know by shaming them, among others negative sides effects that you can imagine or think of.

In my experience, after working on large-scale solutions, with over 300 devs contributing to the same codebase in a mono-repo setup, the concepts, and ideas I got from the articles I mentioned before were more than useful. And some of the stories that were pointed out there I can say that I even experienced them for myself while dealing with PRs.

Like many others processes, reviewing PRs is something that can be both learned and taught over time where standards and guidelines generally help establish common ground with both parties - the reviewers and the one who submitted the PR. But it is always up to the team to handle this communication flow and feedback with care due to the human interaction involved in it.

It is a situation where egos must be put aside for a smooth transition. And for that to happen, on the one hand, from the reviewer’s point of view it will be easier if we focus on the objective of the quality gate by demonstrating constructive feedback based on our experience and the perception of potential issues where questions could be asked and no assumptions should be made. And, on the other hand, looking at the person who submitted this change, getting defensive does not help, but being willing to learn and listen by taking the proper time to analyse all the comments and recommendations. Always remembering that you should never feel like there is something personal against you.

Funny enough, the best coding advice and tips I got were during code reviews, other than I felt like I was going to make the same mistakes over and over again.

It sounds simple and easy, but this can quickly escalate and create a competitive feel where developers are trying to fight just for the sake of being right. And it can technically lead to overcomplicated code.

I have a feeling that people tend to forget that when reviewing pull requests there are certain things like feelings/effort/thinking involved from both sides of the fence.

To sum up, this is why sometimes I tend to say “Tell me how you review PRs and I will tell you who you are”, it is impressive how much you can learn about other people's personalities just by checking out a PR review.

My recommendation for anyone interested in this topic is that read the attached articles (both parts 1 and 2 are really good) be careful with your opinions and think about how you would react if you were in the other person's shoes.

## EXTRA!

Some similar situations can also happen every time you join a new company and start looking and getting familiar with their tech stack.

As has happened to most of us, every time we start looking at a new codebase it is super easy to become critical and ambitious, which in a number of ways can help the product to perform better, as you are bringing a new pair of eyes, a fresh look that contributes to making people aware of things that they have gotten used to.

But you have to be careful! It is easy to be critical without understanding the context and why things were developed that way. Do not judge people without having a clear picture and idea of why decisions were made. Lack of context could help to underestimate situations where people felt pressured or even forced to ship faster without making them proud of what they have built. Business needs can sometimes push us to deliver things that we know could have been so much better.
