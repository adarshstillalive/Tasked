import { useEffect, useState } from "react";
import { useWebSocket } from "../context/webSocketContext";
import { useUser } from "../context/userContext";
import { ITask } from "../interfaces/ITask";
import { fetchTasks } from "../services/userService";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const socket = useWebSocket();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const opUpdateStatus = async (taskId: string, newStatus: ITask["status"]) => {
    console.log(taskId, newStatus);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        console.log(response.data);

        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
            Task Management
          </h1>

          {/* Task Categories */}
          {["Pending", "In-Progress", "Completed"].map((status) => (
            <div key={status} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {status} Tasks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {tasks
                  .filter(
                    (task) => task.status.toLowerCase() === status.toLowerCase()
                  )
                  .map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdateStatus={opUpdateStatus}
                    />
                  ))}
              </div>
              {tasks.filter(
                (task) => task.status.toLowerCase() === status.toLowerCase()
              ).length === 0 && (
                <p className="text-gray-500 text-center mt-4">
                  No {status.toLowerCase()} tasks available.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
