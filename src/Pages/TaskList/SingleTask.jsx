import React, { useEffect, useState } from "react";
import ToastAlert from "../../components/Alerts/ToastAlert";
import Modal from "react-modal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

Modal.setAppElement("#root");

const SingleTask = ({
  taskDetail,
  handleDelete,
  setIsModalOpen,
  setTaskId,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [taskId, setTaskId] = useState("");
  const { _id, name, title, description, status, type } = taskDetail;

  if (status) {
    () => setCompleted(true);
  }

  const handleComplete = (id) => {
    fetch(`https://task-management-server-delta.vercel.app/statusUpdate/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          ToastAlert("Wow! You completed the task");
          // setCompleted(true);
        }
      });
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleEdit = (id) => {
    setTaskId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-md">
      <fieldset
        className={`border-2 rounded-lg w-full p-2 flex justify-between ${
          status ? "border-green-600" : "border-red-600"
        }`}
      >
        <legend
          className={`px-4 ${status ? "text-green-600" : "text-red-600"}`}
        >
          {status ? status : "pending"}
        </legend>
        <div>
          <h4 className="text-black text-lg md:text-2xl font-bold capitalize">
            {title}
          </h4>
          <p>
            by <span className="font-semibold">{name}</span>
          </p>
          <p>{description}</p>
          <p>{type}</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <button
            onClick={() => handleComplete(_id)}
            className={`border border-green-600 rounded-md px-4 py-1 text-green-600 capitalize font-semibold hover:bg-green-600 hover:text-white hover:ease-in ${
              completed ? "cursor-progress text-red-500" : "cursor-pointer"
            }`}
            disabled={completed}
          >
            complete
          </button>
          <div className="flex gap-2">
            <button onClick={() => handleDelete(_id)} className="">
              <AiOutlineDelete
                title="Delete Task"
                className="w-8 h-auto text-red-600"
              />
            </button>
            <button onClick={() => handleEdit(_id)} className="">
              <AiOutlineEdit
                title="Edit Task"
                className="w-8 h-auto text-blue-600"
              />
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default SingleTask;
