---
number: 6
title: "From a resume to a blog"
slug: "from-a-resume-to-a-blog"
date: "02-08-2021"
subtitle: "Here is the story of my website. Since I wanted to learn something new, I have been developing my personal website with Nuxt and couldn't be happier with it."
---

Here is the story of my website. Since I wanted to learn something new, I have been developing my personal website with Nuxt and couldn't be happier with it. 

        Before I continue, I would like to clarify that I took this path because I wanted to learn any of the new static website generations, so If I were to focus on the final product I would have taken a shortcut and be more pragmatic by using another tool that does that for me and prevent reinventing the wheel. But this time I just wanted to build my own platform and use that freedom to learn new things along the way. 

I am aware that there is a lot of hype around other frameworks for building static websites (which is fully deserved), but I think Nuxt has nothing to envy, especially in terms of developer experience and end results. 

Going back to the story, I wanted to learn Nuxt, and instead of creating one of those classic weather or a TODO application, I decided to create my own website, which I can incrementally improve over time. 

Something that helps me to keep track of the project and any ideas that suavely come up during the development process is to create issues for anything under the repository on GitHub. So that will help me to have a backlog of ideas, and be more organized if anyone would like to contribute to the project. 

Enough about the context! let’s get started with the tech stack! 

So… 

## Why Nuxt?

Well, I just like VueJs, somehow it is intuitive to me, might be because I have worked with AngularJs for quite a while and the directives concept was not new for me, so the learning curve was not that high, anyhow intuitively is one of the top things I heard people tend to like about VueJs in general. 

My first contact with Nuxt was doing a workshop at a conference in Tenerife called CanaryJs by [@MarinaAisa](https://twitter.com/MarinaAisa) (you can find more details about it [here](https://marinaaisa.com/blog/blog-using-vue-nuxt-markdown)). An event that I totally recommend going to, once conferences are back; amazing place, and the talks there could not be better! I met a lot of nice and good developers during my stay there, and price-wise it is super affordable! 

As it happened to me already with most of my side projects, In order to make it not fail, I decided to scope it to small iteration (a tip that I can recommend to every side project). 

So I took my resume as a guide and then transpile the sections of the resume into static routes on my web, which led to the following pages: About, Experience, and Interests. 

Having the structure, I defined the tech stack that I will describe in detail but take into account that some decisions were made only for learning purposes, and in other situations, I would have chosen whatever framework I feel more comfortable with. 

**[Update]:** I wanted to get better at NextJs, so I moved the whole project to this technology. 

## Why TaildwindCSS?

Since the project is quite simple (also because I never had strong feelings about writing classes and using BEM) I decided to give TaildwindCss a try. Not sure how the experience of using Tailwind on a large-scale project could be, but in my case lot of prototyping kinda pushes me to try a utility class framework. 

## Why Netlify?

Together with Vercel, they are as per my understanding (and as someone who is not really big into DevOps) the top two hosting providers, that will help you to have everything up a running by following only a few steps. Github integration, easily defined environment variables, and previews on Pull Request are among others, my favorite features. 

The first version of my website was live like that for several months, until I finally got the courage to start publishing the articles I was writing in my free time, thus it was time for the next iteration: the blog! Something that started as a recommendation from my psychologist and I turned into a daily practice I use to move ideas and thoughts from my mind into a piece of paper, and eventually a blog post. 

**[Update]:** Do to a migration of the whole project to NextJs I have moved to Vercel. This is new [repository](https://github.com/mobregozo/portfolio-next).

## Why Prismic?

After analyzing a few CMS alternatives a friend of mine recommended Prismic (only because he used it for a marketing page and he was surprised about how easy to handle data types and how nice the API to consume that information is). My friend's recommendation plus the support for Nuxt finally convinced me to try it, and I completely agree! The developer experience of Prismic (at least with Nuxt) is really good! 

With that in place, I added a new section to the website that I called “thoughts” - just to make a distinction between posts, because I wanted to be super clear that these articles were only thoughts and opinions about random ideas that usually come to my mind. 

And just like that, I can say that I have a simple website now, easy to manage where I usually post thoughts every other week, trying to keep the habit to make it easier to achieve. In case you want to know more about it, here is the link to the [repository](https://github.com/mobregozo/portfolio). Any type of contribution is more than welcome, and for sure everyone is invited to fork it and create their own, which is the main idea why this repository is open source. 

**[Update]:** As it was an overkill to keep the CMS up to date with NextJs, I have decided to moved to having md files for the blog.

 ## Why Google Analytics?

Just because I wanted to have basic information about my audience and there is a nice plugin you can use for Next. But! I did notice that with some browsers and adorns the call to get the GA Api is blocked so I might go for another solution for this particular feature other than Google Analytics. 

**[Update]:** I have recently migrated to Nibspace due to privacy concerns and much simpler tooling. Price is ok, and something that I think with the numbers is that this tool is not as often blocked as Google Analytics is from different browsers and add-ons.

I am already planning on writing a complete article about my learnings and findings of checking these results from the analytic dashboard, and how that helped me to get better insights about improvements that I should focus on.

## Why RSS?

As soon as I start posting my articles, I noticed that it would be nice to have the same content somewhere else, and that was when during a Twitch live session from [@cassidoo](https://twitter.com/cassidoo) I asked about how to deal with auto-promotion (without making shameless promotion on social media) and recommended me to set up the RSS (which stands for Really Simple Syndication) from dev.to to start targeting for a bigger audience.

For those who are not familiar with what RSS is (like I was before making this) most probably the logo will ring a bell, at least it did for me. But it took me some time and investigation to realize what it was and how it can be used. 

RSS, in a few words, is a way to share the articles or posts you have created, and let others consume those by registering to your RSS file, which you can choose how often is updated. 

If you are using a template or built a blog from scratch, having an RSS might be useful in case you want to get a bigger audience. There are blogs that already let you do that but default like Notion or Medium. 

Technically speaking, the way I have implemented this was by using a module that was built for the Nuxt community itself called @nuxt/feed combined together with the Prismic API makes it possible for me to have the feed for my posts on RSS. 

Keep in mind that you could also combine this with @nuxt/content in case you want to have your content in there, as markdown files for example. 

## Next Steps

I am planning to keep this up to date with future changes, just in case this is helpful for anyone. 

And, as always, any feedback is more than welcome! 