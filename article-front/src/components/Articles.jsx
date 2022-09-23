import {useState, useEffect} from 'react'
import axios from 'axios';
import Global from './Global';

import empty from '../statics/images/empty.png'
import edit from '../statics/images/modify.png'
import dele from '../statics/images/erase.png'
import create from '../statics/images/create.png';

import completed from '../statics/images/completed.png'
import pending from '../statics/images/pending.png'
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

import Moment from 'react-moment'
import Swal from 'sweetalert2'

function Articles(){

    const [articles, setArticles] = useState([]);
    const [status, setStatus] = useState(false);

    const imagePath = Global.imgPath;
    const navigate = useNavigate();

    const onCreate = ()=>{
        navigate("/articleadd")
    }

    const onEdit = (id)=>{
        navigate("/articleupdate/"+id)  
    }

    const onDelete = (id, name)=>{      
        
        Swal.fire({
            icon: "warning",
            title: "Are you sure to delete '"+ name +"' article?",
            showDenyButton: true,
            denyButtonText: "Cancel",
            denyButtonColor: "#6C757D",
            confirmButtonText: "Delete",
            confirmButtonColor: "#0D6EFD",
          }).then((res) => {
            if (res.isConfirmed) {

                axios.delete("http://localhost:8080/api/articles/"+ id)
                .then(res => {
                  setStatus(false);
              })

            }
            // if (res.isDenied) {
            //   Swal.fire("Cancel", "Cancel");
            // }
          });
    }

    const loadArticles = ()=>{
        
        axios.get("http://localhost:8080/api/articles/")
              .then(res => {
                setArticles(res.data);
                setStatus(true);
            })
    }

    useEffect(loadArticles, [articles]);

    if (articles.length >= 1){
        return(
            <div className="container">
                <div className='sticky-top mb-2 rounded-3'>

                    <h1 className="p-3 bg-header mt-1 mb-0">List of Articles</h1>
                
                    <div className="row fw-bold col-12 bg-little m-auto">
                        <div className="col-1">
                            Image
                        </div>
                        <div className="col-2 ">
                            Title
                        </div>
                        <div className="col-3">
                            Description
                        </div>
                        <div className="col-2">
                            Modified
                        </div>
                        <div className="col-1">
                            Completed
                        </div>
                        <div className="col-1">
                            Edit
                        </div>
                        <div className="col-1">
                            Delete
                        </div>
                        <div className="col-1 ">
                            <img onClick={() => onCreate()} src={create} className="img-thumbnail cursor" width={24} alt="Create" />
                            Add
                        </div>
                    </div>
                </div>
                               
                {
    
                    articles.map(article =>
                        <div className="row mb-2"  key={article.id}>
                            
                            <div className="col-1">
                            {
                            article.photo ?
                                <img onClick={() => onEdit(article.id)} src={imagePath + article.photo} className="img-thumbnail cursor" width={70} alt="Edit" />
                                :
                                <img onClick={() => onEdit(article.id)} src={empty} className="img-thumbnail cursor" width={50} alt="Edit" />
                            }    
                            </div>
                            <div className="col-2 ">
                                {article.name}
                            </div>
                            <div className="col-3">
                                {article.description ?
                                    article.description.substring(0, 21) + " ..."
                                :
                                 " "
                                }
                            </div>
                            <div className="col-2">
                                {/* {article.published.substring(0, 10)} */}
                                <Moment to={article.published} />
                            </div>
                            <div className="col-1">
                                {article.completed ?
                                    <img src={completed} className="img-thumbnail cursor" width={25} alt="Completed" />
                                :
                                    <img src={pending} className="img-thumbnail cursor" width={25} alt="Pending" />
                                }
                            </div>
                            <div className="col-1">
                                 <img onClick={() => onEdit(article.id)} src={edit} className="img-thumbnail cursor" width={25} alt="Edit" />
                            </div>
                            <div className="col-1">
                                <img onClick={() => onDelete(article.id, article.name)} src={dele} className="img-thumbnail cursor" width={25} alt="Delete" />
                            </div>
    
                        </div>
                    )
                }
    
            </div>
            
        )
    }else if(!status){
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

export default Articles;