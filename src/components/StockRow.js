import React, {Component } from 'react';

import {stock} from '../resources/stock.js';
class StockRow extends Component {
       // when the StockRow gets created:
    // 1. props is info passed to component when initialized
    // 2. create a state and set multiple attributes to 0
    constructor(props) {
        super(props);
        this.state = {
            price: 0, 
            date: 0,
            time: 0, 
            dollar_change: 0,
            percent_change: 0
        }
    };
    // this function changes the color of the price change and percent change
    // based on positivity and negativity
    // also sets font size and margin
     changeStyle() {
        return{
            color: (this.state.dollar_change > 0) ? '#4caf50' : '#e53935',
            fontSize: '0.8rem',
            marginLeft: 5
        }
      };
      // this function takes a data object as input
      applyData(data) {
        console.log(data);
        // this const is used to format the price accordingly
        const formattedPrice = data.price !== null ? data.price.toFixed(2) : null;
        // this state alters variables inside the state of the class as a whole
        this.setState({
          price: formattedPrice,
          date: data.date,
          time: data.time,
        });
      }
      // when the StockRow component reaches the DOM, the 
      // latestPrice function from the stock class is called 
      // with the inputs of the ticker that represents the stock and the
      // applyData function with this exact StockRow component with
      // the ticker is shown. 
    componentDidMount(){
       stock.latestPrice(this.props.ticker, this.applyData.bind(this))
    }
    
    componentDidUpdate(prevProps){
        this.setCanRetrieveClose(prevProps);
        if(this.state.canRetrieveClose && this.state.price != null){
                stock.getYesterdaysClose(this.props.ticker, this.props.lastTradingDate, (yesterday) => {
                const dollar_change = (this.state.price - yesterday.price).toFixed(2)
                const percent_change = (100 * dollar_change / yesterday.price).toFixed(2);
                this.setState({
                    dollar_change: `${dollar_change}`,
                    percent_change: ` (${percent_change}%)`,
                    canSetClose: false
                })
            } )
        }
     }

     setCanRetrieveClose(prevProps){
        if(prevProps.lastTradingDate == null && this.props.lastTradingDate != null){
            this.setState({
                canRetrieveClose: true
            })
        }
     }
     
    render(){
        return (
            <div>
                <li className = "list-group-item">
                  <b>{this.props.ticker}</b> ${this.state.price}
                  <span className = "change" style={this.changeStyle()}>
                   {this.state.dollar_change}
                   {this.state.percent_change}
                  </span>
                  </li>
            </div>
        )
    } 
}
export default StockRow;