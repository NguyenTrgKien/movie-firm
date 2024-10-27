import Header from '../../component/Header';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './Detailmovie.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faPlay, faShareFromSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../../component/Button';
import Footer from '../../component/Footer';
import Similar from './Similar';
import { moviedetail } from '../../store/Action';
import { useSelector, useDispatch } from 'react-redux';


function Detailmovie() {
    const { id } = useParams();
    const [activeNav, setActiveNav] = useState('Similar');

    const dispatch = useDispatch();
    const { dataDetailMovie, dataCastCrew, dataSimilar } = useSelector((state) => {
        return state.movieDetail;
    });

    useEffect(() => {
        dispatch(moviedetail(id));
    }, [dispatch, id]);

    const handleSortCast = (cast) => {
        let listCastFamous = [...cast];
        return listCastFamous.sort((a,b) => a.popularity - b.popularity);
    };

    return (
        <div>
            <Header scrollHeader={true} />
            <div className={clsx(style['container'])}>
                {dataDetailMovie && (
                    <div className={clsx(style['wrapper'])}>
                        <section className={clsx(style['section-info-movie'])}>
                            <div className={clsx(style['info-content-movie'])}>
                                <h2 className={clsx(style['title-movie'])}>
                                    {dataDetailMovie.title}
                                </h2>
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
                                            dataCastCrew.crew.find((item) => {
                                                return item.job === 'Director';
                                            }).name
                                        }
                                    </div>
                                    <div className={clsx(style['casts-movie'])}>
                                        <span className={clsx(style['info-name'])}>Cast:</span>{' '}
                                        {handleSortCast(dataCastCrew.cast).map((value, index) => {
                                            return (
                                                <Link
                                                    className={clsx(style['cast-movie-item'])}
                                                    key={index}
                                                >
                                                    {value.name},{' '}
                                                </Link>
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
                                    <Similar similar={dataSimilar.results} />
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Detailmovie;
