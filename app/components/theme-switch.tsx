import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
// import { Theme, useTheme } from "remix-themes";

export function ThemeSwitch() {
  return null
  const [theme, setTheme] = useTheme();

  return (
    <div className="flex items-center justify-end">
      <motion.div
        className={`flex w-16 h-8 bg-gray-300 rounded-full p-1 cursor-pointer ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
        onClick={() =>
          setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
        }
        animate={{
          backgroundColor: theme === Theme.DARK ? "#1F2937" : "#D1D5DB",
        }}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
          layout
          transition={spring}
        >
          <motion.div
            animate={{
              rotate: theme === Theme.DARK ? 360 : 0,
            }}
            transition={{ duration: 0.7 }}
          >
            <Sun className={`hidden dark:block w-4 h-4 text-gray-800`} />
            <Moon className={`dark:hidden w-4 h-4 text-yellow-500`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
