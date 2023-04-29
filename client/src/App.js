import logo from './logo.svg';
import './App.css';


import GetPlot from './components/GetPlot';
import UploadCSV from './components/UploadCSV';

function App() {
  return (
    <div className="App">
      <UploadCSV/>
      <GetPlot />
    </div>
  );
}

export default App;
