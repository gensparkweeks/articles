import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Global from './Global';
import empty from '../statics/images/empty.png'
import {useForm} from 'react-hook-form';

const ArticleUpdate = () => {

    const navigate = useNavigate();
    const {register, formState:{errors}, handleSubmit} = useForm({});

    const {id} = useParams();
    const [article, setArticle]  = useState({});
    const {url, imgPath} = Global;

    const onSubmit = (data) => {
        
        var photoUpdated = article.photo;

        if (data.file[0] !== null && data.file[0] !== undefined){

            photoUpdated = data.file[0].name;

            const fd = new FormData();
            fd.append('file0', data.file[0]);

            //Put
            axios.put("http://localhost:8080/api/upload", fd)
            .then(res =>{
                if(res.ok) {
                    console.log(res.data);
                }
            })
        }

        const loadParams = {
            id:id, 
            name: data.name, 
            description: data.description,
            published: new Date(),
            photo: photoUpdated,
            completed:data.completed
        }
        //Put
        axios.put(url + "articles", loadParams)
            .then(res => {
                if (res.data){ 
                }
            });
        navigate("/articles");
    }

    const onCancel = ()=>{
        navigate("/articles");
    }

    useEffect(()=>{
        
        axios.get(url + "articles/" + id)
            .then(res => {
                setArticle(res.data)
            })
    }, [url, id])

    if (article != null){
        return (
            <div className="container mb-4">
                <h1 className="p-4 bg-header mt-1">Editing an Article</h1>
                
                <div className='row mb-3'>

                    <div className='col-6 mb-3'>
                        <div>
                            {
                                article.photo ?
                                <img src={imgPath + article.photo} className="img-thumbnail cursor" width={500} alt="Article" />
                            :
                                <img src={empty} className="img-thumbnail cursor" width={300} alt="Article" />
                            }
                            
                        </div>
                    </div>

                    <div className='col-6 mb-3' >

                        <form onSubmit={handleSubmit(onSubmit)} className='g-3'>

                            <div className="col-12 mb-1">
                                <label className="form-label">Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    defaultValue={article.name}
                                    {...register('name', {required: true})} 
                                />
                                {errors.name?.type === 'required' && <p>The name must be entered</p>}
                                
                            </div>

                            <div className="mb-1">
                                <label  className="form-label">Description</label>
                                <textarea className="form-control" 
                                    rows="2"
                                    defaultValue={article.description}
                                    {...register('description', {required: true})} 
                                />
                                {errors.description?.type === 'required' && <p>The description must be entered</p>}
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Load a new image</label>
                                <input className="form-control" 
                                        type="file" 
                                        {...register('file')} 
                                />
                                
                            </div>

                            <div className="col-3 mb-2">
                                <div className="form-check">
                                    <label className="form-check-label">Completed?</label>
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        defaultChecked={article.completed}
                                        {...register('completed')} 
                                />                                  
                                </div>
                            </div>
                            <div className="col-11 d-flex justify-content-center">
                                <button type='submit' className="btn btn-primary">Update</button>
                                <div className='col-1 mb-1'></div>
                                <button onClick={()=>{onCancel()}} className="btn btn-secondary">Cancel</button>
                            </div>
                            
                        </form>

                    </div>

                </div>

                
            </div>
        );
    }
    
}

export default ArticleUpdate;
