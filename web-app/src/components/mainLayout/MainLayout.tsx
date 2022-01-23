import { BrowserRouter, Routes, Route  } from "react-router-dom";
import React from "react";
import './MainLayout.css'
import {Sidebar} from "../sidebar/Sidebar";

export const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="page page-main">
        <div className="page-sidebar">
          <Sidebar />
        </div>
        <div className="page-content">
          <Routes>
        {/*    <Route path="*">
              <h2>Redirect to dashboard</h2>
            </Route>*/}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
