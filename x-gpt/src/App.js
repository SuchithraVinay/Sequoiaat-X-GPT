import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DocumentUpload from './components/DocumentUpload'
import ViewData from './components/ViewData'
import AskQuestion from './components/AskQuestion'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/DocumentUpload" element={<DocumentUpload />}></Route>
          <Route path="/ViewData" element={<ViewData />}></Route>
          <Route exact path="/AskQuestion" element={<AskQuestion />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
