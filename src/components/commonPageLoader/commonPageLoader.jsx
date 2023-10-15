import { FadeLoader } from "react-spinners";

const CommonPageLoader = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <p
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader color="rgb(0 40 86 / 80%)" />
      </p>
    </div>
  );
};

export default CommonPageLoader;
