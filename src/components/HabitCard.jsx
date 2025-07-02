import React from "react";

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const today = new Date().toISOString().split("T")[0];
  const doneToday = habit.history?.[today] || false;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow w-full max-w-md flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-semibold">{habit.name}</h2>
        <p className="text-sm text-gray-400">Created: {habit.createdAt}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`px-4 py-2 rounded-lg text-white font-bold ${
            doneToday ? "bg-green-500" : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {doneToday ? "Done ✅" : "Mark Done"}
        </button>

        <button
          onClick={() => onDelete(habit.id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white font-bold"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
