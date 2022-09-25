import carouseLion from '../statics/images/lion.jpg'
import carouselEagle from '../statics/images/eagle.jpg'
import carouselShark from '../statics/images/shark.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Global from './Global'
import {useState, useEffect} from 'react'
import Loading from './Loading';
import empty from '../statics/images/empty.png'

function Slider() {

  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [article1, setArticle1] = useState({}); 
  const [article2, setArticle2] = useState({});
  const [article3, setArticle3] = useState({});

  const [status, setStatus] = useState(false);
  const {url, imgPath} = Global;

  const handleOnClick = ()=>{
    navigate("/articles")
  }
 
  useEffect(() => {
    axios.get(url + "articles/published")
      .then(res => {
        setArticles(res.data)
        setStatus(true);
      })
    
      setArticle1(articles[0]);
      setArticle2(articles[1]);
      setArticle3(articles[2]);

  }, [url, articles]);

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
           
              <img src={carouselShark} className="d-block w-100" alt="..."/>
      
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>

          <div className="carousel-item imgnormalizada" data-bs-interval="2000">
            <img src={carouselEagle} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>

          <div className="carousel-item imgnormalizada">
            <img src={carouseLion} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
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