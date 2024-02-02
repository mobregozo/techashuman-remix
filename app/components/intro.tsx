import { Avatar } from "./avatar";

export const Intro = () => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-8 text-center">
      <div className="">
        <Avatar />
      </div>
      <div className="text-center mt-4">
        <div className="text-gray-700 text-xl dark:text-white mx-auto">
          <h1 className="font-medium text-4xl mb-4 ">
            Hola! Welcome to
            <span className=" font-extrabold tracking-tighter">
              {" "}
              TechAsHuman
            </span>
          </h1>
          <p className="font-semibold text-2lg">
            Embark on a personal expedition through my experiences in the IT
            world, where I uncover the often overlooked human aspect.
          </p>
        </div>
      </div>
    </div>
  );
};
