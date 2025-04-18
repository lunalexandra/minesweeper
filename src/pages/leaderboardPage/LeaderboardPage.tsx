import { Leaderboard } from "../../components/leaderboard/Leaderboard";
import { useNavigate } from "react-router-dom";
import "./leaderboardPage.css";

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={"leaders"}>
        <button className="return-btn" onClick={HandleClick}>
          Назад
        </button>
        <Leaderboard />
      </div>
    </>
  );
};
