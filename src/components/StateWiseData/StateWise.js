import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './statewise.css'

const StateWise = () => {
    const [data, setData] = useState([]);
    const getCovidData = async () => {
        const response = await axios.get('https://api.covid19india.org/data.json');
       setData(response.data.statewise);

    }

    useEffect(() => {
        getCovidData();
    }, []);

    return (
        <div>
            <div className="main-heading">
                <h1 className="mb-5 text-center">Statewise <span className="font-weight-bold">Listview</span></h1>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>State</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Active</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((elem, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{elem.state}</td>
                                        <td>{elem.confirmed}</td>
                                        <td>{elem.recovered}</td>
                                        <td>{elem.deaths}</td>
                                        <td>{elem.active}</td>
                                        <td>{elem.lastupdatedtime}</td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StateWise
