import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { fetchUsers } from "../services/leadService";

const AddTaskForm = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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

        <form className="space-y-4">
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
            >
              <option value="" disabled selected>
                Select user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
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
