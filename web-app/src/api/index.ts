import axios from "axios";

const fetchUsers = async () => {
  return await axios.get("http://localhost:3333/users");
};

const fetchRank = async () => {
  return await axios.get("http://localhost:3333/users");
};

const calculateUserDistances = async () => {
  return await axios.get("http://localhost:3333/user-distances/calculate-distances");
};

const addCheckpoints = async () => {
  return await axios.get("http://localhost:3333/user-checkpoints/add-checkpoint-to-users");
};

export { fetchUsers, fetchRank, addCheckpoints, calculateUserDistances };
