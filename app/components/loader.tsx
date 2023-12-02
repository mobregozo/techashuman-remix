import { useEffect, useState } from "react";

export const Loader = () => {
  const [width, seWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mainview = document.getElementById("main-view");
      if (mainview) {
        seWidth(
          (mainview.scrollTop /
            (mainview.scrollHeight - mainview.clientHeight)) *
            100
        );
      }
    };
    const mainview = document.getElementById("main-view");
    mainview?.addEventListener("scroll", handleScroll.bind(this));
    return mainview?.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className="fixed w-full left-0 z-50"
      style={{
        top: "47px",
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
