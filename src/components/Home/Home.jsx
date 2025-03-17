import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css'

const Home = () => {
    const dispatch = useDispatch();
    const [title,setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
      const paste = {
        title: title,
        content: value,
        _id: pasteId ||
                    Date.now().toString(36),
                  createdAt: new Date().toISOString(),       
    }

    if(pasteId){
      // update
      dispatch(updateToPastes(paste));
    }else{
      // create
      dispatch(addToPastes(paste));
    }

    //  after creation and updation
    setSearchParams({});
    setTitle("");
    setValue("");
  }

  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId])
  return (
    <div className='container'>
      <h1>Create Your Paste</h1>
      <input
        className='title' 
        type="text"
        placeholder='Enter title here'
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        />
       
        <div>
          <textarea 
            className='content'
            value={value}
            placeholder='enter content here'
            onChange={(e) => setValue(e.target.value)}
            rows={20} 
            ></textarea>
        </div>
        <button onClick={createPaste} className='button'>
            {pasteId ? "Update Paste" : "Create"}
        </button>
    </div>
  )
}

export default Home
