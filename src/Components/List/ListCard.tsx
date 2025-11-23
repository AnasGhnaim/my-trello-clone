import { useState, type JSX } from "react";
import AddCardModal from "./AddCardModal";
import CardItem from "./CardItem";

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
  onEditCard?: (listId: number, cardId: number) => void;
  onDeleteCard?: (listId: number, cardId: number) => void;
}

function ListCard({
  id,
  type,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: ListCardProps): JSX.Element {
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
          <CardItem
            key={card.id}
            card={card}
            onEdit={(cardId) => onEditCard?.(id, cardId)}
            onDelete={(cardId) => onDeleteCard?.(id, cardId)}
          />
        ))}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-900"
      >
        Add Card +
      </button>

      <AddCardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateCard}
      />
    </div>
  );
}

export default ListCard;
