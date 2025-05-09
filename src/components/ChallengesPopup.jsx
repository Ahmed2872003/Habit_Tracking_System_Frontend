import ChallengeCard from "./ChallengeCard.jsx";
import Overlay from "./Overlay.jsx";
import Popup from "./Popup.jsx";

export default function ChallengesPopup({
  isOpen,
  setIsOpen,
  challenges,
  toggleJoin,
}) {
  return (
    <Popup
      showPopup={isOpen}
      setShowPopup={setIsOpen}
      title={"Discover Challenges"}
    >
      {challenges.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((ch) => (
            <ChallengeCard
              key={ch.id}
              challenge={ch}
              onToggle={() => toggleJoin(ch.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No challenges available.</p>
      )}
    </Popup>
  );
}
