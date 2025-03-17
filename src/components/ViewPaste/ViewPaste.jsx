import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import './ViewPaste.css'

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div className='container'>
      <input
        className='title' 
        type="text"
        placeholder='Enter title here'
        value={paste.title} 
        disabled
        onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste} className='flex flex-col gap-7'>
            {pasteId ? "Update Paste" : "Create My Paste"}
        </button> */}
        <div>
          <textarea 
            className="content"
            value={paste.content}
            placeholder='enter content here'
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows={20} 
            ></textarea>
        </div>
    </div>
  )
}

export default ViewPaste
