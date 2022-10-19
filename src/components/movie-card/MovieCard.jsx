import React, { useState } from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';

import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieID, {
            savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
            }),
        });
        } else {
        alert('Please log in to save a movie');
        }
    };

    return (
            <Link to={"#"}>
                <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
            <p onClick={saveShow}>
                {like ? (
                    <FaHeart className="heart1" />
                ) : (
                    <FiHeart className="heart" />
                )}
            </p>
            <Link to={link}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </Link>
        </div><h3>{item.title || item.name}</h3>
        </Link>
        
    );
}

export default MovieCard;
