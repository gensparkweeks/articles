import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Global from './Global'
import {useState, useEffect} from 'react'
import Loading from './Loading';
import empty from '../statics/images/empty.png'

function Slider() {

  const navigate = useNavigate();
  const [articles, setarticles] = useState([]);

  const [status, setStatus] = useState(false);
  const {url, imgPath} = Global;

  const handleOnClick = ()=>{
    navigate("/articles")
  }

  const loadArticles = async ()=> {
    await axios.get(url + "articles/published")
    .then(res => {
      setarticles(res.data)
      setStatus(true);
    })

  }
 
  useEffect(() => {
    loadArticles();
  });

  if (articles.length >= 1){
  
    return (
      <>
        <div className='sticky-top mb-2 rounded-3'>
          <div className='d-flex justify-content-center'>
            <h1 className="p-3 bg-header mt-1 mb-0">Welcome to the Articles Manager App</h1>
            <button onClick={()=> handleOnClick()} className='btn btn-samecolor'>See Articles</button>
          </div>          
          <p>"An easy way to manage your articles..."</p>
        </div>
  
        <div id="carouselExampleDark" className="carousel carousel-dark slide setheight" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active imgnormalizada" data-bs-interval="10000">

            {
            articles[0].photo !== null ?
              <img src={imgPath + articles[0].photo} className="d-block w-100" alt="..."/>
            :
            <img src={empty} className="d-block w-100" alt="..."/>
            }
            <div className="carousel-caption d-none d-md-block">
              <h5>{articles[0].name.substring(0, 18)}</h5>
              <p>{articles[0].description.substring(0, 55) + " ..."}</p>
            </div>
          </div>

          <div className="carousel-item imgnormalizada" data-bs-interval="2000">
            {
              articles[1].photo !== null ?
               <img src={imgPath + articles[1].photo} className="d-block w-100" alt="..."/>
            :
               <img src={empty} className="d-block w-100" alt="..."/>
            }
            <div className="carousel-caption d-none d-md-block">
              <h5>{articles[1].name.substring(0, 18)}</h5>
              <p>{articles[1].description.substring(0, 55) + " ..."}</p>
            </div>
          </div>

          <div className="carousel-item imgnormalizada">
            {
              articles[2].photo !== null ?
                <img src={imgPath + articles[2].photo} className="d-block w-100" alt="..."/>
            :
              <img src={empty} className="d-block w-100" alt="..."/>
            }
           
            <div className="carousel-caption d-none d-md-block">
              <h5>{articles[2].name.substring(0, 18)}</h5>
              <p>{articles[2].description.substring(0, 55) + " ..."}</p>
            </div>
          </div>

         </div>
  
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </>
       
    );
  }else if(status){
    return(
        <div>
            <Loading />
        </div>
    )
  }else{
    return(
        <div>
            <h3>There is no article to show...</h3>
        </div>
    )
  }

  
}

export default Slider;