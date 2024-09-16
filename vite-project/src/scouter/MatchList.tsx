import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MatchListProps {}

const MatchList: React.FC<MatchListProps> = ({}) => {
  const location = useLocation();
  const [statefulInfo, setStateful] = useState({});

  useEffect(() => {
    setStateful(location.state);
  }, [location]);
  return <>{JSON.stringify(statefulInfo)}</>;
};
export default MatchList;
