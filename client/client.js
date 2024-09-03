const axios = require('axios');

const baseURL = 'http://localhost:3000/buses';

// Agregar o actualizar un bus
const addOrUpdateBus = async (plate, arrivalTime) => {
    try {
        const response = await axios.post(baseURL, { plate, arrivalTime });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

// Obtener un bus
const getBus = async (plate) => {
    try {
        const response = await axios.get(`${baseURL}/${plate}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

// Eliminar un bus
const deleteBus = async (plate) => {
    try {
        const response = await axios.delete(`${baseURL}/${plate}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

// Ejemplos de uso
addOrUpdateBus('ABC123', '12:00');
getBus('ABC123');
deleteBus('ABC123');
