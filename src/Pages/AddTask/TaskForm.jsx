import React from "react";
import { useForm } from "react-hook-form";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const options = ["Very Important", "Important", "Not Important"];

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);
  //   console.log(watch("example"));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 md:w-3/5 mx-auto border border-red-500 p-4 space-y-3"
    >
      <div>
        <label htmlFor="name" className="label-text">
          Your Name
        </label>
        <input
          {...register("name", { required: true, maxLength: 20 })}
          id="name"
          placeholder="your name here"
          className="input-field"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
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
      {errors.title && <span className="text-red-500">Title is required</span>}
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
  );
};

export default TaskForm;
