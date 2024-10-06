import Header from '../../component/Header';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './Detailmovie.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleDown,
    faPlay,
    faShareFromSquare,
    faStar,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../component/Button';
import ReactPlayer from 'react-player';
import Similar from './Similar';

const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';

function Detailmovie() {
    const { id } = useParams();
    const [infoMovie, setInfoMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoTrailerRef = useRef();
    const [similar, setSimilar] = useState([]);
    const [activeNav, setActiveNav] = useState('Similar');
    const [iconVolume, setIconVolume] = useState(faVolumeHigh);
    const [volume, setVolume] = useState(1);

    const fetchApi = async () => {
        const urlDetailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const urlListCast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
        const urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
        const urlSimilar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

        const [responseDetailMovie, responseCast, responseTrailer, responseSimilar] =
            await Promise.all([
                fetch(urlDetailMovie),
                fetch(urlListCast),
                fetch(urlTrailer),
                fetch(urlSimilar),
            ]);
        // https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1

        const dataDetailMovie = await responseDetailMovie.json();
        const dataCastCrew = await responseCast.json();
        const dataTrailer = await responseTrailer.json();
        const dataSimilar = await responseSimilar.json();
        setInfoMovie([dataDetailMovie]);
        setCast(dataCastCrew.cast);
        setCrew(dataCastCrew.crew);
        setSimilar(dataSimilar.results);
        const handleTrailer = dataTrailer.results.find(
            (item) => item.type === 'Trailer' && item.site === 'YouTube'
        );
        if (handleTrailer) {
            setTrailer(handleTrailer);
            setIsPlaying(true);
        }
        console.log(dataDetailMovie);
        
    };

    

    useEffect(() => {
        fetchApi();
    }, []);

    const handleSortCast = (cast) => {
        let listCastFamous = [...cast];
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
            <Header />
            <div className={clsx(style['container'])}>
                {infoMovie.map((movie, index) => (
                    <div className={clsx(style['wrapper'])} key={index}>
                        <section className={clsx(style['section-info-movie'])}>
                            <div className={clsx(style['info-content-movie'])}>
                                <h2 className={clsx(style['title-movie'])}>{movie.title}</h2>
                                <div className={clsx(style['release_date'])}>
                                    <div className={clsx(style['evaluate-movie'])}>
                                        {movie.vote_average.toFixed(1)}{' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={clsx(style['evaluate-icon'])}
                                        />
                                    </div>
                                    <div className={clsx(style['evaluate-item'])}>
                                        {movie.release_date}
                                    </div>
                                </div>
                                <div className={clsx(style['genres-movie'])}>
                                    {movie.genres.map((genre, index) => {
                                        return (
                                            <span key={index} className={clsx(style['genre-name'])}>
                                                {genre.name}
                                            </span>
                                        );
                                    })}
                                    <div className={clsx(style['director'])}>
                                        <span className={clsx(style['info-name'])}>Dirrector:</span>
                                        {' '}
                                        {
                                            crew.find((item) => {
                                                return item.job === 'Director';
                                            }).name
                                        }
                                    </div>
                                    <div className={clsx(style['casts-movie'])}>
                                        <span className={clsx(style['info-name'])}>Cast:</span>{' '}
                                        {handleSortCast(cast).map((value, index) => {
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
                                        <span className={clsx(style['info-name'])}>Decription:</span>{' '}
                                        {infoMovie.map((value) => {
                                            return value.overview;
                                        })}
                                    </div>
                                    <div className={clsx(style['focus-info-btn'])}>
                                        <Button btnMedium active>
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
                                {trailer.key ? (
                                    <>
                                        <ReactPlayer
                                            ref={videoTrailerRef}
                                            className={clsx(style['video-movie-item'])}
                                            url={`https://www.youtube.com/watch?v=${trailer.key}`}
                                            controls={false} // Hiển thị các điều khiển
                                            width="100%"
                                            height="100%"
                                            playing={isPlaying} // video playing khi vào trang 
                                            volume={volume} // prop volume của react-player
                                            onEnded={() => {
                                                setIsPlaying(false);
                                                setTimeout(() => {
                                                    setIsPlaying(true);
                                                }, 100);
                                            }}
                                        ></ReactPlayer>
                                        <div className={clsx(style['volume-video'])}>
                                            <div className={clsx(style['wrap-icon-volume'])}
                                                onClick={() => {
                                                    if(iconVolume === faVolumeHigh){
                                                        setVolume(0)
                                                        setIconVolume(faVolumeXmark);
                                                    }else{
                                                        setVolume(1);
                                                        setIconVolume(faVolumeHigh);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={iconVolume}
                                                    className={clsx(style['volume-video-icon'])}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt="img"
                                    />
                                )}
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
