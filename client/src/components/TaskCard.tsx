import React, { useState } from "react";
import { ITask } from "../interfaces/ITask";
import { updateStatus } from "../services/userService";

interface TaskCardProps {
  task: ITask;
  bg: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, bg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ITask["status"]>(task.status);

  const handleUpdateStatus = async () => {
    if (!task._id) return;
    try {
      await updateStatus(task._id, newStatus);
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`${bg} rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white leading-tight">
            {task.title}
          </h3>

          <p className="text-white/90 text-sm line-clamp-2">
            {task.description.slice(0, 30)}
            {task.description.slice(30) ? "..." : ""}
          </p>

          <div className="pt-2 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <span className="font-medium">Lead:</span>
              <span>{task.leadName}</span>
              <span title={task.leadId} className="text-white/70 text-xs">
                ({task.leadId.slice(0, 8)}...)
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="px-2 py-1 bg-white/20 rounded-full text-white">
                {task.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Task Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <p className="mt-1 text-gray-900 font-medium">{task.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <p className="mt-1 text-gray-800 text-sm max-h-24 overflow-y-auto">
                  {task.description}
                </p>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">
                    Assigned By
                  </label>
                  <p className="mt-1 text-gray-800">
                    {task.leadName}
                    <span className="text-gray-500 text-sm ml-1">
                      ({task.leadId})
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Due Date
                  </label>
                  <p className="mt-1 text-gray-800">
                    {new Date(task.endAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-600"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as ITask["status"])
                  }
                  className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  handleUpdateStatus();
                  setIsModalOpen(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
