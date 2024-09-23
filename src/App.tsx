import { useState, useEffect } from "react";
import Header from "./components/header";
import Timer from "./components/Timer/Timer";
import TaskInput from "./components/TaskList/TaskInput";
import { TasksDataProvider } from "./components/Timer/Context";
import SubmitContainer2 from "./components/Submit/SubmitContainer2";
import TasksList from "./components/TaskList/TasksList";

function App() {

  return (
    <div className="md:h-screen box-border">
      <Header />
      <TasksDataProvider>
        <div className="w-full h-4/5 mt-8 lg:flex">
          <div className="h-full px-8 lg:w-4/5">
            <Timer />
          </div>
          <div className="w-full px-8 lg:w-1/2">
            <TasksList />
          </div>
        </div>
      </TasksDataProvider>
    </div>
  );
}

export default App
