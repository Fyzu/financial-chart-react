import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import YAxis from "./components/YAxis";
import Curve from "./components/Curve";
import Points from "./components/Points";
import Tooltip from "./components/Tooltip";
import XAxis from "./components/XAxis";

// eslint-disable-next-line
const monthLabels = [
    "Январь", "Фераль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

class FinancialChart extends Component {

    timer = null;

    constructor(props) {
        super(props);

        this.state = {
            tooltipPoint: null,

            ...this.performedData(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.performedData(nextProps));
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    getMaxValue = (months) => {
        const values = months.reduce((values, days) => values.concat(days.map(day => day.value)), []);

        return Math.max(...values);
    };

    daysInMonth = (month, year) => new Date(year, month, 0).getDate();

    getDays = (year, month) => {
        return [...new Array(month + 1).keys()]
            .reduce((days, month) => days + this.daysInMonth(month, year), 0);
    };

    getDayOfYear(month, day, year) {
        if (month === 0) {
            return day;
        }

        return [...new Array(month).keys()]
            .reduce((days, month) => days + this.daysInMonth(month, year), day);
    };

    performedData = (props) => {
        const {
            width, height, padding,
            data: { year, months },

            xAxisHeight, yAxisWidth, yAxisGridLeftOffset,

            gridRows,
        } = props;

        const originalWidth = (width < 300 ? 300 : width) + padding * 2;
        const originalHeight = (height < 100 ? 100 : height) + padding * 2;

        const effectiveWidth = (width < 300 ? 300 : width) - yAxisWidth * 1.5 - yAxisGridLeftOffset;
        const effectiveHeight = (height < 100 ? 100 : height) - xAxisHeight * 1.5;

        const leftOffset = yAxisWidth + yAxisGridLeftOffset + padding;
        const bottomOffset = xAxisHeight + padding;
        const topOffset = xAxisHeight / 2 + padding;
        const rightOffset = yAxisWidth / 2 + padding;

        const maxValue = this.getMaxValue(months);

        let axisMaxValue = Math.trunc(maxValue / gridRows);
        if (axisMaxValue % 2 !== 0) {
            axisMaxValue += 1;
        }
        axisMaxValue *= gridRows;

        const size = this.getDays(year, months.length - 1);

        const heightRatio = axisMaxValue === 0 ? 0 : effectiveHeight / axisMaxValue;

        let prevValue = 0;
        const points = months.map((days, month) =>
            days.map(({ day, value }) => {
                const dayData = {
                    x: Math.trunc((effectiveWidth / size) * this.getDayOfYear(month, day, year) + leftOffset),
                    y: Math.trunc(heightRatio * (axisMaxValue - value)) + topOffset,
                    value, deltaValue: value - prevValue,
                    month, day, year
                };

                prevValue = value;

                return dayData;
            })
        ).reduce((daysOfYear, days) => daysOfYear.concat(days), []);

        const widthRatio = size === 0 ? 0 : effectiveWidth / months.length;
        const xLabels = months.map((_, month) => ({
            x: Math.trunc((widthRatio * (month + .5)) + leftOffset),
            y: Math.trunc(originalHeight - (xAxisHeight * .6 + padding)) + .5,
            label: monthLabels[month]
        }));

        xLabels.push({
            x: Math.trunc((widthRatio / 2) + leftOffset - 8),
            y: Math.trunc(originalHeight - (10 + padding)) + .5,
            label: year
        });

        return {
            originalWidth, originalHeight,
            effectiveWidth, effectiveHeight,
            leftOffset, rightOffset,
            topOffset, bottomOffset,
            axisMaxValue,

            points,

            xLabels
        };
    };

    hideTooltip = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => this.setState({ tooltipPoint: null }), 300);
    };

    showTooltip = (point) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.setState({ tooltipPoint: point });
    };

    tooltipMouseEnter = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    render() {
        const {
            padding,
            yAxisWidth, yAxisGridLeftOffset,
            gridRows, valueFormatter
        } = this.props;
        const {
            originalWidth, originalHeight,
            effectiveWidth, effectiveHeight,
            leftOffset, rightOffset,
            topOffset, bottomOffset,
            axisMaxValue,

            points, xLabels,

            tooltipPoint
        } = this.state;

        const props = {
            width: originalWidth, height: originalHeight, padding,
            effectiveWidth, effectiveHeight,
            leftOffset, rightOffset, topOffset, bottomOffset
        };

        return (
            <div className="financial-chart" style={{ width: originalWidth, height: originalHeight }}>
                <svg version="1.1" width={originalWidth} height={originalHeight}
                     viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
                    <g>
                        <YAxis {...props} maxValue={axisMaxValue} gridRows={gridRows}
                               axisWidth={yAxisWidth} gridLeftOffset={yAxisGridLeftOffset}/>

                        <XAxis {...props} xLabels={xLabels}/>
                    </g>

                    <g>
                        <Curve points={points}/>
                        <Points {...props} points={points}
                                tooltipIdx={tooltipPoint && tooltipPoint.idx}
                                showTooltip={this.showTooltip} hideTooltip={this.hideTooltip}/>
                    </g>
                </svg>

                {tooltipPoint &&
                <Tooltip {...props} point={tooltipPoint} valueFormatter={valueFormatter}
                         onMouseEnter={this.tooltipMouseEnter} onMouseLeave={this.hideTooltip}/>
                }
            </div>
        );
    }
}

FinancialChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,

    xAxisHeight: PropTypes.number,
    yAxisWidth: PropTypes.number,
    yAxisGridLeftOffset: PropTypes.number,

    gridRows: PropTypes.number,

    data: PropTypes.shape({
        year: PropTypes.number,
        months: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.shape({
                day: PropTypes.number,
                value: PropTypes.number
            }))
        )
    }).isRequired,
    valueFormatter: PropTypes.func
};

FinancialChart.defaultProps = {
    width: 800,
    height: 300,
    padding: 10,

    xAxisHeight: 56,
    yAxisWidth: 36,
    yAxisGridLeftOffset: 14,
    gridRows: 4,
    valueFormatter: (val) => val
};

export default FinancialChart;