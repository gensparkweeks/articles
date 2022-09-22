import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Global from './Global';
import empty from '../statics/images/empty.png'
import {useForm} from 'react-hook-form';

const ArticleAdd = () => {

    const {url} = Global;
    const navigate = useNavigate();

    const {register, formState:{errors}, handleSubmit} = useForm({
        defaultValues: {
            name: '', 
            description: '',
            file: [],
            photo: null,
            completed:false
        }
    });

    const onSubmit = (data) => {
        var photoUpdated = null;

        if (data.file[0] !== null && data.file[0] !== undefined){

            photoUpdated = data.file[0].name;

            const fd = new FormData();
            fd.append('file0', data.file[0]);

            //Post
            axios.post("http://localhost:8080/api/upload", fd)
            .then(res =>{
                if(res.ok) {
                    console.log(res.data);
                }
            })
        }

        const loadParams = {
            name: data.name, 
            description: data.description,
            published: new Date(),
            photo: photoUpdated,
            completed:data.completed
        }
        //Post
        axios.post(url + "articles", loadParams)
            .then(res => {
                if (res.data){ 
                    console.log(res.data);
                }
            });

        
        navigate("/articles");

    }

    const onCancel = ()=>{
        navigate("/articles");
    }   

 
    return (
        <div className="container mb-4">
            <h1 className="p-4 bg-header mt-1">Adding an Article</h1>
            
            <div className='row mb-3'>

                <div className='col-6 mb-3'>
                    <div>
                        <img src={empty} className="img-thumbnail cursor" width={300} alt="Article" />
                    </div>
                </div>

                <div className='col-6 mb-3' >

                    <form onSubmit={handleSubmit(onSubmit)} className='g-3'>

                        <div className="col-12 mb-1">
                            <label className="form-label">Name</label>
                            <input type="text" 
                                className="form-control" 
                                {...register('name', {required:true})} 
                            />
                            {errors.name?.type === 'required' && <p>The name must be entered</p>}
                            
                        </div>

                        <div className="mb-1">
                            <label  className="form-label">Description</label>
                            <textarea className="form-control" 
                                rows="2"
                                {...register('description', {required:true})} 
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
                                    {...register('completed')} 
                            />                                  
                            </div>
                        </div>
                        <div className="col-11 d-flex justify-content-center">
                            <button type='submit' className="btn btn-primary">Add</button>
                            <div className='col-1 mb-1'></div>
                            <button onClick={()=>{onCancel()}} className="btn btn-secondary">Cancel</button>
                        </div>
                        
                    </form>

                </div>

            </div>

            
        </div>
    );
    
    
}

export default ArticleAdd;
