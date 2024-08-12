import React from 'react'

import { CURRENTLINE, PURPLE } from '../helpers/color'
import Spinner from './Spinner'

const AddContact = ({ groups, loading, contacts, setContactInfo, createContactForm }) => {

  return (
    <>
      {
        loading ? (<Spinner />) : (
          <div className="container">
            <div className="grid">
              <div className="row justify-content-around align-items-center m-5 pt-5 mt-5">
                <div className="col-4">

                  <form onSubmit={createContactForm}>
                    <div>
                      <input type="text"
                        name='fullname'
                        value={contacts.fullname}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='نام و نام خانوادگی' />
                    </div>

                    <div>
                      <input type="text"
                        name='photo'
                        value={contacts.photo}
                        onChange={setContactInfo}
                        className='mb-2 py-1 px-5'
                        placeholder='آدرس تصویر' />
                    </div>

                    <div>
                      <input type="text"
                        name='mobile'
                        value={contacts.mobile}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='شماره موبایل' />
                    </div>

                    <div>
                      <input type="text"
                        name='email'
                        value={contacts.email}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='آدرس ایمیل' />
                    </div>

                    <div>
                      <input type="text"
                        name='job'
                        value={contacts.job}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='شغل' />
                    </div>
                    <select
                      name='group'
                      value={contacts.group}
                      onChange={setContactInfo}
                      required={true}
                      className='mb-2 py-1'
                      style={{ width: "17.6rem" }}>
                      <option value="">انتخاب گروه</option>
                      {groups && groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))
                      }
                    </select>
                    <button type="submit" className='btn' style={{ backgroundColor: PURPLE }}>ساخت مخاطب</button>
                    <button className='btn mx-2 text-light' style={{ backgroundColor: CURRENTLINE }}>انصراف</button>
                  </form>
                </div>
                <div className="col-4">
                  <img src="https://placehold.co/300" alt="" />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AddContact
