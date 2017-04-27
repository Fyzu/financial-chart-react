import React from "react";
import PropTypes from "prop-types";

const tooltipWidth = 100;
const tooltipHeight = 30;
const tooltipPadding = 10;
const tooltipXOffset = 5;
const tooltipYOffset = 10;

const Tooltip = ({ point: { x, y, value, deltaValue, day, month, year }, height, width, padding, ...other }) => {

    deltaValue = deltaValue.toFixed(2);
    value = value.toFixed(2);

    const style = {
        width: tooltipWidth,
        height: tooltipHeight,
        padding: tooltipPadding,
    };

    if (y - tooltipHeight - tooltipPadding * 2 - tooltipYOffset - padding < .5) {
        style.top = y + tooltipHeight + tooltipPadding * 2;
    } else {
        style.top = y - tooltipYOffset;
    }

    if (x + tooltipXOffset + tooltipWidth + tooltipPadding * 2 + .5 > width) {
        style.left = x - tooltipXOffset - tooltipWidth - tooltipPadding * 2;
    } else {
        style.left = x + tooltipXOffset;
    }

    return (
        <div className="financial-chart-tooltip" style={style} {...other}>
            <div className="financial-chart-tooltip-date">
                {new Date(year, month + 1, day).toLocaleDateString()}
            </div>
            <div className="financial-chart-tooltip-value">
                {value}
            </div>
            <div className="financial-chart-tooltip-delta">
                {deltaValue < 0 ? -deltaValue : deltaValue}
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    point: PropTypes.object.isRequired
};

export default Tooltip;