import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const ManageEmployees = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    taskCounts: {
      newTask: 0,
      active: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  });
  const [employeeToRemove, setEmployeeToRemove] = useState("");

  // Function to clear all employee and admin data
  const clearAllData = () => {
    localStorage.removeItem("employees");
    localStorage.removeItem("admin");
    setUserData([]); // Clear the state as well
    alert("All employee data has been cleared!");
  };

  // Handler to add a new employee
  const addEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.firstName) {
      alert("Please provide valid employee details.");
      return;
    }

    // Generate email and default password
    const email = `${newEmployee.firstName.toLowerCase()}@company.com`; // Example email
    const password = "123"; // Default password

    // Generate employee ID (based on existing employees, or default to 1 if none)
    const newId =
      userData.length > 0 ? userData[userData.length - 1].id + 1 : 1;

    const newEmployeeData = {
      ...newEmployee,
      id: newId,
      email: email,
      password: password,
    };

    const updatedUserData = [...userData, newEmployeeData];
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // Reset form
    setNewEmployee({ ...newEmployee, firstName: "" });

    alert("Employee added successfully! Login credentials have been created.");
  };

  // Handler to remove an employee
  const removeEmployee = (e) => {
    e.preventDefault();
    const updatedUserData = userData.filter(
      (employee) =>
        employee.firstName.toLowerCase() !== employeeToRemove.toLowerCase()
    );

    if (updatedUserData.length === userData.length) {
      alert("Employee not found.");
      return;
    }

    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // Reset the remove field
    setEmployeeToRemove("");
    alert("Employee removed successfully!");
  };

  return (
    <div className="flex flex-wrap gap-[2%]">
      <div className="p-5 bg-[#1c1c1c] mt-5 rounded w-[49%] flex flex-col">
        {/* Add Employee */}
        <form onSubmit={addEmployee} className="mb-5 flex flex-col">
          <h3 className="text-lg text-white mb-2 flex justify-center">
            Add New Employee
          </h3>
          <input
            type="text"
            value={newEmployee.firstName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
            placeholder="First Name"
            className="text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-2"
          />

          <button
            type="submit"
            className="bg-emerald-500 py-2 hover:bg-emerald-600 px-5 rounded text-sm"
          >
            Add Employee
          </button>
        </form>
      </div>
      <div className="p-5 bg-[#1c1c1c] mt-5 rounded w-[49%] flex flex-col">
        <form onSubmit={removeEmployee}>
          <h3 className="text-lg text-white mb-2 flex justify-center">
            Remove Employee
          </h3>
          <input
            type="text"
            value={employeeToRemove}
            onChange={(e) => setEmployeeToRemove(e.target.value)}
            placeholder="Enter Employee First Name"
            className="text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
          />
          <button
            type="submit"
            className="bg-red-600 py-2 hover:bg-red-700 px-5 rounded text-sm"
          >
            Remove Employee
          </button>
        </form>
        <button
          onClick={clearAllData}
          className="bg-red-800 py-2 hover:bg-red-900 px-5 rounded text-sm mt-5"
        >
          Clear All Employee Data
        </button>
      </div>
    </div>
  );
};

export default ManageEmployees;
