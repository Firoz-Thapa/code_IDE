import React, { useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import img from "../images/code.png";
import deleteImg from "../images/delete.png";
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const ListCard = ({ item }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const deleteProj = (id) => {
    fetch(`${api_base_url}/projects/deleteProject/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload(); // Reload page to see updated list
        } else {
          alert("Error deleting project: " + data.message);
          setIsDeleteModelShow(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again later.");
      });
  };

  return (
    <>
      <div 
        className="listCard mb-2 w-full flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]" 
        onClick={() => navigate(`/editor/${item._id}`)} // Navigate to the editor on card click
      >
        <div className='flex items-center gap-2'>
          <img className='w-[80px]' src={img} alt="" />
          <div>
            <h3 className='text-[20px]'>{item.title}</h3>
            <p className='text-[gray] text-[14px]'>
              Created in {item.date ? new Date(item.date).toDateString() : 'Unknown date'}
            </p>
          </div>
        </div>
        <div>
          <img 
            onClick={(e) => { 
              e.stopPropagation(); // Prevent navigating when clicking the delete button
              setIsDeleteModelShow(true); 
            }} 
            className='w-[30px] cursor-pointer mr-4' 
            src={deleteImg} 
            alt="Delete" 
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br /> this project?</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button 
                onClick={() => { deleteProj(item._id) }} 
                className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'
              >
                Delete
              </button>
              <button 
                onClick={() => { setIsDeleteModelShow(false) }} 
                className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// PropTypes validation
ListCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string // Make date optional, if not always available
  }).isRequired
};

export default ListCard;
