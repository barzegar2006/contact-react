import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { BACKGROUND, CURRENTLINE, CYAN } from '../helpers/color'
import { getcontact , getGroup } from '../Servises/contactServis'

import Spinner from './Spinner'

const ViewContact = () => {
const navigate = useNavigate()

  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {}
  })
  const { contactId } = useParams()

  useEffect(() => {
    const fetcgData = async () => {
      try {
        setState({ ...state, loading: true })
        const { data: contactData } = await getcontact(contactId)
        const { data: groupData } = await getGroup(contactData.group)
        // update contacts
        setState({ ...state, loading: false, contact: contactData, group: groupData })
      } catch (err) {
        console.log(err.message)
        setState({ ...state, loading: false })
      }
    }
    fetcgData()
  }, [])

  // کانتکت شامل اطلاعات کاربر 
  const { contact, loading, group } = state

  return (
    <>
      <div>
        <h3 className='text-center p-3' style={{ color: CYAN }}>
          اطلاعات مخاطب
        </h3>
      </div>
      {
        loading ? (<Spinner />) : (
          <div className="col-12 card mt-5" style={{ backgroundColor: BACKGROUND }}>
            <div className="card-body ">
              <div className="row align-items-center justify-content-around">
                <div className="col-md-3">
                  <img src={contact.photo || "https://placehold.co/150"} alt="" />
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
                      <span className='fw-bold'> {contact.mobile} </span>
                    </div>
                  </div>

                  <div className="list-group my-1">
                    <div className="list-group-item list-group-item-dark">
                      ایمیل:
                      <span className='fw-bold'> {contact.email} </span>
                    </div>
                  </div>

                  <div className="list-group my-1">
                    <div className="list-group-item list-group-item-dark">
                      شغل :
                      <span className='fw-bold'> {contact.job} </span>
                    </div>
                  </div>

                  <div className="list-group my-1">
                    <div className="list-group-item list-group-item-dark">
                      گروه :
                      <span className='fw-bold'> {group.name} </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
                  <div className="my-1 text-center">
                    <div>
                      <Link to="/contacts" className='text-light btn my-5' style={{backgroundColor: CURRENTLINE}}> بازگشت به صفحه اصلی </Link>
                    </div>
                  </div>
          </div>
        )
      }
    </>
  )
}

export default ViewContact
