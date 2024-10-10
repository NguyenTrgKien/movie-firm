import Header from '../../component/Header';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './Detailmovie.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleDown,
    faPlay,
    faShareFromSquare,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../component/Button';
import Similar from './Similar';
import { moviedetail } from '../../store/Action';
import { useSelector, useDispatch } from 'react-redux';

const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';

function Detailmovie() {
    const { id } = useParams();
    const [infoMovie, setInfoMovie] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [activeNav, setActiveNav] = useState('Similar');

    const dispatch = useDispatch();
    const {dataDetailMovie, dataCastCrew, dataSimilar} = useSelector((state) => {
        return state.movieDetail;
    })
    console.log(dataDetailMovie.vote_average);
    
    console.log(dataCastCrew);
    

    useEffect(() => {
        dispatch(moviedetail(id));
    },[dispatch])
    

    const fetchApi = async () => {
        const urlDetailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=vi-VN`; // Lấy chi tiết phim
        const urlListCast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`; // Lấy danh sách diễn viên
        const urlSimilar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1&language=vi-VN`; // Lấy danh sách 
        // những bộ phim liên quan

        const [responseDetailMovie, responseCast, responseSimilar] =
            await Promise.all([
                fetch(urlDetailMovie),
                fetch(urlListCast),
                fetch(urlSimilar),
            ]);

        const dataDetailMovie = await responseDetailMovie.json();
        const dataCastCrew = await responseCast.json();
        const dataSimilar = await responseSimilar.json();
        setInfoMovie([dataDetailMovie]);
        setCrew(dataCastCrew.crew);
        setSimilar(dataSimilar.results);
        console.log(dataDetailMovie);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleSortCast = (cast) => {
        let listCastFamous = [...dataCastCrew.cast];
        for (let i = 0; i < listCastFamous.length; i++) {
            let maxIndex = i;
            for (let j = maxIndex + 1; j < listCastFamous.length; j++) {
                if (listCastFamous[j].popularity >= listCastFamous[maxIndex].popularity) {
                    maxIndex = j;
                }
            }
            const temp = listCastFamous[i];
            listCastFamous[i] = listCastFamous[maxIndex];
            listCastFamous[maxIndex] = temp;
        }
        return listCastFamous;
    };

    return (
        <div>
            <Header scrollHeader={true} />
            <div className={clsx(style['container'])}>
                {infoMovie.map((movie) => (
                    <div className={clsx(style['wrapper'])}>
                        <section className={clsx(style['section-info-movie'])}>
                            <div className={clsx(style['info-content-movie'])}>
                                <h2 className={clsx(style['title-movie'])}>{dataDetailMovie.title}</h2>
                                <div className={clsx(style['release_date'])}>
                                    <div className={clsx(style['evaluate-movie'])}>
                                        {dataDetailMovie.vote_average.toFixed(1)}{' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={clsx(style['evaluate-icon'])}
                                        />
                                    </div>
                                    <div className={clsx(style['evaluate-item'])}>
                                        {dataDetailMovie.release_date}
                                    </div>
                                </div>
                                <div className={clsx(style['genres-movie'])}>
                                    {dataDetailMovie.genres.map((genre, index) => {
                                        return (
                                            <span key={index} className={clsx(style['genre-name'])}>
                                                {genre.name}
                                            </span>
                                        );
                                    })}
                                    <div className={clsx(style['director'])}>
                                        <span className={clsx(style['info-name'])}>Dirrector:</span>{' '}
                                        {
                                            crew.find((item) => {
                                                return item.job === 'Director';
                                            }).name
                                        }
                                    </div>
                                    <div className={clsx(style['casts-movie'])}>
                                        <span className={clsx(style['info-name'])}>Cast:</span>{' '}
                                        {handleSortCast(dataCastCrew.cast).map((value, index) => {
                                            return (
                                                <a
                                                    href="#"
                                                    className={clsx(style['cast-movie-item'])}
                                                    key={index}
                                                >
                                                    {value.name},{' '}
                                                </a>
                                            );
                                        })}
                                    </div>
                                    <div className={clsx(style['decription'])}>
                                        <span className={clsx(style['info-name'])}>
                                            Decription:
                                        </span>{' '}
                                        {dataDetailMovie && dataDetailMovie.overview}
                                    </div>
                                    <div className={clsx(style['focus-info-btn'])}>
                                        <Button btnMedium active to={`/watchmovie/${id}`}>
                                            <FontAwesomeIcon icon={faPlay} />
                                            Play
                                        </Button>
                                        <Button btnMedium>
                                            <FontAwesomeIcon icon={faShareFromSquare} />
                                            Share
                                        </Button>
                                        <Button btnMedium>
                                            <FontAwesomeIcon icon={faCircleDown} />
                                            APP
                                        </Button>
                                        <Button btnMedium>Watch Later</Button>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(style['video-movie'])}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280/${dataDetailMovie.backdrop_path}`}
                                    alt="img"
                                />
                            </div>
                        </section>
                        <section className={clsx(style['section-info-episode'])}>
                            <div className={clsx(style['nav-similar'])}>
                                <Link
                                    to="#"
                                    className={clsx(style['nav-similar-item'], {
                                        [style['activeNav']]: activeNav === 'Similar',
                                    })}
                                    onClick={() => {
                                        setActiveNav('Similar');
                                    }}
                                >
                                    Similar
                                </Link>
                                <Link
                                    to="#"
                                    className={clsx(style['nav-similar-item'], {
                                        [style['activeNav']]: activeNav === 'Cast',
                                    })}
                                    onClick={() => {
                                        setActiveNav('Cast');
                                    }}
                                >
                                    Cast
                                </Link>
                                <Link
                                    to="#"
                                    className={clsx(style['nav-similar-item'], {
                                        [style['activeNav']]: activeNav === 'Episode',
                                    })}
                                    onClick={() => {
                                        setActiveNav('Episode');
                                    }}
                                >
                                    Episode
                                </Link>
                            </div>
                            {activeNav === 'Similar' && (
                                <div className={clsx(style['content-episode'])}>
                                    <Similar similar={similar} />
                                </div>
                            )}
                        </section>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Detailmovie;
