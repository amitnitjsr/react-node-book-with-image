import { useEffect, useState } from 'react';
import Axios from 'axios';
import Home from './component/Home/Home';
import Modal from './component/AddBook/Modal';

function App() {

  const initialFields = {
    name: "",
    description: "",
    price: "",
    discount: "",
    file: ""
  };

 const [fields, setFields] = useState(initialFields);
 const [data, setData] = useState();
 const [page,setPage] = useState(0);
 const [perpage,setPerPage] = useState(10);

 useEffect(()=>{
  getData();
 },[]);

 const handleChange = (e) => {
  
  if(e.target?.name === 'file'){
    setFields({...fields, file: e.target?.files[0]});
  }
  else{
    setFields({...fields, [e.target.name]: e.target.value})
  }
 }

 const getData = () => {
  Axios.get(`http://localhost:3001/getBooks?page=${page}&perpage=${perpage}`)
  .then((res)=>{
    setData(res.data.data);
  })
  .catch((error)=>{
    console.log(error);
  })
 }

 const handleUpload = (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('file', fields.file);
  formData.append('name', fields.name);
  formData.append('description', fields.description);
  formData.append('price', fields.price);
  formData.append('discount', fields.discount);
  console.log("formData",formData)
  Axios.post('http://localhost:3001/upload',formData)
  .then(()=>{
    getData();
  })
  .catch((error)=>{
    console.log(error);
  })
 }

  return (
    <>
        <input type='text' placeholder='name' name='name' id='name' onChange={handleChange} />
        <input type='text' placeholder='description' name='description' id='description' onChange={handleChange}/>
        <input type='number' placeholder='price' name='price' id='price' onChange={handleChange} />
        <input type='number' placeholder='discount' name='discount' id='discount' onChange={handleChange} />
        <input type='file' name='file' onChange={handleChange}/>
        <button onClick={handleUpload}>Upload</button>
        <br/>
        <Home />
        
    </>
  )
}

export default App;
