import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const OtherProfileSkeleton = () => {
  return (
    <Link to="" className="bcb-create-profile bab-profiles-a bcb-skel">
      <span>
        <Skeleton height={34} />
      </span>
    </Link>
  );
};

export default OtherProfileSkeleton;
