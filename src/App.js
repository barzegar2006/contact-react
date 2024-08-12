import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import Contacts from './Components/Contacts'
import Navbar from './Components/Navbar'
import AddContact from "./Components/AddContact"
import EditContact from "./Components/EditContact"
import ViewContact from "./Components/ViewContact"

import { createContact, deleteContact, getAllcontacts, getAllGroups } from './Servises/contactServis'
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/color'

const App = () => {

  const navigate = useNavigate()
  const [getContacts, setContacts] = useState([""])
  const [loading, setLoading] = useState(false)
  const [getGroups, setGroups] = useState([])
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: ""
  })
  const [forceRender, setForceRender] = useState(false)
  const [query, setQuery] = useState({ text: "" })
  const [getFiltredContacts , setFiltredContacts] = useState([])



  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true)
        const { data: contactData } = await getAllcontacts()
        setFiltredContacts(contactData)
        const { data: groupsData } = await getAllGroups()
        setContacts(contactData)
        setGroups(groupsData)
        setLoading(false)

      } catch (err) {
        console.log(err.messages)
      }
    }
    fetchData()
  }, [])

  // اجبار به رندر صفحه
  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true)
        const { data: contactsData } = await getAllcontacts()
        const { data: groupsData } = await getAllGroups()
        // استیت هایی که تعریف شد برای گروه ها و مخاطبین رو اپدیت میکنیم با نام جدید دیتا
        setContacts(contactsData)
        setFiltredContacts(contactsData)
        setGroups(groupsData)
        setLoading(false)

      } catch (err) {
        console.log(err.messages)
      }
    }
    fetchData()
  }, [forceRender])

  const createContactForm = async (event) => {
    event.preventDefault()
    try {
      const { status } = await createContact(getContact)
      if (status === 201) {
        setContact({})
        navigate("/contacts")
        setForceRender(!forceRender)
      }
    } catch (err) {
      console.log(err.messages)
    }
  }

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    })
  }

  const confirm = async (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div style={{
            backgroundColor: CURRENTLINE,
            border: `1px solid ${PURPLE}`,
            borderRadius: "1em",
            padding: "2rem"
          }}>
            <h2 style={{ color: YELLOW }}>حذف مخاطب</h2>
            <p style={{ color: FOREGROUND }}>آیا از حذف {contactFullname} اطمینان دارید؟</p>
            <button className='btn btn-outline-danger' onClick={() => {
              removeContact(contactId)
              onClose()
            }}>بله اطمینان دارم</button>
            <button className='btn btn-outline-info mx-3' onClick={onClose}>انصراف</button>
          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {
    try {
      setLoading(true)
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllcontacts();
        setContacts(contactsData)
        setFiltredContacts(contactsData)
        setLoading(false)
      }
    } catch (err) {
      console.log(err.messages)
      setLoading(false)
    }
  }

  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value })
    const Allcontacts = getContacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFiltredContacts(Allcontacts)
  }

  return (
    <div>
      <Navbar query={query} search={contactSearch} />
      <Routes>
        {/* / یعنی ادرس خودش همان اول */}
        <Route path='/' element={<Navigate to="/contacts" />} />

        <Route path='/contacts'
          element={<Contacts contacts={getFiltredContacts} loading={loading} confirmDelete={confirm} />} />

        <Route path='/contacts/add'
          element={<AddContact groups={getGroups}
            loading={loading} setContactInfo={setContactInfo}
            contacts={getContact} createContactForm={createContactForm}
          />} />

        <Route path='/contacts/edit/:contactId'
          element={<EditContact groups={getGroups}
            forceRender={forceRender}
            setForceRender={setForceRender} />} />

        <Route path='/contacts/:contactId'
          element={<ViewContact />} />

      </Routes>
    </div>
  )
}

export default App
