import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const NewTask = ({ data }) => {
  const { userData, setUserData } = useContext(AuthContext);

  const acceptTaskHandler = () => {
    // Find the logged-in employee from the context (AuthContext)
    const loggedInEmployee = userData.find(
      (employee) => employee.firstName === data.assignedTo // Check exact match of first name
    );

    // If no employee is found, return early
    if (!loggedInEmployee) {
      // alert("Logged-in employee not found.");
      return;
    }

    // Proceed to update the task's status
    const updatedUserData = userData.map((employee) => {
      if (employee.firstName === loggedInEmployee.firstName) {
        const updatedTasks = employee.tasks.map((task) => {
          if (
            task.taskTitle === data.taskTitle &&
            task.taskDate === data.taskDate
          ) {
            return {
              ...task,
              active: true, // Set task as active
              newTask: false, // Remove from newTask
            };
          }
          return task;
        });

        employee.tasks = updatedTasks;
        employee.taskCounts.active += 1; // Increment active task count
        employee.taskCounts.newTask -= 1; // Decrement new task count
      }
      return employee;
    });

    // Update state and localStorage with the new user data
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // alert("Task accepted and is now active!");
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-teal-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-sky text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      <div className="mt-6">
        <button
          onClick={acceptTaskHandler}
          className="bg-blue-500 rounded font-medium py-1 px-2 text-xs"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
