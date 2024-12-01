import { SocialMedia } from "./social-media";

export const Footer = () => {
  return (
    <div className="py-10 text-gray-600 dark:text-gray-400">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Written by Manu</h2>
          <p className="mt-2 text-sm">
            I am a product-driven JavaScript developer, passionate about sharing
            experiences in the IT world, from a human-centric perspective.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold">Follow Me</h2>
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};
