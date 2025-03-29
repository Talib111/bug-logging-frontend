import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const Confirm = (
  title: string,
  message: string,
  onConfirm: () => void
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div>
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="bg-white dark:bg-gray-700 py-4 px-12 shadow-lg rounded-md z-10 relative">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm">{message}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-md"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-1 rounded-md ml-2"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      );
    }
  });
};