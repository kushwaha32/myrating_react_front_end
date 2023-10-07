import { useMediaQuery } from "react-responsive";

export const IsTabletOrLess = () => {
  return useMediaQuery({
    query: "(max-width: 912px)",
  });
};

export const IsDesktopOrLaptop = () =>
  useMediaQuery({
    query: "(min-width: 991.98px)",
  });
