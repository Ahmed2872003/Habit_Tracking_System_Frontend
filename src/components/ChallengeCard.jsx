// File: src/components/community/ChallengeCard.jsx
import React, { useState } from "react";
import UsersChallengePopup from "./UsersChallengePopup.jsx";

const ChallengeCard = ({ challenge, onToggle }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`p-4 rounded-xl shadow relative ${
        challenge.joined ? "bg-green-100" : "bg-white"
      }`}
    >
      <h4 className="font-bold text-lg text-gray-800">{challenge.name}</h4>
      <p className="text-sm text-gray-600">Target: {challenge.days} days</p>
      {!challenge.joined && (
        <button
          onClick={onToggle}
          className="mt-2 text-sm text-purple-600 hover:underline"
        >
          Join
        </button>
      )}
      <button
        onClick={() => setShowPopup(true)}
        className="mt-2 ml-2 text-sm text-blue-600 hover:underline"
      >
        View Participants
      </button>

      <UsersChallengePopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        users={challenge.users}
      />
    </div>
  );
};

export default ChallengeCard;
