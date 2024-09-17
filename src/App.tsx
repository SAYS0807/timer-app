import { useState, useEffect } from "react";
import Header from "./components/header";
import Timer from "./components/Timer/Timer";
import TaskList from "./components/TaskList/TasksList";

export interface TaskDataType {
  id: number,
  title: string,
  timeSpent: number,
}

function App() {
  const [tasksData, setTasksData] = useState<TaskDataType[]>([]);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('');
  const [idCount, setIdCount] = useState(1);

  const changeTime = (action: string) => {
    switch (action) {
      case 'start': 
        setTime(prevTime => prevTime + 1);
        break;
      case 'reset':
        setTime(0);
        break;
    }
  };

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

  const submitTaskData = () => {
    const newTaskData: TaskDataType ={
      id: idCount,
      title: title,
      timeSpent: time,
    }
    
    setTasksData([...tasksData, newTaskData]);
    setTitle('');
    setTime(0);
    setIdCount(idCount + 1);
    console.log(tasksData);
  };

  const deleteTaskData = (id: number) => {
    const newTasksData: TaskDataType[] = tasksData.filter(task => id !== task.id);
    setTasksData(newTasksData);
  }

  return (
    <div className="md:h-screen">
      <Header />
      <div className="mt-12 md:flex">
        <div className="w-3/4 mx-auto md:w-1/2">
          <TaskList
            tasksData={tasksData}
            deleteTaskData={(id) => deleteTaskData(id)}
          />
        </div>
        <div className="w-3/4 mx-auto md:w-1/2">
          <Timer 
            time={time}
            title={title}
            controlTaskName={(action, newTitle) => changeTitle(action, newTitle)}
            controlTimer={(action) => changeTime(action)}
            submitTaskData={() => submitTaskData()}
          />
        </div>
      </div>
    </div>
  );
}

export default App
