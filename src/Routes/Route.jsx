import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddTask from "../Pages/AddTask/AddTask";
import TaskList from "../Pages/TaskList/TaskList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AddTask /> },
      { path: "/taskList", element: <TaskList /> },
    ],
  },
]);

export default routes;
