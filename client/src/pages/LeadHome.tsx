import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import LeadTaskList from "../components/LeadTaskList";
import { ITask } from "../interfaces/ITask";
import { fetchTasks } from "../services/leadService";
import { useWebSocket } from "../context/webSocketContext";
import TaskChart from "../components/TaskChart";
import TaskByDeadlineChart from "../components/TaskByDeadlineChart";

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

  useEffect(() => {
    if (socket) {
      socket.on("updateTask", (data: { task: ITask }) => {
        setTasks((prev) => {
          const updatedTasks = prev.map((t) =>
            t._id === data.task._id ? data.task : t
          );
          return updatedTasks;
        });
      });

      return () => {
        socket.off("updateTask");
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Task Dashboard
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Manage your team's tasks and track progress
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-9 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Task Status Overview
                </h2>
                <TaskChart tasks={tasks} />
              </div>
              <TaskByDeadlineChart tasks={tasks} />
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Task List
                </h2>
              </div>
              <LeadTaskList tasks={tasks} />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg max-w-2xl mx-auto shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Add New Task
              </h2>
              <AddTaskForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadHome;
