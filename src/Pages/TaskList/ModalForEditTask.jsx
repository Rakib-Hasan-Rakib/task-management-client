import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalForEditTask = ({
  openModal,
  setIsModalOpen,
  isModalOpen,
  taskId,
}) => {
  const [uniqueTask, setUniqueTask] = useState({});
  // console.log(taskId)

  useEffect(() => {
    fetch(`https://task-management-server-delta.vercel.app/task/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUniqueTask(data);
      });
  }, [taskId]);

  const { _id, status } = uniqueTask;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const options = ["Very Important", "Important", "Not Important"];

  const onSubmit = (data) => {
    const updatedTask = { ...data, status };
    fetch(`https://task-management-server-delta.vercel.app/updatedTask/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          window.refresh();
        }
      });
    // console.log(data);
    reset();
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div className="w-full mx-4 md:w-3/5 md:mx-auto p-4 space-y-3">
          <h2 className="text-xl md:text-2xl lg:text-4xl text-sky-600 font-semibold text-center my-6 md:my-8">
            Add a Task
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="name" className="label-text">
                Your Name
              </label>
              <input
                {...register("name")}
                id="name"
                placeholder="your name here"
                className={"input-field"}
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="title" className="label-text">
                  Task Title
                </label>
                <input
                  {...register("title", { required: true })}
                  placeholder="task title here"
                  id="title"
                  className="input-field"
                />
              </div>
              <div className="w-full">
                <label htmlFor="type" className="label-text">
                  Task Type
                </label>
                <select {...register("type")} className="input-field">
                  {options.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <div>
              <label htmlFor="description" className="label-text">
                Task Description
              </label>
              <textarea
                rows={5}
                {...register("description", { required: true })}
                placeholder="task description here"
                id="description"
                className="input-field"
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>

            <input type="submit" className="custom-btn flex justify-center" />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalForEditTask;
