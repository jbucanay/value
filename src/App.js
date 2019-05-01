import React from "react";
import Navbar from "./components/navbar/Navbar";
import { HashRouter as Router } from "react-router-dom";
import routes from "./routes";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        {routes}
        <div className="chat">
          <input placeholder="Got a question?" />
        </div>
      </Router>
    </div>
  );
}

export default App;
