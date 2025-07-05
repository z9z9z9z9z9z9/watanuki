import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleRatting = ({ rating }) => {
  return (
    <CircularProgressbar
      value={rating}
      maxValue={10}
      text={rating}
      styles={buildStyles({
        pathColor: "#FADA7A",
        textColor: "white",
        textSize: "22px",
      })}
    />
  );
};

export default CircleRatting;
