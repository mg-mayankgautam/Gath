import { useTheme } from "../../context/ThemeProvider";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      className="hover:transform-none relative inline-flex h-6 w-11 ml-4 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: darkMode ? '#4f46e5' : '#d1d5db', // indigo-600 / gray-300
      }}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
          darkMode ? 'translate-x-[21px]' : 'translate-x-[2px]'
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          {darkMode ? (
            <span className="text-xs">🌙</span>
          ) : (
            <span className="text-xs">☀️</span>
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;