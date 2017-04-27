import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import YAxis from "./components/YAxis";
import Curve from "./components/Curve";
import Points from "./components/Points";
import Tooltip from "./components/Tooltip";

// eslint-disable-next-line
const monthLabels = [
    "Январь", "Фераль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const xAxisHeight = 56;
const yAxisWidth = 36;
const yAxisGridLeftOffset = 14;

class FinancialChart extends Component {

    state = {
        tooltip: false,
        tooltipPoint: null
    };

    timer = null;

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    getMaxValue = () => {
        const { data: { months } } = this.props;

        const values = months.reduce((values, days) => values.concat(days.map(day => day.value)), []);

        return Math.max(...values);
    };

    daysInMonth = (month, year) => new Date(year, month, 0).getDate();

    getSize = () => {
        const { data: { year, months } } = this.props;

        return [...months.keys()].reduce((days, monthIdx) => days + this.daysInMonth(monthIdx + 1, year), 0);
    };

    getDayOfYear(monthIdx, day) {
        const { data: { year } } = this.props;

        if (monthIdx === 0) {
            return day;
        }

        return [...new Array(monthIdx).keys()].reduce((days, monthIdx) => days + this.daysInMonth(monthIdx + 1, year), day);
    };

    hideTooltip = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => this.setState({ tooltip: false, tooltipPoint: null }), 300);
    };

    showTooltip = (point) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.setState({ tooltip: true, tooltipPoint: point });
    };

    tooltipMouseEnter = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    render() {
        const {
            width, height, padding,
            data: { year, months },
        } = this.props;
        const { tooltip, tooltipPoint } = this.state;

        const originalWidth = width + padding * 2;
        const originalHeight = height + padding * 2;

        const effectiveWidth = width - yAxisWidth * 1.5 - yAxisGridLeftOffset;
        const effectiveHeight = height - xAxisHeight * 1.5;

        const xLeftOffset = yAxisWidth + yAxisGridLeftOffset + padding;
        const yBottomOffset = xAxisHeight + padding;
        const yTopOffset = xAxisHeight / 2 + padding;
        // eslint-disable-next-line
        const xRightOffset = yAxisWidth / 2 + padding;

        const maxValue = this.getMaxValue();
        const axisValue = Math.round(maxValue / 10) * 10;

        const size = this.getSize();

        const heightRatio = axisValue === 0 ? 0 : effectiveHeight / axisValue;

        let prevValue = 0;
        const points = months.map((days, month) =>
            days.map(({ day, value }) => {
                const dayData = {
                    x: ~~((effectiveWidth / size) * this.getDayOfYear(month, day) + xLeftOffset),
                    y: ~~(heightRatio * (axisValue - value)) + yTopOffset,
                    value, deltaValue: value - prevValue,
                    month, day, year
                };

                prevValue = value;

                return dayData;
            })
        ).reduce((daysOfYear, days) => daysOfYear.concat(days), []);

        const pointWidth = effectiveWidth / (points.length - 1);

        return (
            <div className="financial-chart" style={{ width: originalWidth, height: originalHeight }}>
                <svg version="1.1" width={originalWidth} height={originalHeight}
                     viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
                    <g>
                        <YAxis width={width} height={height} padding={padding}/>
                    </g>

                    <g>
                        <Curve points={points}/>
                        <Points points={points}
                                tooltipIdx={tooltipPoint && tooltipPoint.idx} showTooltip={this.showTooltip}
                                hideTooltip={this.hideTooltip}
                                height={originalHeight} yBottomOffset={yBottomOffset} pointWidth={pointWidth}/>
                    </g>
                </svg>

                {tooltip &&
                <Tooltip point={tooltipPoint} onMouseEnter={this.tooltipMouseEnter} onMouseLeave={this.hideTooltip}
                         width={originalWidth} height={originalHeight} padding={padding}/>
                }
            </div>
        );
    }
}

FinancialChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
    data: PropTypes.shape({
        year: PropTypes.number,
        months: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.shape({
                day: PropTypes.number,
                value: PropTypes.number
            }))
        )
    }).isRequired,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func
};

FinancialChart.defaultProps = {
    width: 800,
    height: 300,
    padding: 10
};

export default FinancialChart;