const DeleteConfirmModal = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete this event?
        </h3>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
