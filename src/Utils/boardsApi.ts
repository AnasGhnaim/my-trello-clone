import api from "./axiosInstance";

//1-Get boards. (done)
export const fetchBoards = async () => {
  try {
    const res = await api.get("/boards");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch data from boards:", error);
  }
};

//2-Post create new boards. (done)
export const createBoards = async (title: string) => {
  try {
    const res = await api.post("/boards", { title });
    return res.data;
  } catch (error) {
    console.error("Not being able to create board", error);
  }
};

//3-Put edit the board title. (done)
export const editBoards = async (id: number, title: string) => {
  try {
    const res = await api.put(`/boards/${id}`, { title });
    return res.data;
  } catch (error) {
    console.error("Not being able to edit board title", error);
  }
};

//4-Delete delete board. ()
export const deleteBoards = async (id: number) => {
  try {
    const res = await api.delete(`/boards/${id}`);
    return res.data;
  } catch (error) {
    console.error("Can not delete board", error);
  }
};
