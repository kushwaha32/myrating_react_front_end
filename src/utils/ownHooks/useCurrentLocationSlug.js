import { useLocation } from "react-router-dom";

const useCurrentLocationSlug = () => {
  const location = useLocation().pathname.split("/");
  const slug = location[location.length - 1];

  return slug;
};

export default useCurrentLocationSlug;
