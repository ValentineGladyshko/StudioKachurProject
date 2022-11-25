import { React, useEffect } from 'react';
import { Navigate, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from './pages/Home';
import Album from './pages/Album';
import VideoPlayer from './pages/VideoPlayer';
import NavigationBar from './pages/NavigationBar';
import FooterBar from './pages/FooterBar';
import NotFound from './pages/NotFound';
import Chronometer from './pages/Chronometer';
import Members from './pages/Members';

import staticContentUa from './json/ua/staticContent.json';
import staticContentRu from './json/ru/staticContent.json';
import staticContentEn from './json/en/staticContent.json';

import videoCollectionUa from './json/ua/videoCollection.json';
import videoCollectionRu from './json/ru/videoCollection.json';
import videoCollectionEn from './json/en/videoCollection.json';

import thumbnailsCollectionUa from './json/ua/thumbnailsCollection.json';
import thumbnailsCollectionRu from './json/ru/thumbnailsCollection.json';
import thumbnailsCollectionEn from './json/en/thumbnailsCollection.json';

function App() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        
        if (hash === '') {
            window.scrollTo(0, 0);
        }

        else {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    const position = element.style.position;
                    const top = element.style.top;
                    element.style.top = '-70px';
                    element.style.position = 'relative';
                    element.scrollIntoView({ behavior: "smooth" });
                    element.style.position = position;
                    element.style.top = top;
                }
            }, 0);
        }
    }, [pathname, hash, key]);

    return (<div className="App d-flex flex-column">
        <Routes>
            <Route path='/' element={<Navigate to="/ua" replace />}></Route>
            <Route path='/ua' element={<Main navLinks={staticContentUa.navLinks} footerContent={staticContentUa.footerContent} />}>
                <Route index element={<Members membersContent={staticContentUa.membersContent} />} />
                <Route path="album" element={<Album albumContent={staticContentUa.albumContent} videoCollection={videoCollectionUa} thumbnailsCollection={thumbnailsCollectionUa}/>} />
                <Route path="player" element={<VideoPlayer playerContent={staticContentUa.playerContent} videoCollection={videoCollectionUa} notFoundContent={staticContentUa.notFoundContent} />} />
                <Route path="members" element={<Members membersContent={staticContentUa.membersContent} />} />
                <Route path="chronometer" element={<Chronometer chronometerContent={staticContentUa.chronometerContent}/>} />
                <Route path="*" element={<NotFound notFoundContent={staticContentUa.notFoundContent}/>} />
            </Route>
            <Route path='/ru' element={<Main navLinks={staticContentRu.navLinks} footerContent={staticContentRu.footerContent} />}>
                <Route index element={<Members membersContent={staticContentRu.membersContent} />} />
                <Route path="album" element={<Album albumContent={staticContentRu.albumContent} videoCollection={videoCollectionRu} thumbnailsCollection={thumbnailsCollectionRu} />} />
                <Route path="player" element={<VideoPlayer playerContent={staticContentRu.playerContent} videoCollection={videoCollectionRu} notFoundContent={staticContentRu.notFoundContent} />} />
                <Route path="members" element={<Members membersContent={staticContentRu.membersContent} />} />
                <Route path="chronometer" element={<Chronometer chronometerContent={staticContentRu.chronometerContent} />} />
                <Route path="*" element={<NotFound notFoundContent={staticContentRu.notFoundContent} />} />
            </Route>
            <Route path='/en' element={<Main navLinks={staticContentEn.navLinks} footerContent={staticContentEn.footerContent} />}>
                <Route index element={<Members membersContent={staticContentEn.membersContent} />} />
                <Route path="album" element={<Album albumContent={staticContentEn.albumContent} videoCollection={videoCollectionEn} thumbnailsCollection={thumbnailsCollectionEn} />} />
                <Route path="player" element={<VideoPlayer playerContent={staticContentEn.playerContent} videoCollection={videoCollectionEn} notFoundContent={staticContentEn.notFoundContent} />} />
                <Route path="members" element={<Members membersContent={staticContentEn.membersContent} />} />
                <Route path="chronometer" element={<Chronometer chronometerContent={staticContentEn.chronometerContent} />} />
                <Route path="*" element={<NotFound notFoundContent={staticContentEn.notFoundContent} />} />
            </Route>
            <Route path="*" element={<Navigate to="/ua" replace />} />
        </Routes>
    </div>);
}



function Main(props) {
    return (
        <>
            <NavigationBar navLinks={props.navLinks} />
            <Outlet />
            <FooterBar footerContent={props.footerContent} />
        </>
    );
}

export default App;
