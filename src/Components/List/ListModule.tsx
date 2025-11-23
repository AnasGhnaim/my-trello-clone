import { useState, type JSX } from "react";
import { createPortal } from "react-dom";

interface ListModuleProps {
  open: boolean;
  onClose: () => void;
  onCreate: (type: string) => void;
}

function ListModule({
  open,
  onClose,
  onCreate,
}: ListModuleProps): JSX.Element | null {
  const [type, setType] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!type.trim()) return;
    onCreate(type);
    setType("");
    onClose();
  };

  return createPortal(
    <div className="fixed top-2/3 left-1/2 -translate-x-1/2  z-50 bg-white p-6 rounded-lg shadow-2xl w-96 border border-blue-500">
      <h2 className="text-xl font-semibold mb-4">Create New List</h2>

      <input
        type="text"
        placeholder="List Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-md mb-4"
      />

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
          Cancel
        </button>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default ListModule;
