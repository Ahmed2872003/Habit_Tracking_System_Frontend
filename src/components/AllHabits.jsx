// File: src/pages/AllHabits.jsx
import React, { useEffect, useState } from "react";

import { notifySuccess } from "../lib/toast.js";

import HabitCard from "./HabitCard.jsx";

import { ToastContainer } from "react-toastify";
import { notifyError } from "../lib/toast.js";

import templateHabits from "../data/templateHabits.json";
import initialHabits from "../data/habits.json";

const AllHabits = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabitName, setNewHabit] = useState("");
  const [targetDays, setTargetDays] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const removeSuggestionsClickOut = (e) =>
      !e.target.closest("#input-with-suggestions-contaner")
        ? setShowSuggestions(false)
        : null;

    addEventListener("click", removeSuggestionsClickOut);

    return () => {
      removeEventListener("click", removeSuggestionsClickOut);
    };
  }, []);

  const addHabit = (e) => {
    e.preventDefault();

    if (newHabitName.trim() && !isNaN(targetDays) && targetDays > 0) {
      if (habits.some((h) => h.name === newHabitName))
        notifyError("This habit was added before");
      // console.log("Hey");
      else {
        setHabits(() => {
          const newHabits = [
            ...habits,
            {
              id: habits[habits.length - 1].id + 1,
              name: newHabitName,
              streak: 0,
              target: parseInt(targetDays),
              lastChecked: new Date().toUTCString(),
            },
          ];
          return newHabits;
        });
        notifySuccess("Habit has been added successfully");
      }
      setNewHabit("");
      setTargetDays("");
    }
  };

  const ongoingHabits = habits.filter((h) => h.streak < h.target);
  const completedHabits = habits.filter((h) => h.streak >= h.target);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">All Habits</h2>

      <form onSubmit={addHabit}>
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div
            id="input-with-suggestions-contaner"
            className="relative w-full md:w-auto flex-1"
          >
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => {
                setNewHabit(e.target.value);
                setShowSuggestions(e.target.value.trim() ? false : true);
              }}
              onFocus={() =>
                setShowSuggestions(newHabitName.trim() ? false : true)
              }
              className="w-full p-3 border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Habit name"
              required={true}
            />
            {showSuggestions && (
              <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-xl w-full shadow-lg max-h-60 overflow-y-auto">
                {templateHabits.map((habit, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setNewHabit(habit.name);
                      setShowSuggestions(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-purple-100 transition"
                  >
                    {habit.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(e.target.value)}
              className="w-36 p-3 flex-grow border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Target days"
              required={true}
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Ongoing habits */}
      {ongoingHabits.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-purple-700 mb-3">
            Ongoing Habits ({ongoingHabits.length})
          </h3>
          <div className="space-y-4">
            {ongoingHabits.map((habit) => (
              <HabitCard
                key={`ongoing-${habit.id}`}
                {...{ habit, setHabits }}
              />
            ))}
          </div>
        </div>
      )}
      {/* Completed habits */}
      {completedHabits.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            Completed Habits ({completedHabits.length})
          </h3>
          <div className="space-y-4">
            {completedHabits.map((habit) => (
              <HabitCard
                key={`completed-${habit.id}`}
                {...{ habit, setHabits }}
              />
            ))}
          </div>
        </div>
      )}

      {habits.length === 0 && (
        <div className="text-center text-purple-700 mt-10">
          <h3 className="text-2xl font-bold mb-2">
            The Start of a Better You!
          </h3>
          <p className="text-lg">
            Habits are like dominos. As one is formed, all others will follow!
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllHabits;
