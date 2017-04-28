import React, { Component } from "react";
import FinancialChart from "../../components/FinancialChart";

// eslint-disable-next-line
const financialData = {
    year: 2017,
    months: [
        [{
            day: 1,
            value: 65.1531
        }, {
            day: 31,
            value: 66.1531
        }],
        [{
            day: 28,
            value: 64.5182
        }],
        [{
            day: 31,
            value: 60.3631
        }],
        [{
            day: 28,
            value: 53.2187
        }],
        [{
            day: 31,
            value: 50.4680
        }],
        [{
            day: 30,
            value: 54.4490
        }],
        [{
            day: 31,
            value: 57.1797
        }],
        [{
            day: 31,
            value: 65.4230
        }],
        [{
            day: 29,
            value: 65.1531
        }],
        [{
            day: 31,
            value: 63.2456
        }],
        [{
            day: 30,
            value: 65.0296
        }],
        [{
            day: 29,
            value: 69.7048
        }],
    ]
};

const valueFormatter = val => `$ ${val}`;

class App extends Component {

    render() {
        return (
            <div style={{ textAlign: "center", margin: 10 }}>
                <FinancialChart data={financialData} valueFormatter={valueFormatter}/>
            </div>
        );
    }
}

export default App;
