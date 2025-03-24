import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAllUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const registerUser = async (newUser) => {
    const response = await axios.post(baseUrl, newUser);
    return response.data;
}

export default { getAllUsers, registerUser };