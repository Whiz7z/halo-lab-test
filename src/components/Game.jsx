import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/store";
import PropTypes from "prop-types";
import { drawSegment } from "../lib/drawSegment";
import { drawDrone } from "../lib/drawDrone";
import { checkCollision } from "../lib/chekcCollisions";
import { calculateScoreIncrement } from "../lib/calculateScoreIncrement";
import EndGamePopup from "./EndGamePopup";
import { useNavigate } from "react-router-dom";

const Game = ({ caveData }) => {
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const canvasRef = useRef(null);
  const { incrementScore, complexity, score, setScore, clearScore } =
    useStore();
  const [horizontalSpeedGauge, setHorizontalSpeedGauge] = useState(0);
  const [verticalSpeedGauge, setVerticalSpeedGauge] = useState(0);

  let droneX = 250;
  let speedX = 0;
  let scrollSpeed = 0;
  const maxSpeed = 2;

  const acceleration = 1.5;
  const segmentHeight = 10;
  const maxScrollSpeed = 5;
  const minScrollSpeed = 0.5;
  const scrollAcceleration = 0.1;

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
        speedX = Math.min(maxSpeed, speedX + acceleration);
        setHorizontalSpeedGauge(speedX);
        break;
      case "ArrowLeft":
        speedX = Math.max(-maxSpeed, speedX - acceleration);
        setHorizontalSpeedGauge(speedX);
        break;
      case "ArrowDown":
        scrollSpeed = Math.min(
          maxScrollSpeed,
          scrollSpeed + scrollAcceleration
        );
        setVerticalSpeedGauge(scrollSpeed);
        break;
      case "ArrowUp":
        scrollSpeed = Math.max(
          minScrollSpeed,
          scrollSpeed - scrollAcceleration
        );
        setVerticalSpeedGauge(scrollSpeed);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      speedX *= 0.001;
      setHorizontalSpeedGauge(speedX);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    let offsetY = 0;
    let currentSegment = 0;

    const animateCave = () => {
      if (offsetY > 10200) {
        cancelAnimationFrame(animateCave);
        setGameOver(true);
        setIsWin(true);
        setScore();
        clearScore();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offsetY += scrollSpeed;

      droneX += speedX;

      const newSegment = Math.floor(offsetY / segmentHeight);

      drawSegment(ctx, caveData, "left", offsetY);
      drawSegment(ctx, caveData, "right", offsetY);
      drawDrone(ctx, droneX);

      if (checkCollision(caveData, offsetY, droneX)) {
        cancelAnimationFrame(animateCave);
        setGameOver(true);
        setIsWin(false);
        setScore();
        clearScore();
        return;
      }

      if (newSegment > currentSegment) {
        currentSegment = newSegment;
        const increment = calculateScoreIncrement(scrollSpeed, complexity);
        incrementScore(increment);
      }
      requestAnimationFrame(animateCave);
    };

    animateCave();

    return () => {
      cancelAnimationFrame(animateCave);
    };
  }, [caveData]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleClosePopup = () => {
    setGameOver(true);
    navigate("/");
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}></canvas>
      <div className="score">Score: {Math.floor(score)}</div>
      <div className="gauges-container">
        <div className="gauge">
          <div className="gauge-label">Vertical Speed</div>
          <div className="gauge-bar">
            <div
              className="gauge-fill"
              style={{
                width: `${(verticalSpeedGauge / maxScrollSpeed) * 100}%`,
              }}
            ></div>
          </div>
          <div className="gauge-value">{verticalSpeedGauge.toFixed(2)}</div>
        </div>
        <div className="gauge">
          <div className="gauge-label">Horizontal Speed</div>
          <div className="gauge-bar">
            <div
              className="gauge-fill"
              style={{
                width: `${(Math.abs(horizontalSpeedGauge) / maxSpeed) * 100}%`,
              }}
            ></div>
          </div>
          <div className="gauge-value">{horizontalSpeedGauge.toFixed(2)}</div>
        </div>
      </div>
      {gameOver && <EndGamePopup isWin={isWin} onClose={handleClosePopup} />}
    </div>
  );
};

Game.propTypes = {
  caveData: PropTypes.array.isRequired,
};

export default Game;
