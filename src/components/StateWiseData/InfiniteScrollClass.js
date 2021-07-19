import React, { Component } from 'react'
import axios from 'axios';

export class InfiniteScrollClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            loading: false,
            hasMore: true,
            start: 0,
            data: [],
        }
    }

    componentDidMount() {
        const { page, start, hasMore } = this.state;
        this.setState({ loading: true })
        axios.get(`https://api.covid19india.org/data.json?page=${page}`)
            .then(res => {
                this.setState({ data: res.data.statewise.slice(0, 5), start: start + 5, hasMore: start < res.data.statewise.length })
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
            })

        window.addEventListener('scroll', this.handleScroll)
    }



    handleScroll = () => {
        const { page, loading, hasMore } = this.state
        const body = document.body;
        const docHeight = body.clientHeight;
        //const ele = document.getElementsByClassName('card')[document.getElementsByClassName('card').length - 2]
        //docHt = ele.offsetTop+ele.offsetHeight
        if ((window.innerHeight + window.pageYOffset >= docHeight - 50) && (!loading) && (hasMore)) {
            this.setState({ page: page + 1 })
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.page != this.state.page) {
            const { page, start, data } = this.state;
            this.setState({ loading: true })
            axios.get(`https://api.covid19india.org/data.json?page=${page}`)
                .then(res => {
                    this.setState({ data: [...data, ...res.data.statewise.slice(start, start + 5)], start: start + 5, hasMore: start < res.data.statewise.length })
                    this.setState({ loading: false })
                    console.log(data)
                })
                .catch(err => {
                    this.setState({ loading: false })
                })
        }
    }

    render() {
        const { loading, data } = this.state;
        return (
            <div>
                {
                    data.map((elem, index) => {
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
            </div>
        )
    }
}