import { useState, type JSX } from "react";
import BoardCard from "./BoardCard";
import CreateBoardModal from "./CreateBoardModal";

function Boards(): JSX.Element {
  const [boards, setBoards] = useState([
    { id: 1, title: "Project A" },
    { id: 2, title: "Marketing" },
    { id: 3, title: "Personal Tasks" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const createBoard = (title: string) => {
    setBoards((prev) => [...prev, { id: Date.now(), title }]);
  };

  return (
    <div className="w-full bg-gray-700 flex flex-col py-10 items-center min-h-screen">
      <h3 className="text-3xl text-white mb-6">Your Workspace</h3>

      {/* Create Board Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-5 py-2 rounded mb-6 hover:bg-blue-600"
      >
        + Create Board
      </button>

      {/* Modal */}
      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createBoard}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
        {boards.map((board) => (
          <BoardCard key={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
}

export default Boards;
