import api from "../Utils/axiosInstance";

//1-Get Fetch cards.(done)
export const fetchCards = async (listId: number) => {
  try {
    const res = await api.get(`/cards/${listId}`);
    return res.data;
  } catch (error) {
    console.error("Can not fetch Card", error);
  }
};

//2-Post create a new card depend on list id. (done)
export const createNewCard = async ({
  listId,
  title,
  description,
}: {
  listId: number;
  title: string;
  description: string;
}) => {
  try {
    const res = await api.post(`/cards/${listId}`, { title, description });
    return res.data;
  } catch (error) {
    console.error("Can not create Card", error);
  }
};

//3-Update card depend on cardId. (done)
export const updateCard = async ({
  cardId,
  title,
  description,
  listId,
}: {
  cardId: number;
  title?: string;
  description?: string;
  listId?: number;
}) => {
  try {
    const res = await api.put(`/cards/${cardId}`, {
      title,
      description,
      listId,
    });
    return res.data;
  } catch (error) {
    console.error("Can not update Card", error);
  }
};

//4-Delete card depend on cardId. (done)
export const removeCard = async (cardId: number) => {
  try {
    const res = await api.delete(`/cards/${cardId}`);
    return res.data;
  } catch (error) {
    console.error("Can not delete the Card", error);
  }
};
