import { SocialMedia } from "./social-media";

export const Footer = () => {
  return (
    <div className="text-gray-600 dark:text-gray-400 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Written by Manu</h2>
          <p className="text-sm mt-2">
            I am a product-driven JavaScript developer, passionate about sharing
            experiences in the IT world, from a human-centric perspective.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Me</h2>
          <SocialMedia />
        </div>
      </div>
      <div className="mt-8 text-sm">
        <h2 className="text-lg font-semibold">Stay up to date</h2>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm mt-3 mb-2 outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
        >
          <a href="https://techashuman.substack.com/" target="blank">
            Subscribe to newsletter
          </a>
        </button>
      </div>
    </div>
  );
};
