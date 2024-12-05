import { useContext, useState, useEffect } from "react"; // Import necessary hooks from React
import Header from "../other/Header"; // Import Header component
import TaskListNumbers from "../other/TaskListNumbers"; // Import TaskListNumbers component for task summary
import TaskList from "../TaskList/TaskList"; // Import TaskList component for displaying tasks
import { AuthContext } from "../../context/AuthProvider"; // Import AuthContext to access global user data

const EmployeeDashboard = (props) => {
  // Access global user data from the AuthContext
  const { userData } = useContext(AuthContext);

  // State to store tasks of the logged-in employee
  const [tasks, setTasks] = useState([]);

  // State to track the selected task type (new, active, completed, etc.)
  const [selectedTaskType, setSelectedTaskType] = useState(null);

  // useEffect to fetch and update tasks whenever userData or props.data changes
  useEffect(() => {
    // Assume props.data contains information about the logged-in employee (e.g., name)
    const loggedInEmployeeName = props.data?.firstName.toLowerCase();

    // Find the logged-in employee in the userData
    const loggedInEmployee = userData?.find(
      (employee) => employee.firstName.toLowerCase() === loggedInEmployeeName
    );

    // If the employee is found, set their tasks; else reset tasks to empty
    if (loggedInEmployee?.tasks) {
      setTasks(loggedInEmployee.tasks);
    } else {
      setTasks([]); // Reset tasks if no employee found or no tasks available
    }
  }, [userData, props.data]); // Run the effect when userData or props.data changes

  // Function to update the status of a task (new, active, completed, failed)
  const updateTaskStatus = (taskTitle, status) => {
    // Map over tasks and update the status of the task that matches the taskTitle
    const updatedTasks = tasks.map((task) => {
      if (task.taskTitle === taskTitle) {
        return {
          ...task,
          newTask: status === "newTask",
          active: status === "active",
          completed: status === "completed",
          failed: status === "failed",
        };
      }
      return task; // Return task unchanged if no match
    });
    setTasks(updatedTasks); // Update the state with the modified tasks
  };

  // Calculate task counts for each status (new, active, completed, failed)
  const taskCounts = {
    newTask: tasks.filter((task) => task.newTask).length,
    active: tasks.filter((task) => task.active).length,
    completed: tasks.filter((task) => task.completed).length,
    failed: tasks.filter((task) => task.failed).length,
  };

  // Filter tasks based on the selected task type (new, active, completed, failed)
  const filteredTasks = tasks.filter((task) => {
    if (!selectedTaskType) return false; // Don't show tasks until one type is selected
    return task[selectedTaskType]; // Filters tasks based on the selected task type
  });

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      {/* Header component to display the header and manage user data */}
      <Header changeUser={props.changeUser} data={props.data} />

      {/* TaskListNumbers component to show task count and allow filtering by task type */}
      <TaskListNumbers
        data={{ taskCounts }} // Pass task counts to TaskListNumbers
        setSelectedTaskType={setSelectedTaskType} // Set task type for filtering
      />

      {/* Display TaskList if a task type is selected */}
      {selectedTaskType && (
        <TaskList tasks={filteredTasks} updateTaskStatus={updateTaskStatus} />
      )}
    </div>
  );
};

export default EmployeeDashboard;
