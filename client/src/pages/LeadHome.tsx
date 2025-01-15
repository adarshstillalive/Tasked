import AddTaskForm from "../components/AddTaskForm";
import { useUser } from "../context/userContext";

const LeadHome = () => {
  const { lead } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-600 text-center">
          Manage your team's tasks and track progress
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white shadow rounded-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Task Statistics
            </h2>
            {/* Placeholder for Chart */}
            <div className="h-96 bg-gray-100 flex items-center justify-center rounded">
              <p className="text-gray-500">[Chart will be displayed here]</p>
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <AddTaskForm />
      </div>

      {/* Task List Section */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Task List
          </h2>
          {/* Task Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Task
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Assigned To
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder rows */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Design Homepage
                  </td>
                  <td className="border border-gray-300 px-4 py-2">John Doe</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>{" "}
                    |{" "}
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Fix Bug #101
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Jane Smith
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>{" "}
                    |{" "}
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadHome;
