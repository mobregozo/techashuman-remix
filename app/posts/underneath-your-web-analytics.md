---
number: 16
title: "Underneath your web analytics"
slug: "underneath-your-web-analytics"
date: "09-22-2021"
subtitle: "Even if you have low traffic on your website, having a deep look at your analytics can make a difference when making decisions."
---

Even if you have low traffic on your website, having a deep look at your analytics can make a difference when making decisions.

The whole process was a learning experience for me, and it took me some time to see and understand the benefits of having an analytics web tool in place, and how useful this can be when making decisions about adding new features or changing existing functionality.

This method is known as data-driven decision-making (or [DDDM](https://www.tableau.com/learn/articles/data-driven-decision-making)), which refers to the process of making decisions based on existing data rather than intuitions and assumptions.

I am not telling that intuition is a bad habit, it's only a matter of finding a balance.

## Showcase

Let's use this Blog as an example and analyze some of the changes I have made based on the information I have collected from the analytics.

In case you are reading this article from an external source, here is the link to the website: https://www.techashuman.com

Because I care about the privacy of the visitors and having a banner with cookies consent was always a no-go for me, I chose [Nibspace](https://nibspace.com/) as a paid alternative from google analytics, which is also blocked by default in some modern browsers.

As Nibspace decided to shutdow its services in may 2023, I have decided to switch to [plausible](https://plausible.io/about)

Despite the audience I have is not insanely big, I have learned a lot by reading the data I get from my analytics service. Lessons learned can be used for other projects as well.

Curious about how this dashboard looks? you can open and play around with the main dashboard in here https://nibspace.com/manuelobregozo.com.

Understanding the data that this tool is presenting us, becomes the first challenge to address.

From all the different available metrics in the dashboard, before focusing only on increasing the audience, I started by understanding the **bounce rate**.

For those who are not familiar with the term, the **bounce rate** is a metric tight to [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization), which shows the percentage of visitors that leave your website after checking only the first page they reach, without making any further action. Having 0% as the lowest and 100% as the highest value.

Defining what a good or a bad **bounce rate** is could be difficult because of the relation it has with a user journey and the expected user flow. Meaning that high or low rates can be expected in some particular scenarios, where the engagement of the users differs in what is the main goal of the website.

Going back to our case study, usually, the **bounce rate** of this particular website oscillates between 50% and 70%, which is somehow expected for a blog, where normally, users enter the landing page, read the article, and then go away.

So in a summary, It depends on which link the user enters the website. As in, the impression you get might differ from the home page and an inner/deep link of a particular blog post. So when users visit a particular article and go away will make the **bounce rate** go up but if they enter through the home page first instead, their interaction will be different causing the rate to go low.

In another example, if we happen to have the same rate (close to 70%) in an e-commerce website, where the user engagement of the visitor's journey is different, will mean that we will need to work on why our visitors are leaving earlier than expected.

Anyhow, the rates of my website weren't always like that, it took me a few changes and updates to get to my initial target which was somewhere close to 50%, not too high not too low. As I want my visitors to find the content easily but encourage them to navigate around the different sections I have like Experience and Bio.

### Understanding the audience

At the time I started to do some shameless auto-promotion about my articles, I did it (and still do it) on Twitter and Dev.to, a promotion that didn't end up so well because most of the people I follow on those platforms or who follow me were expecting more technical content. And what really made the trick on this, was to start using Linkedin and other communities where people may have an interest in the content I write about which focuses more on the people rather than the technical aspects of the IT world.

After a short experiment of promoting the articles on these different social media platforms, I noticed that the **bounce rate** was lower for Linkedin users, meaning that they were interested in reading other articles or getting to know more about me. Of course, this wasn't the only metric I was checking, the audience and amount of likes were higher on Linkedin.

Higher or lower is not necessarily better or worst, but having a look at those numbers helped me to understand how to target a better audience for my content.

### Device types and browsers

Knowing about the devices, operation systems, and browsers your visitors are using becomes something crucial if you want to improve the experience on every platform.

By filtering the devices I was able to realize that the majority of the visitors of the website are using mobile devices, which encourage me to improve the navigation flow of that particular layout. So I developed an easy-to-navigate navbar.

The time and effort I invested in that truly paid off, as the **bounce rate** for those devices went low, again, from which I can assume they were navigating across the website after loading the first landing page.

This particular analysis helped me not only to be careful when introducing new features but to do better testing for those devices whenever something new is introduced.

### Content

As I explained earlier, making the flow interesting from direct links, showing other content, and making the top navigation bar more clear and more visible were a few things that move the **bounce rate** to lower percentages.

But that was only the starting point of my analysis, taking into account that this is a recurring process. So, for instance, I'm also planning to enhance the page of every blog post, by showing related posts or even allowing users to make comments, and click a like button, among other ideas.

Not only the content itself but the language can also have an impact, I started in Spanish but then moved everything to English, because it helped me to be more inclusive with the users, which ended up reducing the rates for non-Spanish speaking countries, especially the ones where English is the mother tongue.

Those were only a few areas where I decided to put the focus for now, but beyond what I have already shared, a few other tips that can help you improve your **bounce rate** are:

- To increase performance and the way the content is loaded on the website, Lighthouse from Google is a good tool to measure the baseline. Heavy to load websites can cause people to leave your page.
- Content overload, causing the user to get lost, can be another way to scare your users away.
- Clarifying user expectations, and understanding what type of information your audience is looking for, can increase engagement.
- No popups, banners, notification alerts, and so on, can cause a bad first impression making users get annoyed.
- User experience, having an intuitive design, and clear goals in terms of user experience will help the users to stay around.
- Learn more about SEO, and how optimizing the website can help you to get to particular percentages.

## Experimentation

Doing experiments and trying different things and measuring how the users behave, is somehow related to [A/B testing](https://en.wikipedia.org/wiki/A/B_testing), a methodology that can help you to try different things and get some data in advance before making a drastic change. And as a side effect, this will help you to have shorter feedback cycles.

I know we don't always have the infrastructure ready for this, but experimentations could be a tryout of changes where you want to validate assumptions.

A clear and simple example I can relate to this is the change of wording I have made in the navigation bar. In the beginning, I decided to call the blog section "thoughts" referring to the origin of the articles, as they all started as random thoughts. And just for the sake of trying something different, I did the experiment for a week to change it to "blog" instead, causing the **bounce rate** to get closer to my expected numbers.

And by knowing the results of that experiment I decided to invest more time and refactor the website, remove the links that were pointing to "thoughts" and redirect them to the new "blog" section instead. This a simple example of what a data-driven decision is.

Final takeaway! the **bounce rate** is relative, **it only tells you what users are doing**, so before trying to make it go higher or lower try to target an expected **bounce rate** and then work on that. As we discussed before, depending on the domain of the websites the results can have different meanings.
