const TaskCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default TaskCardSkeleton;
