import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class Footer extends Component {
    render() {
        return (
            <>
                <nav className="navbar  navbar-expand-lg bg-body-tertiary  ">
                    <div className="container-fluid ">
                        <Link className="navbar-brand " to="/"> <strong>&copy;</strong> DailyNews - 2023 </Link>
                    </div>

                </nav>
            </>
        )
    }
}


export default Footer