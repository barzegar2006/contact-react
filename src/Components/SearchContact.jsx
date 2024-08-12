import React from 'react'

import { PURPLE , CURRENTLINE } from '../helpers/color'

const SearchContacts = ({query , search}) => {
  return (

    <div className='input-group' dir='ltr'>

      <span
      className='input-group-text' 
      style={{border:"none"}}>
      <i className='fa fa-search' style={{color:PURPLE}}></i>
      </span>

        <input type="text" 
        value={query.text}
        onChange={search}
        dir='rtl' 
        className='rounded p-1 text-light' 
        placeholder='جستوجوی مخاطب' 
        style={{background:CURRENTLINE , outline:"none", border:"none" , lineHeight:"30px"}}/>
        
    </div>
  )
}

export default SearchContacts
