import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { createTask, fetchUsers } from "../services/leadService";
import { toast } from "react-toastify";

const AddTaskForm = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    assignToName: "",
    assignTo: "",
    endAt: "",
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

      if (!taskFormData.endAt) {
        toast.error("End date is required.");
        return;
      }
      await createTask(taskFormData);
      setTaskFormData({
        title: "",
        description: "",
        assignToName: "",
        assignTo: "",
        endAt: "",
      });
      toast("Task added");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-700">Title</div>
        <div className="relative">
          <input
            type="text"
            value={taskFormData.title}
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, title: e.target.value })
            }
            placeholder="Enter task title"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-700">Description</div>
        <div className="relative">
          <textarea
            value={taskFormData.description}
            onChange={(e) =>
              setTaskFormData({
                ...taskFormData,
                description: e.target.value,
              })
            }
            placeholder="Enter task description"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-700">Assign To</div>
        <div className="relative">
          <select
            value={taskFormData.assignTo}
            onChange={(e) => {
              const selectedEmail = e.target.value;
              const selectedUser = users.find(
                (user) => user.email === selectedEmail
              );
              if (selectedUser) {
                setTaskFormData({
                  ...taskFormData,
                  assignTo: selectedUser.email,
                  assignToName: selectedUser.name,
                });
              }
            }}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="" disabled>
              Select user
            </option>
            {users.map((user) => (
              <option key={user._id} value={user.email}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-700">End Date</div>
        <div className="relative">
          <input
            type="date"
            value={taskFormData.endAt}
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, endAt: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all active:scale-95"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
