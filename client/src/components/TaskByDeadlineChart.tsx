import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ITask } from "../interfaces/ITask";
import CustomTooltip from "./CustomToolTip";

interface TaskByDeadlineChartProps {
  tasks: ITask[];
}

type StatusType = "all" | "pending" | "in-progress" | "completed";

const TaskByDeadlineChart: React.FC<TaskByDeadlineChartProps> = ({ tasks }) => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("all");

  const chartData = useMemo(() => {
    const filteredTasks = tasks.filter((task) =>
      selectedStatus === "all" ? true : task.status === selectedStatus
    );

    const groupedData = filteredTasks.reduce(
      (acc, task) => {
        const date = new Date(task.endAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const existingDate = acc.find((item) => item.date === date);
        if (existingDate) {
          existingDate.count += 1;
          existingDate[task.status] = (existingDate[task.status] || 0) + 1;
        } else {
          acc.push({
            date,
            count: 1,
            [task.status]: 1,
            timestamp: new Date(task.endAt).getTime(),
          });
        }
        return acc;
      },
      [] as Array<{
        date: string;
        count: number;
        pending?: number;
        "in-progress"?: number;
        completed?: number;
        timestamp: number;
      }>
    );

    return groupedData.sort((a, b) => a.timestamp - b.timestamp);
  }, [tasks, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF6B6B";
      case "in-progress":
        return "#FFD93D";
      case "completed":
        return "#4ADE80";
      default:
        return "#6366F1";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          Task Deadline Distribution
        </h2>
        <div>
          <select
            className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-gray-100 transition-colors"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as StatusType)}
          >
            <option value="all">All Status &nbsp; ▼</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            barSize={100}
          >
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fill: "#666", fontSize: 12 }}
              label={{
                value: "Deadline Date",
                position: "insideBottom",
                offset: -60,
                fill: "#666",
                fontSize: 14,
              }}
            />
            <YAxis
              label={{
                value: "Number of Tasks",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#666",
                fontSize: 14,
              }}
              allowDecimals={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                paddingBottom: "20px",
                fontSize: "13px",
              }}
            />
            {selectedStatus === "all" ? (
              <>
                <Bar
                  dataKey="pending"
                  stackId="stack"
                  fill={getStatusColor("pending")}
                  name="Pending"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="in-progress"
                  stackId="stack"
                  fill={getStatusColor("in-progress")}
                  name="In Progress"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  stackId="stack"
                  fill={getStatusColor("completed")}
                  name="Completed"
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : (
              <Bar
                dataKey="count"
                fill={getStatusColor(selectedStatus)}
                name={`${
                  selectedStatus.charAt(0).toUpperCase() +
                  selectedStatus.slice(1)
                } Tasks`}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskByDeadlineChart;
