import { useState, type JSX } from "react";
import ListCard from "./ListCard";
import ListModule from "./ListModule";

function Board(): JSX.Element {
  const [list, setList] = useState([
    {
      id: 1,
      type: "To-do",
      cards: [
        { id: 101, title: "UI Design", description: "Must be responsive" },
      ],
    },
    {
      id: 2,
      type: "In-progress",
      cards: [
        { id: 201, title: "Home page design", description: "Contain images" },
      ],
    },
    {
      id: 3,
      type: "Done",
      cards: [
        { id: 301, title: "Install packages", description: "Check versions" },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const createList = (type: string) => {
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        cards: [],
      },
    ]);
  };

  const addCardToList = (
    listId: number,
    title: string,
    description: string
  ) => {
    setList((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              cards: [...l.cards, { id: Date.now(), title, description }],
            }
          : l
      )
    );
  };

  //don't froget to make this work
  const editCardList = () => {};

  //don't forget to make this work
  const deleteCardList = () => {};

  return (
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
        onCreate={createList}
      />

      <div className="flex flex-nowrap gap-4 overflow-x-scroll w-full px-4 py-2">
        {list.map((list) => (
          <ListCard
            key={list.id}
            id={list.id}
            type={list.type}
            cards={list.cards}
            onAddCard={addCardToList}
            onEditCard={editCardList}
            onDeleteCard={deleteCardList}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
