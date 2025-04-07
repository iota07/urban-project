import React from "react";
import TitleH2 from "./TitleH2";

const DeleteModal = ({
  showModal,
  setShowModal,
  confirmDelete,
  setConfirmDelete,
  handleDelete,
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between">
              <TitleH2 title="Delete Account" />
              <button
                className="py-2 w-fit px-8 mb-2 rounded-lg bg-primary text-white md:text-2xl xl:my-8 transition-all duration-300 hover:bg-tertiary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
            <p className="border-t-2 text-lg xl:text-xl">
              Deleting your account will remove all your information from our
              database. This cannot be undone.
            </p>
            <p className="text-secondary mt-8 text-lg xl:text-xl">
              Please confirm this, type "DELETE"
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className={`py-2 w-fit px-8 my-2 rounded-lg transition-all duration-300 ${
                  confirmDelete !== "DELETE"
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-white text-danger border border-danger hover:bg-danger hover:text-white"
                }`}
                disabled={confirmDelete !== "DELETE"}
                onClick={handleDelete}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
