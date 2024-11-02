import style from './GenreMovie.module.scss';
import clsx from 'clsx';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMovie, nameGenre, listGenre } from '../../store/Action';
import { useSelector, useDispatch } from 'react-redux';

function GenreMovie() {
    const { genre } = useParams();
    const [listGenreMovie, setListGenreMovie] = useState();
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const dataNewMovie = useSelector((state) => {
        return state.dataNewMovie;
    })
    const dataNameGenre = useSelector((state) => {
        return state.dataNameGenre;
    })
    const dataListGenre = useSelector((state) => {
        return state.dataListGenre;
    })
    const country = useSelector((state) => {
        return state.listCountry;
    })
    
    useEffect(() => {
        if(!dataNameGenre){
            dispatch(nameGenre());
        }
        if(genre.toLowerCase() === 'phim mới nhất'){
            dispatch(newMovie(country.name));
        }else if(dataNameGenre && dataNameGenre.genres){
            const genre_id = dataNameGenre &&  dataNameGenre.genres.find((value) =>
                value.name.toLowerCase().includes(genre.toLowerCase())
            );
            if(genre_id){
                setTitle(genre_id.name);
                dispatch(listGenre(genre_id.id));
            }
        }
    }, [dispatch, genre, dataNameGenre]);

    useEffect(() => {
        if(genre.toLowerCase() === 'phim mới nhất'){
            setListGenreMovie(dataNewMovie);
        }else{
            setListGenreMovie(dataListGenre);
        }
    }, [dataNewMovie, dataListGenre, genre]);

    console.log(country);
    

    return (
        <>
            <Header scrollHeader={false}/>
            <div className={clsx(style['wrapper-list-movie'])}>
                <h2 className={clsx(style['list-movie-title'])}>DANH SÁCH {title && title.toUpperCase()}</h2>
                <div className={clsx(style['content-list-movie'])}>
                    {listGenreMovie &&
                        listGenreMovie.results.map((item, index) => {
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
            <Footer/>
        </>
    );
}

export default GenreMovie;
