import { useEffect, useState } from "react";

export const Loader = () => {
  const [width, seWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window) {
        seWidth(
          (window.scrollY /
            (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
            100
        );
      }
    };
    window.addEventListener("scroll", handleScroll.bind(this));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="w-full"
      style={{
        top: "46px",
      }}
    >
      <div
        className="bg-secondary-700 dark:bg-secondary-500 h-1"
        style={{
          width: `${width}%`,
        }}
      />
    </div>
  );
};
