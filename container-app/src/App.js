import logo from './logo.svg';
import './App.css';
import {lazy} from "react";

const MF = lazy(() => import('socialHub/app'))
function App() {
  return (
    <div className="App">
     <MF />
    </div>
  );
}

export default App;
