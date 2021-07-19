import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';

export const InfiniteScrollFunc = () => {
    const [goingUp, setGoingUp] = useState(false);
    const [page, setPage] = useState(0);
    const [start, setStart] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false)
    const prevScrollY = useRef(0);

    useEffect(() => {
        // setPage(0)
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: 'https://api.covid19india.org/data.json',
            params: { page: page },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData(res.data.statewise.slice(0, 5))
            setStart(start + 5)
            setHasMore(start < res.data.statewise.length)
            setLoading(false)
        })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('im canceled');
                }
                else {
                    console.log('im server response error');
                }
                setError(true)
            })

    }, []);

    useEffect(() => {
        // setPage(0)
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: 'https://api.covid19india.org/data.json',
            params: { page: page },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData([...data, ...res.data.statewise.slice(start, start + 5)]);
            // setData(res.data.statewise.slice(0, 5))
            setStart(start + 5)
            setHasMore(start < res.data.statewise.length)
            setLoading(false)
        })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('im canceled');
                }
                else {
                    console.log('im server response error');
                }
                setError(true)
            })

    }, [page]);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < currentScrollY && goingUp) {
                setGoingUp(false);
            }
            if (prevScrollY.current > currentScrollY && !goingUp) {
                setGoingUp(true);
            }
            const body = document.body;
            const docHeight = body.clientHeight;
            if ((window.innerHeight + window.pageYOffset >= docHeight - 50) && (!loading) && (hasMore)) {
                setPage(page + 1);
            }
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);

    return (
        <div>
            {
                data.map((elem, index) => {[]
                    return (
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
                    )
                })
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </div>
    )
}

