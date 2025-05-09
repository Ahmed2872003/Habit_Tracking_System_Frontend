import React, { useState } from "react";
import { useChallenges } from "../hooks/useChallanges.js";

import JoinedChallengeCard from "../components/JoinedChallengeCard.jsx";
import ChallengesPopup from "./ChallengesPopup.jsx";

import initialChallenges from "../data/challenges.json";

const Community = () => {
  const [showDiscover, setShowDiscover] = useState(false);

  const { challenges, inProgress, completed, toggleJoin, incrementStreak } =
    useChallenges(initialChallenges);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        Community Challenges
      </h2>

      {/* Button to show modal */}
      <button
        onClick={() => setShowDiscover(true)}
        className="mb-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Discover Challenges
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Your Joined Challenges ({inProgress.length + completed.length})
        </h3>

        {inProgress.length > 0 && (
          <>
            <h4 className="text-lg font-medium text-yellow-600 mb-2">
              In Progress
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {inProgress.map((ch) => (
                <JoinedChallengeCard
                  key={ch.id}
                  challenge={ch}
                  onLeave={() => toggleJoin(ch.id)}
                  onMark={() => incrementStreak(ch.id)}
                />
              ))}
            </div>
          </>
        )}

        {completed.length > 0 && (
          <>
            <h4 className="text-lg font-medium text-green-600 mb-2">
              Completed
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {completed.map((ch) => (
                <JoinedChallengeCard
                  key={ch.id}
                  challenge={ch}
                  onLeave={() => toggleJoin(ch.id)}
                  onMark={() => incrementStreak(ch.id)}
                />
              ))}
            </div>
          </>
        )}

        {inProgress.length === 0 && completed.length === 0 && (
          <p className="text-gray-500 italic">
            You haven’t joined any challenges yet.
          </p>
        )}
      </div>

      {/* all challenges popup */}
      <ChallengesPopup
        isOpen={showDiscover}
        setIsOpen={setShowDiscover}
        onClose={() => setShowDiscover(false)}
        challenges={challenges}
        toggleJoin={toggleJoin}
      />
    </div>
  );
};

export default Community;
