import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import "./MainLayout.css";
import { Sidebar } from "../sidebar/Sidebar";
import { UsersComponent } from "../users/UsersComponent";
import { UserRankComponent } from "../rank/UserRankComponent";
import {addCheckpoints, calculateUserDistances} from "../../api";

export const MainLayout: React.FC = () => {


  React.useEffect(() => {
    const fetchData = async () => {
      const resultOnAddCheckpoints = await addCheckpoints();
      const resultOnCalculateDistances = await calculateUserDistances();
      console.log("Checkpoints/user: ", resultOnAddCheckpoints);
      console.log("User/Distances: ", resultOnCalculateDistances);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="page page-main">
        <div className="page-sidebar">
          <Sidebar />
        </div>
        <div className="page-content">
          <Switch>
            <Route exact path={"/users"} component={UsersComponent} />
            <Route exact path={"/rank"} component={UserRankComponent} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

