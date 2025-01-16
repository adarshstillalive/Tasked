import { ITask } from "../interfaces/ITask";

interface TasklistProps {
  tasks: ITask[];
}

const LeadTaskList: React.FC<TasklistProps> = ({ tasks }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Task List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 ">
            <tr className="">
              <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
                Task
              </th>
              <th className="border  border-gray-300 px-6 py-3 text-sm font-medium text-gray-600">
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
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 text-center">
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
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTaskList;
