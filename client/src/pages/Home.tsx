import { useEffect, useState } from "react";
import { useWebSocket } from "../context/webSocketContext";
import { ITask } from "../interfaces/ITask";
import { fetchTasks } from "../services/userService";
import TaskCard from "../components/TaskCard";
import { toast } from "react-toastify";

const Home = () => {
  const socket = useWebSocket();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();

        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newTask", (data: { task: ITask }) => {
        setTasks((prev) => {
          const taskExists = prev.some((t) => t._id === data.task._id);
          if (!taskExists) {
            toast(`${data.task.title} added by ${data.task.leadName}`);

            return [...prev, data.task];
          }
          return prev;
        });
      });
      return () => {
        socket.off("newTask");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("updateStatus", (data: { task: ITask }) => {
        setTasks((prev) => {
          const updatedTasks = prev.map((t) => {
            if (t._id === data.task._id) {
              return { ...t, status: data.task.status };
            }
            return t;
          });
          return updatedTasks;
        });
      });

      return () => {
        socket.off("updatedStatus");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("deleteTask", (data: { task: ITask }) => {
        setTasks((prev) => {
          const updatedTasks = prev.filter((t) => t._id !== data.task._id);
          toast(`${data.task.title} deleted by ${data.task.leadName}`);

          return updatedTasks;
        });
      });

      return () => {
        socket.off("deleteTask");
      };
    }
  }, [socket]);

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
            Task Management
          </h1>

          {/* Task Categories */}
          {["Pending", "In-Progress", "Completed"].map((status, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {status} Tasks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {tasks
                  .filter(
                    (task) => task.status.toLowerCase() === status.toLowerCase()
                  )
                  .map((task) => {
                    let bgColor = "";
                    switch (status) {
                      case "Pending":
                        bgColor = "bg-red-500";
                        break;
                      case "In-Progress":
                        bgColor = "bg-yellow-500";
                        break;
                      case "Completed":
                        bgColor = "bg-green-500";
                        break;
                      default:
                        bgColor = "bg-white";
                        break;
                    }
                    return <TaskCard key={task._id} task={task} bg={bgColor} />;
                  })}
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
