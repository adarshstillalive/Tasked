import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { createTask, fetchUsers } from "../services/leadService";
import { toast } from "react-toastify";

const AddTaskForm = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    assignTo: "",
    endDate: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      if (!taskFormData.title.trim()) {
        toast.error("Title is required and cannot be empty.");
        return;
      }

      if (taskFormData.title.length < 3 || taskFormData.title.length > 100) {
        toast.error("Title must be between 3 and 100 characters.");
        return;
      }

      if (!taskFormData.description.trim()) {
        toast.error("Description is required and cannot be empty.");
        return;
      }

      if (
        taskFormData.description.length < 10 ||
        taskFormData.description.length > 500
      ) {
        toast.error("Description must be between 10 and 500 characters.");
        return;
      }

      if (!taskFormData.assignTo.trim()) {
        toast.error("Please select a user to assign the task.");
        return;
      }

      if (!taskFormData.endDate) {
        toast.error("End date is required.");
        return;
      }
      console.log(taskFormData);
      await createTask(taskFormData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again.");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="col-span-1">
      <div className="bg-white shadow rounded-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Tasks</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskFormData.title}
              onChange={(e) =>
                setTaskFormData({ ...taskFormData, title: e.target.value })
              }
              placeholder="Enter task title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="taskDescription"
              value={taskFormData.description}
              onChange={(e) =>
                setTaskFormData({
                  ...taskFormData,
                  description: e.target.value,
                })
              }
              placeholder="Enter task description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="assignTo"
              className="block text-sm font-medium text-gray-700"
            >
              Assign To
            </label>
            <select
              id="assignTo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              style={{ maxHeight: "200px" }}
              onChange={(e) =>
                setTaskFormData({ ...taskFormData, assignTo: e.target.value })
              }
            >
              <option value="" disabled selected>
                Select user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={taskFormData.endDate}
              onChange={(e) =>
                setTaskFormData({ ...taskFormData, endDate: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
