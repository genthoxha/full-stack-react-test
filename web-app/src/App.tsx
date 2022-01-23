import React from "react";
import "./App.css";
import { fetchUsers } from "./api";
import {MainLayout} from "./components/mainLayout/MainLayout";

function App() {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUsers();
      console.log("Result: ", result);
    };
    fetchData();
  }, []);
  return (
      <div className="App">
        <MainLayout />
      </div>
  );
}

export default App;
