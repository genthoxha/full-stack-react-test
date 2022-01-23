import axios from "axios";

const fetchUsers = async () => {
  return await axios.get("http://localhost:3333/users");
};

const fetchRank = async () => {
  return await axios.get("http://localhost:3333/users");
};

export { fetchUsers, fetchRank };
