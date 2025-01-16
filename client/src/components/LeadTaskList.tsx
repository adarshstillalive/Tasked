import React, { useState } from "react";
import { ITask } from "../interfaces/ITask";
import { deleteTask } from "../services/leadService";
import { toast } from "react-toastify";

interface TasklistProps {
  tasks: ITask[];
}

const LeadTaskList: React.FC<TasklistProps> = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  const openModal = (task: ITask) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleDelete = async () => {
    console.log(taskToDelete);

    if (taskToDelete && taskToDelete._id) {
      try {
        await deleteTask(taskToDelete._id);
        toast("Task deleted");
      } catch (error) {
        console.log(error);
        toast.error("Task deletion failed, Try again");
      } finally {
        closeModal();
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Task List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
                Task
              </th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
                Assigned To
              </th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50 text-center">
                <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-800">
                  {task.title}
                </td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-600">
                  {task.assignToName} ({task.assignTo})
                </td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-600">
                  <span
                    className={`px-4 py-1 rounded-full text-sm ${
                      task.status === "pending"
                        ? "bg-red-100 text-red-700"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-6 py-4 text-sm font-medium">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>{" "}
                  |{" "}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => openModal(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure, you want to delete this task?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTaskList;
