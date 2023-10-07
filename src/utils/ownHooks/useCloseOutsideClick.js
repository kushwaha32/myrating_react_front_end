import { useEffect } from "react";

const useCloseOutsideClick = (reference, setToggle) => {
  useEffect(() => {
    const handleToggle = (e) => {
      if (!reference?.current?.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleToggle);

    return () => document.addEventListener("click", handleToggle);
  }, []);
};

export default useCloseOutsideClick;
