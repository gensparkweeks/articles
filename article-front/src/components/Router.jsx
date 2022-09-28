import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ArticleAdd from './ArticleAdd';
import Articles from './Articles';
import ArticleUpdate from './ArticleUpdate';
import Contact from './Contact';
import Slider from './Slider';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route exact path="/" element={<Slider />} />
                <Route exact path="/home" element={<Slider />} />

                <Route exact path="/articles" element={<Articles />} />
                <Route exact path="/articleupdate/:id" element={<ArticleUpdate />} />
                <Route exact path='articleadd' element={<ArticleAdd />} />

                <Route exact path='/contact' element={<Contact />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
