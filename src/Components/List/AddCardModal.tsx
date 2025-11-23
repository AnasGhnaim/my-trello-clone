import { useState, type JSX } from "react";

interface AddCardProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

function AddCardModal({
  open,
  onClose,
  onCreate,
}: AddCardProps): JSX.Element | null {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!title.trim() || !description.trim()) return;
    onCreate(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-2xl w-96 border border-blue-500">
      <h2 className="text-xl font-semibold mb-4">Add Card</h2>

      <input
        type="text"
        placeholder="Card Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-md mb-4"
      />

      <input
        type="text"
        placeholder="Card Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
    </div>
  );
}

export default AddCardModal;
