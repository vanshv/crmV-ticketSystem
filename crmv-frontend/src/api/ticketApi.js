import axios from "axios";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3001/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbnNodmZpbmFsQGdtYWlsLmNvbSIsImlhdCI6MTcwMjM2NzgzMywiZXhwIjoxNzAyNDU0MjMzfQ.lrSNP7a4XF0-jeMJCYpxgmYrkfvmTRBkBq8-Bj2DHJ4",
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};