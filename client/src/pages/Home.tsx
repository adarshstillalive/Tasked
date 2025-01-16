import { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "../context/webSocketContext";
import { ITask } from "../interfaces/ITask";
import { fetchTasks } from "../services/userService";
import TaskCard from "../components/TaskCard";
import { toast } from "react-toastify";
import TaskCardSkeleton from "../components/TaskCardSkeleton";

const Home = () => {
  const socket = useWebSocket();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();

        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTasks();
  }, []);

  const handleNewTask = useCallback(
    (data: { task: ITask }) => {
      setTasks((prev) => {
        const taskExists = prev.some((t) => t._id === data.task._id);
        if (!taskExists) {
          toast(`${data.task.title} added by ${data.task.leadName}`);
          return [...prev, data.task];
        }
        return prev;
      });
    },
    [setTasks]
  );

  const handleUpdateStatus = useCallback(
    (data: { task: ITask }) => {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === data.task._id ? { ...t, status: data.task.status } : t
        )
      );
    },
    [setTasks]
  );

  const handleDeleteTask = useCallback(
    (data: { task: ITask }) => {
      setTasks((prev) => {
        const updatedTasks = prev.filter((t) => t._id !== data.task._id);
        toast(`${data.task.title} deleted by ${data.task.leadName}`);
        return updatedTasks;
      });
    },
    [setTasks]
  );

  const handleUpdateTask = useCallback(
    (data: { task: ITask }) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === data.task._id ? data.task : t))
      );
      toast(`${data.task.title} updated by ${data.task.leadName}`);
    },
    [setTasks]
  );

  useEffect(() => {
    if (socket) {
      socket.on("newTask", handleNewTask);
      socket.on("updateStatus", handleUpdateStatus);
      socket.on("deleteTask", handleDeleteTask);
      socket.on("updateTask", handleUpdateTask);

      return () => {
        socket.off("newTask", handleNewTask);
        socket.off("updateStatus", handleUpdateStatus);
        socket.off("deleteTask", handleDeleteTask);
        socket.off("updateTask", handleUpdateTask);
      };
    }
  }, [
    socket,
    handleNewTask,
    handleUpdateStatus,
    handleDeleteTask,
    handleUpdateTask,
  ]);

  return (
    <div className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 lg:mb-12 text-center">
          Task Management
        </div>

        <div className="space-y-6 sm:space-y-8">
          {["Pending", "In-Progress", "Completed"].map((status, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8"
            >
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">
                {status} Tasks
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <TaskCardSkeleton key={i} />
                    ))
                  : tasks
                      .filter(
                        (task) =>
                          task.status.toLowerCase() === status.toLowerCase()
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
                            bgColor = "bg-gray-200";
                            break;
                        }
                        return (
                          <TaskCard key={task._id} task={task} bg={bgColor} />
                        );
                      })}
              </div>

              {!isLoading &&
                tasks.filter(
                  (task) => task.status.toLowerCase() === status.toLowerCase()
                ).length === 0 && (
                  <div className="text-gray-500 text-center mt-4">
                    No {status.toLowerCase()} tasks available.
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
