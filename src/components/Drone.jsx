
import PropTypes from "prop-types";

const Drone = ({ x, y }) => {
  // Calculate the points for the triangle based on the x and y coordinates
  const trianglePoints = `${x},${y + 10} ${x - 10},${y - 10} ${x + 10},${
    y - 10
  }`;

  return <polygon points={trianglePoints} fill="blue" />;
};

Drone.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Drone;
