import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { fetchUsers, updateTask } from "../services/leadService";
import { toast } from "react-toastify";
import { ITask } from "../interfaces/ITask";

interface EditTaskFormProps {
  task: ITask;
  closeEditModal: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  closeEditModal,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [taskFormData, setTaskFormData] = useState({
    title: task.title,
    description: task.description,
    assignToName: task.assignToName,
    assignTo: task.assignTo,
    endAt: task.endAt.toString(),
    status: task.status,
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
      if (!task._id) return;
      await updateTask(task._id, taskFormData);
      setTaskFormData({
        title: "",
        description: "",
        assignToName: "",
        assignTo: "",
        endAt: "",
        status: task.status,
      });
      toast("Task updated");
      closeEditModal();
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
    <div className="col-span-1 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white shadow rounded-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Task</h2>

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
              value={taskFormData.assignTo}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              style={{ maxHeight: "200px" }}
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
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              defaultValue={taskFormData.status}
              onChange={(e) =>
                setTaskFormData({
                  ...taskFormData,
                  status: e.target.value as ITask["status"],
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="endAt"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endAt"
              value={new Date(taskFormData.endAt).toISOString().split("T")[0]}
              onChange={(e) =>
                setTaskFormData({ ...taskFormData, endAt: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              onClick={closeEditModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={handleSubmit}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
