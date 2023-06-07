import React, { Component } from 'react'
import loading from './InfinityLoading.gif'
export default class InfinityLoading extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <img src={loading} alt="loading" style={{ width: "5%" }} />
            </div>
        )
    }
}