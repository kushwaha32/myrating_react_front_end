import { FadeLoader } from "react-spinners";

const LoaderFade = () => {
  return (
    <div className="position-relative loader-parent">
      <p className="loader-component">
        <FadeLoader color="rgb(0 40 86 / 80%)" />
      </p>
    </div>
  );
};

export default LoaderFade;
