/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type JSX } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddCardModal from "./AddCardModal";
import CardItem from "./CardItem";
import {
  createNewCard,
  removeCard,
  fetchCards,
  updateCard,
} from "../../Utils/cardsApi";
import Spinner from "../Spinner";

interface Card {
  id: number;
  title: string;
  description: string;
}

interface ListCardProps {
  id: number;
  type: string;
  cards: Card[];
}

export default function ListCard({ id, type }: ListCardProps): JSX.Element {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch Cards
  const {
    data: cards = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cards", id],
    queryFn: () => fetchCards(id),
  });

  // Create new card
  const createCard = useMutation({
    mutationFn: createNewCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", id] });
      setModalOpen(false);
    },
    onError: (error: any) => console.error("Cannot create card", error),
  });

  // Update card
  const editCard = useMutation({
    mutationFn: updateCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards", id] }),
    onError: (error: any) => console.error("Cannot update card", error),
  });

  const handleEditCard = (
    cardId: number,
    title: string,
    description: string
  ) => {
    editCard.mutate({ cardId, title, description });
  };

  // Delete card
  const deleteCard = useMutation({
    mutationFn: removeCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards", id] }),
    onError: (error: any) => console.error("Cannot delete card", error),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-400">Failed to fetch cards</p>;

  return (
    <div className="bg-white p-5 w-64 rounded-lg shadow-lg flex flex-col">
      <h1 className="text-center text-2xl text-white bg-blue-900 p-2 rounded">
        {type}
      </h1>

      <div className="mt-3">
        {cards.map((card: Card) => (
          <CardItem
            key={card.id}
            card={card}
            onEdit={handleEditCard}
            onDelete={(cardId) => deleteCard.mutate(cardId)}
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
        onCreate={(title, description) =>
          createCard.mutate({ listId: id, title, description })
        }
      />
    </div>
  );
}
