import Popup from "./Popup.jsx";

const UsersPopup = ({ users = [], onClose, showPopup, setShowPopup }) => {
  users.sort((a, b) => b.streak - a.streak);

  return (
    <Popup
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      title={"Registered Users"}
    >
      {users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user, i) => (
            <li key={i} className="flex justify-between text-sm text-gray-700">
              <span>
                ({i + 1}) {user.name}
              </span>
              <span className="text-purple-600 font-medium">
                Streak: {user.streak}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No users registered yet.</p>
      )}
    </Popup>
  );
};

export default UsersPopup;
