import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data, employeeName }) => {
  const { userData, setUserData } = useContext(AuthContext);

  const updateTaskStatus = (status) => {
    const updatedUserData = userData.map((employee) => {
      if (employee.firstName.toLowerCase() === employeeName.toLowerCase()) {
        const updatedTasks = employee.tasks.map((task) => {
          if (
            task.taskTitle === data.taskTitle &&
            task.taskDate === data.taskDate
          ) {
            return {
              ...task,
              active: status === "completed", // Task is active if completed
              newTask: false,
              completed: status === "completed",
              failed: status === "failed",
            };
          }
          return task;
        });

        employee.tasks = updatedTasks;

        // Update taskCounts
        if (status === "completed") {
          employee.taskCounts.completed += 1;
          employee.taskCounts.active -= 1;
        } else if (status === "failed") {
          employee.taskCounts.failed += 1;
          employee.taskCounts.active -= 1;
        }
      }
      return employee;
    });

    // Sync changes with context and localStorage
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    alert(`Task marked as ${status}!`);
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => updateTaskStatus("completed")}
          className="bg-green-500 rounded font-medium py-1 px-2 text-xs"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => updateTaskStatus("failed")}
          className="bg-red-500 rounded font-medium py-1 px-2 text-xs"
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
