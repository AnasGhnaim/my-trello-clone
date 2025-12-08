/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type JSX } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import List from "./List";
import ListModule from "./ListModule";
import { addNewList, deleteList, fetchLists } from "../../Utils/listsApi";
import Spinner from "../Spinner";
import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  //arrayMove,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { updateCard } from "../../Utils/cardsApi";
function Board(): JSX.Element {
  const { boardId } = useParams<{ boardId: string }>();
  const numericBoardId = Number(boardId);

  //fetch lists
  const queryClient = useQueryClient();
  const {
    data: lists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lists", numericBoardId],
    queryFn: () => fetchLists(numericBoardId),
  });

  //add new list
  const createList = useMutation({
    mutationFn: ({ boardId, type }: { boardId: number; type: string }) =>
      addNewList(boardId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", numericBoardId] });
      setModalOpen(false);
    },
    onError: (error) => {
      console.error("failed to create list", error);
    },
  });

  //Delete list
  const deleteLists = useMutation({
    mutationFn: (listId: number) => deleteList(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", numericBoardId] });
    },
    onError: (error) => {
      console.error("can not delete the list", error);
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this list?")) {
      deleteLists.mutate(id);
    }
  };

  const updateCardMutation = useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => console.error("Failed to move card", err),
  });

  const [modalOpen, setModalOpen] = useState(false);

  //Start the drag and drop logicccc

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const cardId = +active.id;
    const newlistId = +over.id;

    const oldList = lists.find((list: any) => {
      const cards = queryClient.getQueryData(["cards", list.id]) || [];
      return cards.some((c: any) => c.id === cardId);
    });

    if (!oldList || oldList.id === newlistId) return;

    updateCardMutation.mutate({
      cardId,
      listId: newlistId,
    });
  }

  if (!numericBoardId) return <p>Invalid board ID</p>;
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-400">Failed to fetch lists</p>;

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="w-full bg-gray-700 flex flex-col py-10 items-center min-h-screen">
        <h3 className="text-3xl text-white mb-6">Board Title</h3>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-5 py-2 rounded mb-6 hover:bg-blue-900"
        >
          + Add New List
        </button>

        <ListModule
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={(type) =>
            createList.mutate({ boardId: numericBoardId, type })
          }
        />
        <SortableContext
          items={lists.map((l: any) => l.id)}
          strategy={rectSwappingStrategy}
        >
          {lists.length > 0 ? (
            <div className="flex flex-nowrap gap-4 overflow-x-scroll w-full px-4 py-2 z-50">
              {lists.map((list: any) => (
                <div key={list.id} className="relative">
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="absolute top-2 right-2 z-10 text-red-400 hover:text-red-600 font-bold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>

                  <List
                    id={list.id}
                    type={list.type}
                    cards={list.cards || []}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-3xl text-white text-center">
              Add list to divide your work into tasks
            </h3>
          )}
        </SortableContext>
      </div>
    </DndContext>
  );
}

export default Board;
