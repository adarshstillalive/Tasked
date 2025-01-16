import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import LeadTaskList from "../components/LeadTaskList";
import { ITask } from "../interfaces/ITask";
import { fetchTasks } from "../services/leadService";
import { useWebSocket } from "../context/webSocketContext";

const LeadHome = () => {
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
        socket.off("updateStatus");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("deleteTask", (data: { task: ITask }) => {
        setTasks((prev) => {
          const updatedTasks = prev.filter((t) => t._id !== data.task._id);
          return updatedTasks;
        });
      });

      return () => {
        socket.off("deleteTask");
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-600 text-center">
          Manage your team's tasks and track progress
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white shadow rounded-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Task Statistics
            </h2>
            <div className="h-96 bg-gray-100 flex items-center justify-center rounded">
              <p className="text-gray-500">[Chart will be displayed here]</p>
            </div>
          </div>
        </div>

        <AddTaskForm />
      </div>

      <div className="mt-8">
        <LeadTaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default LeadHome;
