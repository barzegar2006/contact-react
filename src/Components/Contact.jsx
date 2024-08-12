import React from 'react'

import { CURRENTLINE, CYAN, RED, YELLOW } from '../helpers/color'
import { Link } from 'react-router-dom'


//  از تمامی اطلاعات کاربر اونایی که نام برده شد را نشان میدهد
const Contact = ({contact , confirmDelete}) => {
    return (
        <>
            <div className="col-md-6 card mt-5" style={{ backgroundColor: CURRENTLINE }}>
                <div className="card-body ">
                    <div className="row align-items-center justify-content-around">
                        <div className="col-md-3">
                            <img src={contact.photo || "https://placehold.co/150"} alt="" style={{width:"150px" , height:"150px"}}/>
                        </div>
                        <div className="col-md-6 p-2">

                            <div className="list-group my-1">
                                <div className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی :
                                    <span className='fw-bold'> {contact.fullname} </span>
                                </div>
                            </div>

                            <div className="list-group my-1">
                                <div className="list-group-item list-group-item-dark">
                                    شماره تلفن :
                                    <span className='fw-bold'>{contact.mobile}</span>
                                </div>
                            </div>

                            <div className="list-group my-1">
                                <div className="list-group-item list-group-item-dark">
                                    ایمیل:
                                    <span className='fw-bold'>{contact.email}</span>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1 ">
                            <Link to={contact.id} className='btn my-1' style={{ backgroundColor: YELLOW }}><i className='fa fa-eye'></i></Link>
                            <Link to={`edit/${contact.id}`} className='btn my-1' style={{ backgroundColor: CYAN }}><i className='fa fa-pencil'></i></Link>
                            <button className='btn my-1' onClick={confirmDelete} style={{ backgroundColor: RED }}><i className='fa fa-trash'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
