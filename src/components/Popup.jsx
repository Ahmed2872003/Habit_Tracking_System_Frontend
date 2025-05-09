import Overlay from "./Overlay.jsx";

export default function Popup({
  showPopup,
  setShowPopup,
  title,
  closeLable = true,
  closeWhenClickout = false,
  children,
}) {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg min-w-xl max-w-3xl shadow-lg">
        {closeLable && (
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-0 right-0 py-1 px-3 text-lg font-bold text-black bg-transparent rounded-tr-lg hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            ✕
          </button>
        )}
        <h3 className="text-xl font-semibold text-purple-700 mb-3">{title}</h3>
        <div>
          <Overlay
            className="z-[-1]"
            onClick={() => closeWhenClickout && setShowPopup(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
