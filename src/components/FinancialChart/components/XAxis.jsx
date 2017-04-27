import React from "react";

const XAxis = ({ xLabels }) => {

    return (
        <g className="financial-chart-x-axis">
            {xLabels.map(({ x, y, label }, idx) =>
                <g key={idx}>
                    <text className="financial-chart-x-axis-label" x={x} y={y}>
                        {label}
                    </text>
                </g>
            )}
        </g>
    );
};

export default XAxis;