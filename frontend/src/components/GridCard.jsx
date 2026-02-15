import { useState } from 'react'
import PropTypes from 'prop-types';
import deleteImg from "../images/delete.png"
import codeImg from "../images/code.png" 
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const GridCard = ({item}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

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
      <div className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
       <div onClick={()=>{navigate(`/editor/${item._id}`)}}>
        <img className="w-[90px]" src={codeImg} alt="" />
        <h3 className='text-[20px] text-white font-medium w-[90%] line-clamp-1'>{item.title}</h3>
       </div>
        <div className='flex items-center justify-between'>
          <p className='text-[14px] text-[#9CA3AF]'>Created in {new Date(item.date).toDateString()}</p>
          <img onClick={(e)=>{
            e.stopPropagation(); 
            setIsDeleteModelShow(true);
          }} className='w-[30px] cursor-pointer' src={deleteImg} alt="" />
        </div>
      </div>

      {
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl text-white'>Do you want to delete <br />
              this project?</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button onClick={()=>{ deleteProj(item._id) }} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={()=>{setIsDeleteModelShow(false)}} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

// PropTypes validation
GridCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

export default GridCard