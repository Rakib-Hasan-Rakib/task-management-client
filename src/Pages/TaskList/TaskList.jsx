import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import Swal from "sweetalert2";
import ModalForEditTask from "./ModalForEditTask";

const TaskList = () => {
  const [allTask, setAllTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    fetch("https://task-management-server-delta.vercel.app/alltask")
      .then((res) => res.json())
      .then((data) => setAllTask(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you wanna delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://task-management-server-delta.vercel.app/deletedTask/${id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = allTask.filter((task) => task._id !== id);
              setAllTask(remaining);
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
          });
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl lg:text-4xl text-sky-600 font-semibold text-center my-6 md:my-8">
        Total Task : {allTask.length}
      </h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {allTask?.map((task) => (
          <SingleTask
            key={task._id}
            taskDetail={task}
            handleDelete={handleDelete}
            setIsModalOpen={setIsModalOpen}
            setTaskId={setTaskId}
          />
        ))}
      </div>
      {taskId && (
        <ModalForEditTask
          openModal={openModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          taskId={taskId}
        />
      )}
    </div>
  );
};

export default TaskList;
