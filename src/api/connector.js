import axios from "axios";

// const BASE_URL = 'https://sig-server.herokuapp.com'
const BASE_URL = 'http://localhost:8081'


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});



export const getVehicles = async () => {

    return axios.get(`${BASE_URL}/items`)
        .then(res => res.data)
        .catch(e => [])
}

export const getVehicle = async (id) => {

    return axios.get(`${BASE_URL}/items/${id}`)
        .then(res => res.data)
        .catch(e => [])
}


export const getProcess = async (id) => {

    return axios.get(`${BASE_URL}/processes/${id}`)
        .then(res => res.data)
        .catch(e => [])
}

export const saveVehicle = async (vehicle) => {


    return axios.post(`${BASE_URL}/items`,vehicle)
        .then(res => res.data)
        .catch(e => [])
}

export const saveNewProcess = async (vehicle) => {


    return axios.post(`${BASE_URL}/processes`,{itemId: vehicle.id})
        .then(res => res.data)
        .catch(e => [])

}

export const  getStepToVerify = async (vehicleId) => {
    return axios.get(`${BASE_URL}/items/${vehicleId}/nextStep`)
        .then(res => res.data)
        .catch(e => [])
}

export const  verifyStep = async (vehicleId,step,form) => {
    return axios.post(`${BASE_URL}/items/${vehicleId}/verify`, {stepId: step.id,fields: form})
        .then(res => res.data)
        .catch(e => [])
}