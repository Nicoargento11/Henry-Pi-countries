import "./App.css";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";
import DetailCountries from "./components/detailCountries/detailCountries";
import CreateActivity from "./components/createActivity/createActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact component={Login}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/home/:detailId" component={DetailCountries}></Route>
        <Route path="/activities" component={CreateActivity}></Route>
      </Routes>
    </div>
  );
}

export default App;
