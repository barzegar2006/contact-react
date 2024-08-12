import React from 'react'
import { Link } from 'react-router-dom'
import { PINK } from '../helpers/color'

import Spinner from './Spinner'
import Contact from './Contact'

const Contacts = ({ contacts, loading , confirmDelete }) => {
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <Link to="add" className='btn m-3 p-2 px-4' style={{ backgroundColor: PINK }}>
                <i className='fa fa-plus-circle'></i>
                {" "}
                ایجاد مخاطب
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid">
          <div className="row">

            {/* سی شامل تمامی اطلاعات مخاطبین است */}

            {
              loading ? (<Spinner />) : (

                contacts.length > 0 ? (contacts.map((c) => (
                  <Contact contact={c} key={c.id} confirmDelete = {()=>{confirmDelete (c.id , c.fullname)}} />
                ))) : (
                  <>
                    <h1>مخاطب یافت نشد</h1>
                  </>
                )

              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts