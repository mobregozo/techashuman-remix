export const Intro = () => {
  return (
    <section className="py-16 md:py-20 border-b border-gray-200 dark:border-zinc-600">
      <div className="max-w-2xl md:mx-0">
        <h2 className="text-3xl md:text-7xl font-semibold text-zinc-600 dark:text-zinc-200">
          <span className="leading-10">Welcome to </span>
          <span className="leading-tight font-bold font-mono text-primary-600 tracking-tighter bg-no-repeat">
            TechAsHuman
          </span>
        </h2>
        <p className="my-2 text-sm md:text-lg leading-6 md:leading-8 text-gray-600 dark:text-gray-300">
          Join the adventure, uncovering the human stories that shape our
          digital world.
        </p>
      </div>
    </section>
  );
};
