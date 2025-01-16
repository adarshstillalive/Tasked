import React, { useState } from "react";
import { ITask } from "../interfaces/ITask";

interface TaskCardProps {
  task: ITask;
  onUpdateStatus: (taskId: string, newStatus: ITask["status"]) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ITask["status"]>(task.status);

  const handleUpdateStatus = () => {
    onUpdateStatus(task._id!, newStatus); // Assuming `_id` exists for each task
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Task Card */}
      <div
        className="bg-white shadow rounded p-4 cursor-pointer hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">
          {task.description.slice(0, 80)}
          {task.description.slice(80) ? "..." : ""}
        </p>
        <p className="text-sm text-gray-500">
          Assigned By: <span className="font-medium">{task.leadName}</span>{" "}
          <span title={task.leadId} className="cursor-pointer ">
            ({task.leadId.slice(0, 8)}...)
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Status: <span className="font-medium capitalize">{task.status}</span>
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Task Details
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <p className="text-gray-800">{task.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="text-gray-800">{task.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <p className="text-gray-800">
                  {task.assignToName} ({task.assignTo})
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <p className="text-gray-800">
                  {new Date(task.endAt).toLocaleDateString()}
                </p>
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
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as ITask["status"])
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
                onClick={handleUpdateStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
