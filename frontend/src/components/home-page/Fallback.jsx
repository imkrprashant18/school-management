import Text from "@carefully-coded/react-text-gradient";

const Fallback = () => {
  return (
    <div className="dark:bg-slate-800 dark:text-white text-black flex justify-center items-center w-screen h-screen text-xl">
      <Text
        gradient={{
          from: "#818CF8",
          to: "#5B21B6",
          type: "linear",
          degree: 90,
        }}
        style={{ fontSize: "2rem" }}
      >
        SchoolVerse
      </Text>
    </div>
  );
};

export default Fallback;
