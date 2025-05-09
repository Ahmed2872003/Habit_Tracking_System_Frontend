import { useState } from "react";

export const useChallenges = (initialChallenges) => {
  const [challenges, setChallenges] = useState(initialChallenges);

  const toggleJoin = (id) => {
    setChallenges((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? { ...ch, joined: !ch.joined, streak: ch.joined ? 0 : ch.streak }
          : ch
      )
    );
  };

  const incrementStreak = (id) => {
    setChallenges((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, streak: Math.min(ch.streak + 1, ch.days) } : ch
      )
    );
  };

  const joined = challenges.filter((ch) => ch.joined);
  const inProgress = challenges.filter(
    (ch) => ch.joined && ch.streak < ch.days
  );
  const completed = challenges.filter(
    (ch) => ch.joined && ch.streak >= ch.days
  );

  return {
    challenges,
    joined,
    inProgress,
    completed,
    toggleJoin,
    incrementStreak,
  };
};
