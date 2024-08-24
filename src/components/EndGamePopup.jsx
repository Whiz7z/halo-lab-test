import PropTypes from "prop-types";
import '../styles/Popup.scss'

const EndGamePopup = ({ isWin, onClose }) => {
  
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{isWin ? "Congratulations!" : "The drone has been destroyed"}</h2>
        <p>
          {isWin
            ? "You've successfully navigated the cave!"
            : "You crashed into the cave wall."}
        </p>
        <button onClick={() => onClose()}>Back to Scoreboard</button>
      </div>
    </div>
  );
};

EndGamePopup.propTypes = {
  isWin: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EndGamePopup;
