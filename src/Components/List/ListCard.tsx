import { useState, type JSX } from "react";
import AddCardModule from "./AddCardModule";

interface Card {
  id: number;
  title: string;
  description: string;
}

interface ListCardProps {
  id: number;
  type: string;
  cards: Card[];
  onAddCard: (listId: number, title: string, description: string) => void;
}

function ListCard({ id, type, cards, onAddCard }: ListCardProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateCard = (title: string, description: string) => {
    onAddCard(id, title, description);
  };

  return (
    <div className="bg-white p-5 w-64 rounded-lg shadow-lg flex flex-col">
      <h1 className="text-center text-2xl text-white bg-blue-900 p-2 rounded">
        {type}
      </h1>

      <div className="mt-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border p-3 my-2 rounded bg-gray-100 shadow-sm"
          >
            {/* Top-right icons container */}
            <div className="flex justify-end gap-3 mb-1">
              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.32 20.333a4.5 4.5 0 01-1.897 1.13l-3.077.77.77-3.077a4.5 4.5 0 011.13-1.897L16.862 4.487z"
                />
              </svg>

              {/* Delete Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3 w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>

            {/* Card content */}
            <h3 className="text-lg font-bold">{card.title}</h3>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-900"
      >
        Add Card +
      </button>

      <AddCardModule
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateCard}
      />
    </div>
  );
}

export default ListCard;
