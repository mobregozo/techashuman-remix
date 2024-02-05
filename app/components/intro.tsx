export const Intro = () => {
  return (
    <section>
      <div className="grid py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-5xl md:text-7xl font-extrabold text-zinc-700 tracking-tight leading-5 md:leading-8 dark:text-white">
            <div>Welcome to</div>
            <span className="font-extrabold text-3xl md:text-6xl tracking-tighter text-primary-600">
              {" "}
              Tech As Human
            </span>
          </h1>
          <p className="max-w-2xl mb-6 font-light text-zinc-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join the adventure, uncovering the human stories that shape our
            digital world.
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="assets/hero.svg" alt="hero illustration" />
        </div>
      </div>
    </section>
  );
};
