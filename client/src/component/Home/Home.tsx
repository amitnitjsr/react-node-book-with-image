import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Axios from 'axios';
import Loading from './Loading';
import Modal from '../AddBook/Modal';

const Home = () => {

     const [data, setData] = useState([]);
     const [page, setPage] = useState(0);
     const perpage = 10;
     const [modal, setModal] = useState(false);
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
    
//     const fetchBusinesses = useCallback( () => {
//         return fetch("theURL", {method: "GET"}
//     )
//     .then(() => { /* Some stuff */ })
//     .catch(() => { /* Some error handling */ })
//   }, [page])

    const toggleModal = () => {
        setModal(!modal);
      };

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

    function getDataApi() {
       
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
        <div class='text-center font-bold text-lg pt-5 pb-5'>
        <button class='text-center pt-2 pb-2 w-48 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm' onClick={toggleModal}>Add Book</button>
        </div>
        <Modal  
            toggleModal={toggleModal}
            getData={getDataApi}
            modal={modal}
        />
        <div class='flex flex-wrap justify-center items-center h-full gap-3'>
        
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