import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import {CURRENTLINE, CYAN , PURPLE } from '../helpers/color'
import { getcontact , getAllGroups, updateContact } from '../Servises/contactServis'

import Spinner from './Spinner'

const EditContact = ({forceRender , setForceRender}) => {
  const { contactId } = useParams()
  const navigate = useNavigate()

  
  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname : "",
      photo :"",
      mobile :"",
      email :"",
      job:"" , 
      group :"",
    },
    groups: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true })
        const { data: contactData } = await getcontact(contactId)
        const { data: groupsData } = await getAllGroups()

        // update contacts
        setState({
        ...state,
        loading: false,
        contact: contactData, 
        groups: groupsData,
      })

      } catch (err) {
        console.log(err.message)
        setState({ ...state, loading: false })
      }
    }
    fetchData()
  }, [])

  const setContactInfo =(event)=>{
    setState({
      ...state,
      contact :{
        ...state.contact,
        [event.target.name] : event.target.value,
      },
    })
  }

  const submitForm = async (event) =>{
    event.preventDefault();
    try{
      setState({...state , loading : true})
      const {data} = await updateContact(state.contact , contactId)
      setState({...state , loading : false})

      if(data){
        setForceRender (!forceRender)
        navigate("/contacts")
      }
    }catch(err){
      console.log(err.message)
    }
  }


 

  // کانتکت شامل اطلاعات کاربر 
  const { contact, loading, groups } = state

  return (
    <>
      <div>
        <h3 className='text-center p-3' style={{ color: CYAN }}>
          ویرایش مخاطب
        </h3>
      </div>
      {
        loading ? (<Spinner />) : (
          <div className="container">
            <div className="grid">
              <div className="row justify-content-around align-items-center m-5 pt-5 mt-5">
                <div className="col-4">

                  <form onSubmit={submitForm}>
                    <div>
                      <input type="text"
                        name='fullname'
                        value={contact.fullname}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='نام و نام خانوادگی' />
                    </div>

                    <div>
                      <input type="text"
                        name='photo'
                        value={contact.photo || "https://placehold.co/150"}
                        onChange={setContactInfo}
                        className='mb-2 py-1 px-5'
                        placeholder='آدرس تصویر' />
                    </div>

                    <div>
                      <input type="text"
                        name='mobile'
                        value={contact.mobile}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='شماره موبایل' />
                    </div>

                    <div>
                      <input type="text"
                        name='email'
                        value={contact.email}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='آدرس ایمیل' />
                    </div>

                    <div>
                      <input type="text"
                        name='job'
                        value={contact.job}
                        onChange={setContactInfo}
                        required={true}
                        className='mb-2 py-1 px-5'
                        placeholder='شغل' />
                    </div>
                    <select
                      name='group'
                      value={contact.group}
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
                    <input type="submit" className='btn' style={{ backgroundColor: PURPLE }} value={"ویرایش مخاطب"}/>
                    <Link to="/contacts" className='btn mx-2 text-light' style={{ backgroundColor: CURRENTLINE }}>انصراف</Link>
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

export default EditContact
