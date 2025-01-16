import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ITask } from "../interfaces/ITask";
import CustomTooltip from "./CustomToolTip";

const COLORS: Record<"pending" | "in-progress" | "completed", string> = {
  pending: "#FF6B6B",
  "in-progress": "#FFD93D",
  completed: "#4ADE80",
};

interface TaskChartProps {
  tasks: ITask[];
}

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const data = [
    {
      name: "Pending",
      value: tasks.filter((task) => task.status === "pending").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((task) => task.status === "completed").length,
    },
  ];

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={90}
            paddingAngle={0}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    entry.name
                      .toLowerCase()
                      .replace(" ", "-") as keyof typeof COLORS
                  ]
                }
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              fontSize: "12px",
              marginTop: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="p-2 rounded-lg bg-gray-50">
            <div
              className="text-lg font-bold"
              style={{
                color:
                  COLORS[
                    item.name
                      .toLowerCase()
                      .replace(" ", "-") as keyof typeof COLORS
                  ],
              }}
            >
              {item.value}
            </div>
            <div className="text-xs text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskChart;
