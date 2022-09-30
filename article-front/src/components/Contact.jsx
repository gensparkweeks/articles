import React from 'react';
import {useForm} from 'react-hook-form';
import emailjs from '@emailjs/browser'
import axios from 'axios';
import Global from './Global'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Contact = () => {

    const {url} = Global;
    const navigate = useNavigate();

    const {register, formState:{errors}, handleSubmit} = useForm({
        defaultValues: {
            first: '', 
            last: '',
            email:'',
            message: ''
        }
    });

    const onSubmit =  (data) => {
        console.log("From Spring");
        const urlFull = `${url}sendEmail?mailto=mtoirac2011@gmail.com&fullname=${data.first}&email=${data.email}&message=${data.message}`      

        axios.get(urlFull)
            .then(res => {
                console.log(res)
            })
        
        Swal.fire("Good job!", "Your email was sent!", "success");
        navigate("/articles");     

    }

    const onEmailJs = (data)=>{
        console.log("From EmailJs");
        emailjs.send('service_wiylkri', 'template_i367izz', {fullname: data.first, email: data.email, message: data.message}, '40J0Q1y60dITDUwU_');
        
        Swal.fire("Good job!", "Your email was sent!", "success");
        navigate("/articles");  
    }

    return (
        <div className="container">

            <div className='sticky-top mb-2 rounded-3'>
                <h1 className="p-3 bg-header mt-1 mb-0">Contact Us</h1>
            </div>

            <div className='row mb-3'>

                <div className='col-3'></div>

                <div className='col-6 mb-3' >

                    <form onSubmit={handleSubmit(onSubmit)} className='g-3'>

                        <div className='row mt-2'>
                            <div className="col-6 mb-2">
                                <label className="form-label">First name</label>
                                <input type="text" 
                                    placeholder="First name"
                                    className="form-control" 
                                    {...register('first', {required:true})} 
                                />
                                {errors.first?.type === 'required' && <p className='error-msg'>First name must be entered</p>}
                            </div>

                            <div className="col-6 mb-2">
                                <label className="form-label">Last name</label>
                                <input type="text" 
                                    placeholder="Last name"
                                    className="form-control" 
                                    {...register('last', {required:true})} 
                                />
                                {errors.last?.type === 'required' && <p className='error-msg'>Last name must be entered</p>}
                            </div>
                        </div>

                        <div className="col-12 mb-2">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    className="form-control" 
                                    {...register('email', 
                                    {required:true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        }
                                    })} 
                                />
                                {errors.email?.type === 'required' && <p className='error-msg'>Email must be entered</p>}
                            </div>
                        
                        <div className="col-12 mt-2">
                            <label className="form-label">Message</label>
                            <textarea rows={3}
                                placeholder="Message"
                                className="form-control" 
                                {...register('message', {required:true})} 
                            />
                            {errors.message?.type === 'required' && <p className='error-msg'>Message must be entered</p>}
                        </div>

                        <div className="col-12 mt-2 d-flex">
                            <div className='col-2 mb-1'></div>
                            <button type='submit' className="btn btn-primary">From SpringBoot</button>
                            <div className='col-1 mb-1'></div>
                            <button onClick={handleSubmit(onEmailJs)} className="btn btn-secondary">From EmailJs</button>
                        </div>
                        
                    </form>
                </div>
            </div>    

        </div>   
    );
}

export default Contact;
