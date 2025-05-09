import React, { useState } from "react";

import Popup from "./Popup.jsx";

import { notifyError } from "../lib/toast.js";
import { notifySuccess } from "../lib/toast.js";

const HabitCard = ({ habit, setHabits }) => {
  const [isEditing, setIsEditing] = useState(false);

  const isCompleted = habit.streak >= habit.target;

  const deleteHabit = () => {
    if (!confirm("Are you sure you want to delete this habit?")) return;
    setHabits((habits) => habits.filter((h) => h.id !== habit.id));
    notifySuccess("Habit has been deleted");
  };

  const markHabit = () => {
    setHabits((habits) =>
      habits.map((h) =>
        h.id === habit.id ? { ...h, streak: h.streak + 1 } : h
      )
    );
  };

  const undoComplete = () => {
    setHabits((habits) =>
      habits.map((h) => (h.id === habit.id ? { ...h, streak: 0 } : h))
    );
  };

  return (
    <div
      className={`bg-white p-4 sm:p-5 rounded-xl shadow border ${
        isCompleted ? "border-green-300 opacity-90" : "border-transparent"
      } flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4`}
    >
      <div className="flex-1">
        <div
          className={`text-lg font-semibold ${
            isCompleted ? "text-green-700" : "text-gray-800"
          }`}
        >
          {habit.name}
        </div>
        <div className="text-sm text-gray-500">
          Streak: {habit.streak} / Target: {habit.target} days
        </div>
        <div className="text-sm text-gray-500">
          Last checked: {habit.lastChecked || "N/A"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end sm:justify-normal">
        {isCompleted ? (
          <button
            onClick={undoComplete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
          >
            Undo Complete
          </button>
        ) : (
          <>
            <button
              onClick={markHabit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
            >
              + 1
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full sm:w-auto"
            >
              Edit
            </button>
          </>
        )}
        <button
          onClick={deleteHabit}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      <HabitEditPopup {...{ isEditing, setIsEditing, habit, setHabits }} />
    </div>
  );
};

function HabitEditPopup({ isEditing, setIsEditing, habit, setHabits }) {
  const [newHabitName, setNewHabitName] = useState(habit.name);
  const [newHabitTarget, setNewTarget] = useState(habit.target);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    let isSaved = true;

    setHabits((habits) => {
      console.log(habits);

      if (habits.some((h) => h.name === newHabitName && h.id !== habit.id)) {
        isSaved = false;
        return habits;
      } else {
        const newHabits = habits.map((h) =>
          h.id === habit.id
            ? { ...h, name: newHabitName, target: newHabitTarget }
            : h
        );

        isSaved = true;

        return newHabits;
      }
    });

    if (isSaved) notifySuccess("Habit has been edited successfully");
    else notifyError("This habit has been added before");

    setIsEditing(false);
  };

  return (
    <Popup
      showPopup={isEditing}
      setShowPopup={setIsEditing}
      title={"Edit Habit"}
      closeLable={false}
      closeWhenClickOut={false}
    >
      <form onSubmit={handleSaveEdit}>
        <div>
          <label className="block text-sm text-gray-700">Habit Name:</label>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Target Goal:</label>
          <input
            type="number"
            value={newHabitTarget}
            onChange={(e) =>
              setNewTarget(
                isNaN(parseInt(e.target.value)) ? "" : Number(e.target.value)
              )
            }
            className="w-full p-2 border border-gray-300 rounded mb-4"
            min={habit.streak}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Save
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default HabitCard;
