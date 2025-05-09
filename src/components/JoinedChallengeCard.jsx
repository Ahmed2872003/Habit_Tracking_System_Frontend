// File: src/components/community/JoinedChallengeCard.jsx
import React from "react";

const JoinedChallengeCard = ({ challenge, onLeave, onMark }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow relative ${
        challenge.joined ? "bg-green-100" : "bg-white"
      }`}
    >
      <h4 className="font-bold text-lg text-gray-800">{challenge.name}</h4>
      <p className="text-sm text-gray-600">Target: {challenge.days} days</p>
      <p className="text-sm text-gray-600">
        Current Streak: {challenge.streak} days
      </p>
      {challenge.streak < challenge.days && (
        <button
          onClick={onMark}
          className="mt-2 text-sm text-purple-600 hover:underline"
        >
          + 1
        </button>
      )}
      <button
        onClick={onLeave}
        className="mt-2 ml-2 text-sm text-red-600 hover:underline"
      >
        Leave Challenge
      </button>
    </div>
  );
};

export default JoinedChallengeCard;
