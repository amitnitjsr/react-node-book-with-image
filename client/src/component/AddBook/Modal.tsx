import { useState } from "react";
import Axios from 'axios';
import "./index.css";

export interface ModalProps{
  toggleModal: () => void,
  getData: () => void,
  modal: boolean,
}

export default function Modal(props: ModalProps) {

  const initialFields = {
    name: "",
    description: "",
    price: "",
    discount: "",
    file: ""
  };

 const [fields, setFields] = useState(initialFields);

 const handleChange = (e) => {
  
  if(e.target?.name === 'file'){
    setFields({...fields, file: e.target?.files[0]});
  }
  else{
    setFields({...fields, [e.target.name]: e.target.value})
  }
 }

 const handleUpload = (e)=>{
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', fields.file);
  formData.append('name', fields.name);
  formData.append('description', fields.description);
  formData.append('price', fields.price);
  formData.append('discount', fields.discount);
  
  Axios.post('http://localhost:3001/upload',formData)
  .then(()=>{
    props.getData();
    props.toggleModal();
  })
  .catch((error)=>{
    console.log(error);
  });

 }

  const toggleModal = () => {
    props.toggleModal();
  };

  if(props.modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      {props.modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div class='font-semibold mb-3'>Add Book</div>
            <div class="grid gap-4 grid-cols-2">
              <div><input className="input" type='text' placeholder='name' name='name' id='name' onChange={handleChange} /></div>
              <div ><input className="input" type='text' placeholder='description' name='description' id='description' onChange={handleChange}/></div>
              <div><input className="input" type='number' placeholder='price' name='price' id='price' onChange={handleChange} /></div>
              <div><input className="input" type='number' placeholder='discount' name='discount' id='discount' onChange={handleChange} /></div>
              <div><input type='file' name='file' onChange={handleChange}/></div>
            </div>
            <button class='px-4 py-2 mt-4 w-28 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm' onClick={handleUpload}>Upload</button>
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}