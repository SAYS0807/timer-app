import { useState, useEffect } from "react";
import Header from "./components/header";
import TaskList from "./components/TaskList/TasksList";
import Timer from "./components/Timer/Timer";

export interface TaskDataType {
  id: number,
  title: string,
  timeSpent: number,
}

function App() {
  const [tasksData, setTasksData] = useState<TaskDataType[]>([]);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [title, setTitle] = useState('');
  const [idCount, setIdCount] = useState(1);
  const [pomodoroTImer, setPomodoroTimer] = useState(1);

  const changeTitle = (action: string, newTitle: string = '') => {
    switch (action) {
      case 'update':
        setTitle(newTitle);
        break;
      case 'reset':
        setTitle('');
        break;
    }
  };

  return (
    <div className="md:h-screen">
      <Header />
      <Timer />
    </div>
  );
}

export default App
