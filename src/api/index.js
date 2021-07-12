import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(`${url}/countries/${country}`);
        return { confirmed, recovered, deaths, lastUpdate }
    }
    catch (error) {
        console.log(error);
    }
};
