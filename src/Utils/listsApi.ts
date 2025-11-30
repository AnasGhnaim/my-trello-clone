import api from "./axiosInstance";

//1-Get fetch the list. (done)
export const fetchLists = async (boardId: number) => {
  try {
    const res = await api.get(`/lists/${boardId}`);
    return res.data;
  } catch (error) {
    console.error("Can not fetch list data", error);
  }
};

//2-Post create new list. (done)
export const addNewList = async (board_id: number, type: string) => {
  try {
    const res = await api.post(`lists/${board_id}`, { type });
    return res.data;
  } catch (error) {
    console.error("Can not create a new list", error);
  }
};

//3-Delete list depend on listId. ()
export const deleteList = async (listId: number) => {
  try {
    const res = await api.delete(`/lists/${listId}`);
    return res.data;
  } catch (error) {
    console.error("Can not delete a list", error);
  }
};
