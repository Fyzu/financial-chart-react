import React, { Component } from "react";
import FinancialChart from "../../components/FinancialChart";

// eslint-disable-next-line
const financialData = {
    year: 2017,
    months: [
        [{
            day: 1,
            value: 65.1531
        }],
        [{
            day: 1,
            value: 64.5182
        }],
        [{
            day: 1,
            value: 60.3631
        }],
        [{
            day: 1,
            value: 53.2187
        }],
        [{
            day: 1,
            value: 50.4680
        }, {
            day: 15,
            value: 75.4680
        }],
        [{
            day: 1,
            value: 54.4490
        }],
        [{
            day: 1,
            value: 57.1797
        }],
        [{
            day: 1,
            value: 65.4230
        }],
        [{
            day: 1,
            value: 65.1531
        }],
        [{
            day: 1,
            value: 63.2456
        }],
        [{
            day: 1,
            value: 65.0296
        }],
        [{
            day: 29,
            value: 69.7048
        }],
    ]
};

class App extends Component {

    render() {
        return (
            <div style={{ textAlign: "center", margin: 10 }}>
                <FinancialChart data={financialData} valueFormatter={val => `$ ${val}`}/>
            </div>
        );
    }
}

export default App;
