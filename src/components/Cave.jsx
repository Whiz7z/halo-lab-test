import PropTypes from "prop-types";

import React from "react";

const Cave = ({ caveData, height }) => {
  const width = 500; // Fixed width as per the requirement

  const createPath = () => {
    let leftSegment = `M 0,0 M ${Math.abs(caveData[0][0])},0 `;
    let rightSegment = `M 500,0 M ${500 -Math.abs(caveData[0][1])},0 `;

    let mainHeight = 1;

    caveData.forEach((segment, index) => {
      const [left, right] = segment;
      leftSegment += ` L ${Math.abs(left)},${height * mainHeight} `;
      rightSegment += ` L ${500 - Math.abs(right)},${height * mainHeight} `;

      mainHeight += 1;
      
    });

    leftSegment += ` L 0,${Math.abs(height * mainHeight)} L 0,0 L ${Math.abs(
      caveData[0][0]
    )},0 Z`;

    rightSegment += ` L 500,${Math.abs(height * mainHeight)} L 500,0 L ${500 -
      Math.abs(caveData[0][1])},0 Z`;

    console.log(leftSegment);

    return {leftPathData: leftSegment, rightPathData: rightSegment};
  };

  const { leftPathData, rightPathData } = createPath();
  

  return (
    <svg width={width} height={caveData.length * height}>
      {/* <path
        d={`M 0,0 M 75,0 L 78,10   L 78,20   L 70,30  L 70,40 L 0,40 L 0,0 L 75,0 Z`}
        stroke="gray"
        fill="gray"
        color="gray"
        strokeWidth={1}
      /> */}

      <path d={leftPathData} stroke="gray" fill="gray" strokeWidth={1} />

      <path d={rightPathData} stroke="gray" fill="gray" strokeWidth={1} />
    </svg>
  );
};

Cave.propTypes = {
  caveData: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
};

export default Cave;
