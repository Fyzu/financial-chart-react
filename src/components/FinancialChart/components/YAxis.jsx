import React from "react";

const YAxis = ({ width, height, maxValue, leftOffset, rightOffset, bottomOffset, topOffset, axisWidth, gridRows }) => {

    const rowHeight = (height - topOffset - bottomOffset) / gridRows;
    const rowValue = maxValue / gridRows;

    return (
        <g className="financial-chart-y-axis">
            {[...new Array(gridRows + 1).keys()].map(idx => {
                const y = ~~(idx * rowHeight + topOffset) - .5;

                return (
                    <g key={idx}>
                        <rect className="financial-chart-y-axis-grid-line"
                              x={leftOffset} y={y} width={width - leftOffset - rightOffset}/>

                        <text className="financial-chart-y-axis-label" x={axisWidth} y={y}>
                            {rowValue * (gridRows - idx)}
                        </text>
                    </g>
                );
            })}
        </g>
    );
};

export default YAxis;