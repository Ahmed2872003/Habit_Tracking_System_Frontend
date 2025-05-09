import React, { useState } from "react";

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { name: "Drink water", streak: 3 },
    { name: "Workout", streak: 1 },
  ]);

  const markComplete = (index) => {
    const updated = [...habits];
    updated[index].streak++;
    setHabits(updated);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Habit Tracker</h2>
      <div className="space-y-4">
        {habits.map((habit, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="text-lg font-medium">
              {habit.name}{" "}
              <span className="text-gray-500">
                - Streak: {habit.streak} days
              </span>
            </div>
            <button
              onClick={() => markComplete(i)}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
            >
              Mark Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
