import { useContext, useState } from "react"; // Import necessary hooks
import { AuthContext } from "../../context/AuthProvider"; // Import the AuthContext to access user data and state

// Component for creating and assigning tasks
const CreateTask = () => {
  // Access user data and the function to update it from the AuthContext
  const { userData, setUserData } = useContext(AuthContext);

  // State variables for form inputs
  const [taskTitle, setTaskTitle] = useState(""); // Task title
  const [taskDescription, setTaskDescription] = useState(""); // Task description
  const [taskDate, setTaskDate] = useState(""); // Due date for the task
  const [assignTo, setAssignTo] = useState(""); // Employee to whom the task is assigned
  const [category, setCategory] = useState(""); // Task category (e.g., Design, Development)

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs
    if (!taskTitle || !taskDate || !assignTo || !category || !taskDescription) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // Create a new task object
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false, // Task is not active initially
      newTask: true, // Mark as a new task
      failed: false, // Task has not failed initially
      completed: false, // Task is not completed initially
    };

    // Ensure userData is a valid array before using .map()
    if (!Array.isArray(userData)) {
      console.error("userData is not an array:", userData);
      setUserData([]); // Reset userData to an empty array if invalid
    }

    let employeeFound = false; // Flag to check if the employee exists

    // Update user data by mapping over employees
    const updatedUserData = userData.map((employee) => {
      if (employee.firstName.toLowerCase() === assignTo.toLowerCase()) {
        employeeFound = true;

        // If tasks array doesn't exist, initialize it
        if (!employee.tasks) employee.tasks = [];
        employee.tasks.push(newTask); // Add the new task to the employee's tasks

        // Update the task count for "newTask"
        employee.taskCounts.newTask += 1;
      }
      return employee;
    });

    // If the employee is not found in the existing data
    if (!employeeFound) {
      alert(
        "Employee not found in the database, or employee ID is not created."
      );
      return;
    }

    // Save the updated user data to localStorage and update the context
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
    setUserData(updatedUserData); // Update context with the new user data

    // Reset form fields after successful submission
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");

    alert("Task successfully assigned!"); // Notify the user
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      {/* Task creation form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          {/* Form fields for task details */}
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Employee name"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, Development, etc."
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          {/* Form field for task description */}
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
          ></textarea>
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
