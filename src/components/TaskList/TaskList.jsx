import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ tasks, updateTaskStatus }) => {
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {tasks.map((task, idx) => {
        // Render tasks based on their state (active, newTask, completed, failed)
        if (task.active) {
          return (
            <AcceptTask
              key={idx}
              data={task}
              employeeName={task.assignedTo} // Pass employeeName to update task status
            />
          );
        }
        if (task.newTask) {
          return <NewTask key={idx} data={task} />;
        }
        if (task.completed) {
          return <CompleteTask key={idx} data={task} />;
        }
        if (task.failed) {
          return <FailedTask key={idx} data={task} />;
        }
        return null; // If no task state matches, return null
      })}
    </div>
  );
};

export default TaskList;
