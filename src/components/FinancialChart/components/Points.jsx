import React from "react";
import PropTypes from "prop-types";

const Point = ({ prevPoint, point, nextPoint, idx, tooltipIdx, height, padding, bottomOffset, showTooltip, hideTooltip }) => {

    const { x, y } = point;

    const leftWidth = prevPoint ? (x - prevPoint.x) / 2 : 0;
    const rightWidth = nextPoint ? (nextPoint.x - x) / 2 : 0;

    return (
        <g key={idx} className={"financial-chart-point" + (idx === tooltipIdx ? " is-over" : "")}
           onMouseEnter={showTooltip && showTooltip.bind(null, { ...point, idx })} onMouseLeave={hideTooltip}>
            <circle className="financial-chart-point-dot"
                    cx={x} cy={y} r={4}/>

            <line className="financial-chart-point-axis-line"
                  x1={x} y1={y} x2={x} y2={height - bottomOffset}/>

            <rect className="financial-chart-point-box"
                  x={x - leftWidth}
                  width={leftWidth + rightWidth}
                  y={padding} height={height - padding - bottomOffset}/>
            }
        </g>
    )
};

const Points = ({ points, ...props }) => {

    return (
        <g>
            {points.map((point, idx) =>
                <Point {...props} key={idx} idx={idx} size={points.length}
                       prevPoint={points[idx - 1]} point={point} nextPoint={points[idx + 1]}/>
            )}
        </g>
    );
};

Points.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })).isRequired,

    height: PropTypes.number.isRequired,
    yBottomOffset: PropTypes.number,
    pointWidth: PropTypes.number,

    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
};

Points.defaultProps = {
    yBottomOffset: 0,
    pointWidth: 1
};

export default Points;