import React from "react";
import PropTypes from "prop-types";

const Point = ({ point, idx, tooltipIdx, size, height, padding, effectiveWidth, bottomOffset, topOffset, showTooltip, hideTooltip }) => {

    const { x, y } = point;

    const pointWidth = effectiveWidth / size;

    return (
        <g key={idx} className={"financial-chart-point" + (idx === tooltipIdx ? " is-over" : "")}
           onMouseEnter={showTooltip && (() => showTooltip({ ...point, idx }))} onMouseLeave={hideTooltip}>
            <circle className="financial-chart-point-dot"
                    cx={x} cy={y} r={4}/>

            <line className="financial-chart-point-axis-line"
                  x1={x} y1={y} x2={x} y2={height - bottomOffset}/>

            <rect className="financial-chart-point-box"
                  x={idx === 0 ? x : x - pointWidth / 2}
                  width={idx === 0 || idx === size - 1 ? pointWidth / 2 : pointWidth }
                  y={padding} height={height - padding - bottomOffset}/>
            }
        </g>
    )
};

const Points = ({ points, ...props }) => {

    return (
        <g>
            {points.map((point, idx) =>
                <Point key={idx} idx={idx} size={points.length} point={point} {...props}/>
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