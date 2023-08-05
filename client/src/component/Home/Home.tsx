import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Axios from 'axios';
import Loading from './Loading';

const Home = () => {

    const initialFields = {
        name: "",
        description: "",
        price: "",
        discount: "",
        file: ""
      };
    
     const [fields, setFields] = useState(initialFields);
     const [data, setData] = useState([]);
     const [page, setPage] = useState(0);
     const [perpage, setPerPage] = useState(10);
    
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
      console.log("formData",formData)
      Axios.post('http://localhost:3001/upload',formData)
      .then(()=>{
        getDataApi();
      })
      .catch((error)=>{
        console.log(error);
      })
     }
    
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        window.addEventListener("scroll", handleInfiniteScroll);
        return() =>{
            window.removeEventListener("scroll",handleInfiniteScroll);
        }
    },[]);

    useEffect(()=>{
        getDataApi();
    },[page]);
    
    const handleInfiniteScroll = async() => {
        try{
            if(window.innerHeight + document.documentElement.scrollTop + 1 > 
                document.documentElement.scrollHeight){
                    setLoading(true);
                    setPage((prev)=> prev + 1);
                }
        }
        catch(error){
            console.log(error);
        }
    }

    const getDataApi = () => {
      
        Axios.get(`http://localhost:3001/getBooks?page=${page}&perpage=${perpage}`,
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            setData((prev) => [...prev, ...res?.data?.data]);
            setLoading(false);
        })
        .catch((error)=>{
            console.log("error", error);
        });
    }

    return(
        <>
        <div class='text-center font-bold text-lg pt-5 pb-5'>Books</div>
        <div class='flex flex-wrap justify-center items-center h-full gap-3'
         >
        {data && data.map((obj, id)=>{
            return (        
                        <Card
                            imgUrl={`http://localhost:3001/Images/${obj.image}`}
                            description={obj.description}
                            price={obj.price}
                            discount={obj.discount}
                            name={obj.name}
                            key={id}
                        />
            );
        })}
        </div>
        {loading && <Loading />}
        </>
    )
}

export default Home;