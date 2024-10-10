import style from './GenreMovie.module.scss';
import clsx from 'clsx';
import Header from '../../component/Header';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';

function GenreMovie() {
    const { genre } = useParams();
    const [listGenreMovie, setListGenreMovie] = useState();
    const [listGenre, setListGenre] = useState();
    const [title, setTitle] = useState('');

    const fetchApi = async () => {
        const getGenreMoves = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=vi-VN`
        );
        const dataGenreMovies = await getGenreMoves.json();
        console.log(dataGenreMovies);
        setListGenre(dataGenreMovies);

        if(genre.toLowerCase() === 'phim mới nhất'){
            setTitle('PHIM MỚI NHẤT'); 
            const getNewMovie = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`) ;
            const dataNewMovie = await getNewMovie.json();
            console.log((dataNewMovie));
            setListGenreMovie(dataNewMovie.results);
            
        }else{
            var genre_id = dataGenreMovies.genres.find((value) =>
                value.name.toLowerCase().includes(genre.toLowerCase())
            );
        }
        // https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&sort_by=release_date.desc&language=vi-VN

        if (genre_id) {
            const getGenreMove = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre_id.id}&language=vi-VN`
            );
            const dataGenreMovie = await getGenreMove.json();
            setTitle(genre_id.name);
            console.log(dataGenreMovie);
            setListGenreMovie(dataGenreMovie.results);
        }
    };


    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <Header scrollHeader={false}/>
            <div className={clsx(style['wrapper-list-movie'])}>
                <h2 className={clsx(style['list-movie-title'])}>DANH SÁCH {title.toUpperCase()}</h2>
                <div className={clsx(style['content-list-movie'])}>
                    {listGenreMovie &&
                        listGenreMovie.map((item, index) => {
                            return (
                                <Link
                                    target='_blank'
                                    to={`/watchmovie/${item.id}`}
                                    className={clsx(style['content-list-movie-item'])}
                                    key={index}
                                >
                                    <div className={clsx(style['wrap-list-movie-image'])}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                                            alt="img"
                                            className={clsx(style['image-movie'])}
                                        />
                                        <div className={clsx(style['btn-play-movie'])}>
                                            <FontAwesomeIcon icon={faPlay} className={clsx(style['btn-play-movie-icon'])}/>
                                        </div>
                                    </div>
                                    <h4 className={clsx(style['name-movie'])}>{item.title}</h4>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default GenreMovie;
