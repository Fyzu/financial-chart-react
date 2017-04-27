import React from "react";
import PropTypes from "prop-types";

const tooltipWidth = 100;
const tooltipHeight = 30;
const tooltipPadding = 10;
const tooltipXOffset = 5;
const tooltipYOffset = 10;

const formatOptions = {
    month: 'long',
    day: 'numeric'
};

const numberFormatter = (val) => val.toFixed(2).replace(/\./g, ",");

const Tooltip = ({ point: { x, y, value, deltaValue, day, month, year }, ...props }) => {
    const {
        width, padding,
        valueFormatter,

        onMouseEnter, onMouseLeave
    } = props;

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
        <div className="financial-chart-tooltip" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="financial-chart-tooltip-date">
                {new Date(year, month, day).toLocaleDateString("ru", formatOptions)} {year}
            </div>
            <div className="financial-chart-tooltip-value">
                {valueFormatter(numberFormatter(value))}
            </div>
            {deltaValue < 0 ? (
                <div className="financial-chart-tooltip-delta">
                    <div className="financial-chart-tooltip-delta-arrow"/>
                    {numberFormatter(-deltaValue)}
                </div>
            ) : (
                <div className="financial-chart-tooltip-delta mod-positive">
                    <div className="financial-chart-tooltip-delta-arrow"/>
                    {numberFormatter(deltaValue)}
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    point: PropTypes.object.isRequired
};

export default Tooltip;