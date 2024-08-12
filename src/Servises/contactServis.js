import axios from "axios";
const SEVER_URL = "http://localhost:8000"

export const getAllcontacts = () => {
    const url = `${SEVER_URL}/contacts`
    return axios.get(url)
}
export const getcontact = (contactId) => {
    const url = `${SEVER_URL}/contacts/${contactId}`
    return axios.get(url)
}
export const getAllGroups = () => {
    const url = `${SEVER_URL}/groups`
    return axios.get(url)
}
export const getGroup = (groupId) => {
    const url = `${SEVER_URL}/groups/${groupId}`
    return axios.get(url)
}
// ورودی ان شامل نام و نام خانوادگی و .... میشود که فقط ابجکت
// ان را به عنوان کانتکت دریافت میکنیم
export const createContact =(contact)=>{
    const url = `${SEVER_URL}/contacts`
    return axios.post(url , contact)
}
export const updateContact =(contact , contactId)=>{
    const url = `${SEVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}
export const deleteContact =(contactId)=>{
    const url = `${SEVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}

