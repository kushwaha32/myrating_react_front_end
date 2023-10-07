import { useEffect } from "react";
import { useGetUserProffessionQuery } from "../../slices/userProffessionApiSlice";

const UseFetchProfessionOption = (setProfessionOption) => {
  const {
    data: proffessionCat,
    isLoading,
    isError,
  } = useGetUserProffessionQuery();
  const proffessionData = proffessionCat?.data?.data;

  const filterProfession = () => {
    setProfessionOption(
      proffessionData?.map((curr) => {
        return { label: curr?.proffession, value: curr?._id };
      })
    );
  };
  useEffect(() => {
    if (proffessionData) {
      filterProfession();
    }
  }, [proffessionData]);
};

export default UseFetchProfessionOption;
