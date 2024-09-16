import { useLocation, useNavigate } from "react-router-dom";

interface MatchListProps {}

const MatchList: React.FC<MatchListProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <button type="button" onClick={() => navigate("/")}>
        Scout Game
      </button>
    </>
  );
};
export default MatchList;
