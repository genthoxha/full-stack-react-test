import React from "react";
import "./App.css";
import {MainLayout} from "./components/mainLayout/MainLayout";

function App() {
  const [users, setUsers] = React.useState();

  return (
      <div className="App">
        <MainLayout />
      </div>
  );
}

export default App;
