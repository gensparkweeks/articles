import {useState, useEffect} from 'react'
import axios from 'axios';
import Global from './Global';
import empty from '../statics/images/empty.png'
import edit from '../statics/images/edit.png'
import dele from '../statics/images/x.png'
import Loading from './Loading';

function Articles(){

    const [articles, setArticles] = useState([]);
    const [status, setStatus] = useState(false);

    const imagePath = Global.imgPath;

    const onEdit = ()=>{

    }

    const onDelete = (id)=>{
        axios.delete("http://localhost:8080/api/articles/"+ id)
              .then(res => {
                setStatus(false);
            })

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
                <h1 className="p-4 bg-header mt-1">List of Articles</h1>
                
                <div className="row fw-bold mb-4">
                    <div className="col-1">
                        Image
                    </div>
                    <div className="col-2 ">
                        Image Of Article
                    </div>
                    <div className="col-3">
                        Description
                    </div>
                    <div className="col-2">
                        Published
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
                </div>    
                
                {
    
                    articles.map(article =>
                        <div className="row mb-2"  key={article.id}>
                            
                            <div className="col-1">
                            {
                            article.photo ?
                                <img src={imagePath + article.photo} className="img-thumbnail cursor" width={70} alt="Edit" />
                                :
                                <img src={empty} className="img-thumbnail cursor" width={50} alt="Edit" />
                            }    
                            </div>
                            <div className="col-2 ">
                                {article.name}
                            </div>
                            <div className="col-3">
                                {article.description ?
                                    article.description.substring(0, 25)
                                :
                                 " "
                                }
                            </div>
                            <div className="col-2">
                                {article.published.substring(0, 10)}
                            </div>
                            <div className="col-1">
                                {article.completed}
                            </div>
                            <div className="col-1">
                                 <img onClick={onEdit} src={edit} className="img-thumbnail cursor" width={21} alt="Edit" />
                            </div>
                            <div className="col-1">
                                <img onClick={() => onDelete(article.id)} src={dele} className="img-thumbnail cursor" width={21} alt="Delete" />
                            </div>
    
                        </div>
                    )
                }
    
            </div>
            
        )
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

export default Articles;