const TaskListNumbers = ({ data, setSelectedTaskType }) => {
  const { taskCounts } = data; // Ensure this comes from the latest user data

  return (
    <div className="flex mt-10 justify-between gap-5">
      <div
        className="rounded-xl w-[45%] py-6 px-9 bg-teal-400 cursor-pointer"
        onClick={() => setSelectedTaskType("newTask")}
      >
        <h2 className="text-3xl font-bold">{taskCounts.newTask || 0}</h2>
        <h3 className="text-xl mt-0.5 font-medium">New Task</h3>
      </div>
      <div
        className="rounded-xl w-[45%] py-6 px-9 bg-green-500 cursor-pointer"
        onClick={() => setSelectedTaskType("completed")}
      >
        <h2 className="text-3xl font-bold">{taskCounts.completed || 0}</h2>
        <h3 className="text-xl mt-0.5 font-medium">Completed Task</h3>
      </div>
      <div
        className="rounded-xl w-[45%] py-6 px-9 bg-yellow-400 cursor-pointer"
        onClick={() => setSelectedTaskType("active")}
      >
        <h2 className="text-3xl text-black font-bold">
          {taskCounts.active || 0}
        </h2>
        <h3 className="text-xl mt-0.5 text-black font-medium">Active Task</h3>
      </div>
      <div
        className="rounded-xl w-[45%] py-6 px-9 bg-red-500 cursor-pointer"
        onClick={() => setSelectedTaskType("failed")}
      >
        <h2 className="text-3xl font-bold">{taskCounts.failed || 0}</h2>
        <h3 className="text-xl mt-0.5 font-medium">Failed Task</h3>
      </div>
    </div>
  );
};
export default TaskListNumbers;
