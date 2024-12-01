import { generateTags } from "@/utils/generate-tags";
import { Route } from "./+types/blog";

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "About the Blog", siteUrl });
  return tags;
};

export const loader = ({ request }: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { siteUrl };
};

export default function AboutBlog() {
  return (
    <div className="max-w-2xl text-gray-600 dark:text-gray-200">
      <h1 className="text-primary-700 mb-24 text-4xl font-medium tracking-tight md:text-6xl dark:text-white">
        About Tech as Human
      </h1>

      <div className="mt-4 mb-8">
        <a
          className="hover:bg-secondary border-primary-700 flex max-w-fit transform items-center space-x-2 rounded-md border px-6 py-2 transition-all duration-300 ease-in-out hover:scale-105 dark:border-white"
          href="https://www.github.com/mobregozo/techashuman-remix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 438.549 438.549" className="h-4 w-4">
            <path
              fill="currentColor"
              d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
            ></path>
          </svg>
          <span className="font-semibold">Tech as Human on Github</span>
        </a>
      </div>
      <p className="mb-6">
        I'm a software engineer and tech writer passionate about the
        intersection of technology and human life. This blog was born out of my
        love for exploring how tech shapes the world we live in. Through Tech as
        Human, I share my reflections on software development, product
        management, and the ethical implications of tech.
      </p>

      <img src="/assets/gpt.webp" alt="Manu" className="" />
      <p className="mt-2 text-sm text-gray-500">Image generated by ChatGPT</p>

      <h2 className="text-primary-700 dark:text-secondary-400 mt-8 mb-6 text-3xl font-semibold tracking-tighter">
        From journaling to blogging
      </h2>
      <p className="mb-6">
        What started as a personal journaling exercise, recommended by my
        therapist in 2020, quickly evolved into a blog. My goal was simple:
        learn new technologies while sharing what I learned. Over time, this
        blog has turned into a place where I reflect on my journey and the tools
        that shape the tech industry.
      </p>

      <h2 className="text-primary-700 dark:text-secondary-400 mt-4 mb-6 text-3xl font-semibold tracking-tighter">
        The Tech behind Tech as Human
      </h2>
      <p>
        The website has gone through different iterations, as I experimented
        with various static frameworks. I started with Nuxt.js, moved to
        Next.js, and eventually landed on Remix.
      </p>
      <h3 className="mt-8 mb-2 text-2xl font-bold">Why Remix?</h3>
      <p>
        Remix stood out because it challenges conventional web development
        patterns and allows for flexible deployments without being tied to a
        specific hosting company.
      </p>
      <p>
        It provides an abstraction that reduces the need for boilerplate code
        while still giving me decent control over what's happening underneath.
        From dynamic content to cache control, I can easily customize how
        different aspects behave to suit the needs of this particular website.
      </p>
      <h3 className="mt-8 mb-2 text-2xl font-bold">Content management</h3>
      <p>
        Initially, I experimented with different methods of managing my content,
        including static JSON files, Markdown, and Prismic (online CRM).
        However, I settled on Notion for its portability and flexibility. I love
        how Notion's API allows me to structure posts exactly as I want them,
        making the content creation process easy.
      </p>
      <p>
        I also use Unsplash to add images to each post. These images help
        visually represent the ideas and themes I am sharing.
      </p>
      <h3 className="mt-8 mb-2 text-2xl font-bold">
        Using Bluesky to manage comments
      </h3>
      <p>
        I use Bluesky to manage comments on the blog. It's a decentralized
        commenting system that allows readers to engage with the content without
        compromising their privacy.
      </p>
      <p>
        Here's the link to my{" "}
        <a
          href="https://bsky.app/profile/techashuman.com"
          className="text-secondary-500 hover:underline"
        >
          Bluesky Profile{" "}
        </a>
        And here's the link that originally explains the concept of
        <a
          href="https://emilyliu.me/blog/comments"
          className="text-secondary-500 hover:underline"
        >
          {" "}
          adding comments.
        </a>
      </p>
      <h3 className="mt-8 mb-2 text-2xl font-bold">Why Plausible?</h3>
      <p>
        I use Plausible for analytics because it prioritizes privacy, offering a
        simple and clean interface. Plus, I love that it doesn't track personal
        data. The dashboard gives me a clear picture of how the blog is
        performing, and it's open for everyone to see. Here's a link to my{" "}
        <a
          href="https://plausible.io/techashuman.com"
          className="text-secondary-500 hover:underline"
        >
          Plausible Dashboard
        </a>
        .
      </p>
      <h3 className="mt-8 mb-2 text-2xl font-bold">Why Tailwind?</h3>
      <p>
        I use Tailwind CSS for its speed and flexibility. While it's not pure
        CSS, it makes my development process much faster and easier. I
        appreciate the utility-first approach, which allows me to make quick
        changes without diving into complex CSS rules.
      </p>
      <p>
        Given the complexity of the website and the fact that I am working solo,
        Tailwind CSS is a perfect fit. It saves me from worrying about class
        names, BEM conventions, or other scalable CSS patterns, allowing me to
        focus more on building features and improving the user experience.
      </p>

      <h3 className="mt-8 mb-2 text-2xl font-bold">Using Copilot and OpenAI</h3>
      <p>
        To speed up the development process, I've integrated GitHub Copilot for
        boilerplate code generation. It's a time-saver! For writing, I also rely
        on OpenAI tools to refine and enhance my content.
      </p>

      <h3 className="mt-8 mb-2 text-2xl font-bold">Why Substack?</h3>
      <p>
        Substack allows me to syndicate my blog content to a wider audience,
        helping me stay connected with readers through email newsletters. While
        organic traffic is valuable, Substack makes it easier to expand my reach
        and build a community around my content.
      </p>
      <p>
        Here's the link to follow me on{" "}
        <a
          href="https://techashuman.substack.com/"
          className="text-secondary-500 hover:underline"
        >
          Substack
        </a>
        .
      </p>

      <h2 className="text-primary-700 dark:text-secondary-400 mt-8 mb-6 text-3xl font-semibold tracking-tighter">
        What's next?
      </h2>
      <p>
        As I continue to experiment and iterate with new tools, I'll keep
        learning and sharing insights with you. This blog is not just about
        tech—it's about how technology intersects with our human experience. I
        hope my posts help you stay informed, stay inspired, and stay curious.
      </p>
    </div>
  );
}
