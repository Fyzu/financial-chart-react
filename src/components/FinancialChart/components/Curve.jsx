import React from "react";
import PropTypes from "prop-types";

const Curve = ({ points: [firstPoint, ...points] }) => {
    const path = `M ${firstPoint.x} ${firstPoint.y}${points.map(point => ` L ${point.x} ${point.y}`).join('')}`;

    return (
        <g>
            <path className="financial-chart-curve" d={path}/>
        </g>
    );
};

Curve.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }))
};

export default Curve;