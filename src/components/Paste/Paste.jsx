import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../../redux/pasteSlice';
import toast from 'react-hot-toast';
import './Paste.css';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
      (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
      dispatch(removeFromPastes(pasteId));
    }
  return (
    <div className='container'>
      <input 
        className='searchBar'
        type="search"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="cards">
          {
            filteredData.length > 0 && 
            filteredData.map((paste) => {
              return(
                <div className='card'>
                  <div className='cardTitle'>
                    <h3>{paste.title}</h3>
                  </div>
                  <div className='cardContent'>
                    {paste.content}
                  </div>
                  <div className='curdOperations'>
                    <button className='operation'>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button className='operation'>
                      <a href={`/pastes/${paste?._id}`}> 
                        View
                      </a>
                    </button>
                    <button className='operation' onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button className='operation' onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied To ClipBoard");
                     } }>
                      Copy
                    </button>
                    <button className='operation' onClick={() => {
                      navigator.clipboard.writeText(paste?.title);
                      toast.success("Shared");
                    }}>
                      Share
                    </button>


                  </div>
                  <div className='time'>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
          }
        </div>
    </div>
  )
}

export default Paste
