
import './App.css';
import Background from './background.png';
import GNB from './Components/GNB/GNB';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <img className = "BackGroundImg" src={Background} alt=""/>
      <div className = "front">
        <GNB/>
        <div id = "PageSearchBar">
        <SearchBar/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
