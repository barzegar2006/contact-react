import React from 'react'
import { useLocation } from 'react-router-dom'

import { BACKGROUND, PURPLE } from '../helpers/color'

import SearchContacts from './SearchContact'

const Navbar = ({ query, search }) => {
    const location = useLocation()
    return (
        <React.Fragment>
            <nav className='navbar navbar-dark shadow-lg' style={{ background: BACKGROUND }}>
                <div className="container">
                    <div className="row w-100">
                        <div className="col">
                            <div className="navbar-brand">
                                <i className='fa fa-id-badge' style={{ color: PURPLE }}></i>
                                {" "}
                                اپلیکیشن مدیریت <span style={{ color: PURPLE }}>مخاطبین</span>
                            </div>

                        </div>
                        {
                            location.pathname === "/contacts" ? (
                                <div className="col">
                                    <SearchContacts query={query} search={search} />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar
