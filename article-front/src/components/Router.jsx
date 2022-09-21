import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Articles from './Articles';
import ArticleUpdate from './ArticleUpdate';
import Slider from './Slider';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route exact path="/" element={<Slider />} />
                <Route exact path="/home" element={<Slider />} />

                <Route exact path="/articles" element={<Articles />} />
                <Route exact path="/articleupdate/:id" element={<ArticleUpdate />} />


            </Routes>
        </BrowserRouter>
    );
}

export default Router;
