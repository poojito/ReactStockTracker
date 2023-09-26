// import necesssary stuff
import React, {Component } from 'react';
// import stockrow to use it in the function
import StockRow from './StockRow.js'
// import stock class to use it's methods
import {stock} from '../resources/stock.js';

class StockList extends Component {
    // when the StockList gets created:
    // 1. props is info passed to component when initialized
    // 2. create a state and set the lastTradingDate
    constructor(props) {
        super(props);
        this.state = {
            // hard coding the date
            lastTradingDate: '20200413'
        }
    };
    // componentDidMount is a function that executes as soon as the stocklist is called in the main
    // application
    componentDidMount(){
        // calls the stock.getLastTradingDate method which returns
        // a promise from which data is collected and used 
        // to set the last trading date attribute of this object's state
        stock.getLastTradingDate().then((data) => {
            this.setState({
                lastTradingDate: data[0].date 
            })
        })
     }

     // the render function is used to print to the screen
     // first, thee function sets a constant lastTradingDate to be used as a prop for the StockRow component
     // then, the function returns 4 StockRow components inside an ul to the DOM
    render(){
        const lastTradingDate = this.state.lastTradingDate;
        return (
            <div>
               <ul className="list-group list-group-flush">
                    <StockRow ticker="aapl" lastTradingDate={lastTradingDate}/>
                    <StockRow ticker="goog" lastTradingDate={lastTradingDate}/>
                    <StockRow ticker="msft" lastTradingDate={lastTradingDate}/>
                    <StockRow ticker="tsla" lastTradingDate={lastTradingDate}/>
               </ul>
            </div>
        )
    } 
}
export default StockList;