// import bootstrap which is used for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// import StockList to use the StockList component 
import StockList from './components/StockList.js'


function App() {
  // returns stocklist as the only thing rendered on the screen
  return (
    <div className="App">
      <div className="container">
        <div className="col-md-5 mt-5">
          <div className = "card">
             <StockList/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
