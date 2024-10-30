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
    </div>
  );
};
