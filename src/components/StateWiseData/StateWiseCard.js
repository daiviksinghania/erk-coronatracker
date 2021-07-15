import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios';

export const StateWiseCard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false)
    // tracking on which page we currently are
    const [pageNumber, setPageNumber] = useState(1);
    // add loader refrence 
    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                console.log("Visible");
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if(node) observer.current.observe(node)
        console.log(node)
    },[loading, hasMore])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: 'https://api.covid19india.org/data.json',
            params:{page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setData(response.data.statewise)
            setHasMore(response.data.statewise.length > 0)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber]);

    return (
        <div>
            {
            data.map((elem, index) => {
                if(data.length === index + 1){
                    return(
                        <div>
                            <div className="card" key={index} ref={lastElementRef}>
                                <h5 className="card-header">{elem.state}</h5>
                                <div className="card-body">
                                    <p className="card-text"><b>Confirmed : </b>{elem.confirmed}</p>
                                    <p className="card-text"><b>Recovered : </b>{elem.recovered}</p>
                                    <p className="card-text"><b>Deaths : </b>{elem.deaths}</p>
                                    <p className="card-text"><b>Active : </b>{elem.active}</p>
                                    <p className="card-text"><b>Updated At : </b>{elem.lastupdatedtime}</p>
                                </div>
                            </div>
                        </div>
                    )

                }else{
                    return(
                        <div>
                            <div className="card" key={index}>
                                <h5 className="card-header">{elem.state}</h5>
                                <div className="card-body">
                                    <p className="card-text"><b>Confirmed : </b>{elem.confirmed}</p>
                                    <p className="card-text"><b>Recovered : </b>{elem.recovered}</p>
                                    <p className="card-text"><b>Deaths : </b>{elem.deaths}</p>
                                    <p className="card-text"><b>Active : </b>{elem.active}</p>
                                    <p className="card-text"><b>Updated At : </b>{elem.lastupdatedtime}</p>
                                </div>
                            </div>
                        
                        </div>
                    )

                }

            })
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
            </div>
    )
}
