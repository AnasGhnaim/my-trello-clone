import { useState, type JSX } from "react";
import BoardCard from "./BoardCard";
import CreateBoardModal from "./CreateBoardModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBoards,
  deleteBoards,
  editBoards,
  fetchBoards,
} from "../../Utils/boardsApi";
import Spinner from "../Spinner";

function Boards(): JSX.Element {
  interface Board {
    id: string | number;
    title: string;
  }

  const queryClient = useQueryClient();

  //fetch boards data
  const {
    data: boards = [],
    isLoading,

    error,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  //create new board
  const createBoard = useMutation({
    mutationFn: (title: string) => createBoards(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setModalOpen(false);
    },
    onError: (error) => {
      console.error("failed to create board", error);
    },
  });

  //update board title
  const updateBoard = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      editBoards(id, title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
    onError: (error) => {
      console.error("unable to edit", error);
    },
  });

  const handleEdit = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const board = boards.find((b: any) => b.id === id);
    const newTitle = prompt("Edit board title", board.title);
    if (newTitle) {
      updateBoard.mutate({ id, title: newTitle });
    }
  };

  //Delete board
  const deleteBoard = useMutation({
    mutationFn: (id: number) => deleteBoards(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
    onError: (error) => {
      console.error("Unable to delete", error);
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this board?")) {
      deleteBoard.mutate(id);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-400">Failed to load boards</p>;

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
        onCreate={(title) => createBoard.mutate(title)}
      />

      {boards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
          {boards.map((board: Board) => (
            <BoardCard
              key={board.id}
              title={board.title}
              onEdit={() => handleEdit(Number(board.id))}
              onDelete={() => handleDelete(Number(board.id))}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-3xl text-white text-center">
          Enjoy your app by starting create boards
        </h3>
      )}
    </div>
  );
}

export default Boards;
