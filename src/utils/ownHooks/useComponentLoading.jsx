import { useEffect, useState } from "react";

const UseComponentLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading;
};

export default UseComponentLoading;
