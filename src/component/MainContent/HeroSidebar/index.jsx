import style from './HeroSidebar.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faHeart,
    faPlay,
    faShare,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../component/Button';
import ListScroll from '../../ListScroll';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { moviesPoppular } from '../../../store/Action';

function HeroSidebar({ listMovieLove, likeMovie }) {
    const [indexMovie, setIndexMovie] = useState(0);
    const [likeHeart, setLikeHeart] = useState(false);
    const imageRef = useRef();
    const titleRef = useRef();
    const evaluateRef = useRef();
    const overviewRef = useRef();
    const [overviewText, setOverViewText] = useState('');
    const dispatch = useDispatch();
    const country = useSelector((state) => {
        return state.listCountry;
    });

    useEffect(() => {
        console.log('Fetching movies for country:', country.name);
        dispatch(moviesPoppular(country.name));
    }, [dispatch,country.name]);

    const { dataPoppularMovie, dataNewMovie } = useSelector((state) => {
        return state.moviePoppular;
    });
    const handleMoveMovie = (direc) => {
        if (imageRef.current && titleRef.current && evaluateRef.current && overviewRef.current) {
            // khi click vào bộ phim tiếp theo thì hàm này sẽ thêm vào class
            // và thực hiện các animation
            imageRef.current.classList.add(clsx(style['background-blur']));
            titleRef.current.classList.add(clsx(style['title-blur']));
            evaluateRef.current.classList.add(clsx(style['evaluate-blur']));
            overviewRef.current.classList.add(clsx(style['overview-blur']));
        }
        setTimeout(() => {
            // Sau 800 giây thì nó sẽ xóa các class thực hiện animation này và nó render ra bộ phim tiếp theo
            imageRef.current.classList.remove(clsx(style['background-blur']));
            titleRef.current.classList.remove(clsx(style['title-blur']));
            evaluateRef.current.classList.remove(clsx(style['evaluate-blur']));
            overviewRef.current.classList.remove(clsx(style['overview-blur']));
            setIndexMovie((prev) =>
                direc === 'left'
                    ? prev === 0
                        ? dataNewMovie.length - 1
                        : prev - 1
                    : prev === dataNewMovie.length - 1
                      ? 0
                      : prev + 1
            );
        }, 800);
    };
    const currentMovie = dataNewMovie[indexMovie];

    useEffect(() => {
        if (currentMovie) {
            setOverViewText('');
            const words = currentMovie.overview.split(' '); // chuyển đổi chuỗi thành một mảng
            const timeouts = words.map((value, index) => {
                setTimeout(() => {
                    setOverViewText((prev) => prev + (prev ? ' ' : '') + value); // cứ mỗi index*100 giây
                    //thì có một chữ được thêm vào
                }, index * 100);
            });
            return () => timeouts.forEach(clearTimeout);
        }
    }, [currentMovie]);

    return (
        <section className={clsx(style['hero-sidebar'])}>
            <div
                className={clsx(style['wrap-icon-left'])}
                onClick={() => {
                    handleMoveMovie('left');
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} className={clsx(style['movie-icon-left'])} />
            </div>

            <div className={clsx(style['wrap-content-movie'])}>
                {currentMovie && (
                    <div className={clsx(style['content-movie'])}>
                        <div className={clsx(style['content-info-movie'])}>
                            <h2 className={clsx(style['title-movie'])} ref={titleRef}>
                                {currentMovie.title}
                            </h2>
                            <div className={clsx(style['movie-info-date'])} ref={evaluateRef}>
                                <span className={clsx(style['movie-info-data-evaluate'])}>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['icon-star'])}
                                    />
                                    {currentMovie.vote_average.toFixed()}
                                </span>
                                {currentMovie.release_date}
                            </div>
                            <div className={clsx(style['movie-genre'])}></div>
                            <div className={clsx(style['movie-overview'])} ref={overviewRef}>
                                <span className={clsx(style['movie-overview-title'])}>
                                    Overview:
                                </span>
                                {overviewText}
                            </div>
                            <div className={clsx(style['movie-btns'])}>
                                <Button btnHero to={`/watchmovie/${currentMovie.id}`}>
                                    <FontAwesomeIcon icon={faPlay} />
                                    Play
                                </Button>
                                <div
                                    className={clsx(style['movie-btn-heart'], {
                                        [style['btn-bgc']]: listMovieLove.includes(currentMovie.id),
                                    })}
                                    onClick={() => {
                                        setLikeHeart(!likeHeart);
                                        likeMovie(currentMovie.id);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={clsx(style['movie-btn-icon'], {
                                            [style['icon-clicked']]: listMovieLove.includes(
                                                currentMovie.id
                                            ),
                                        })}
                                    />
                                </div>
                                <div className={clsx(style['movie-btn-share'])}>
                                    <FontAwesomeIcon
                                        icon={faShare}
                                        className={clsx(style['movie-btn-icon'])}
                                    />
                                </div>
                            </div>
                        </div>
                        <img
                            ref={imageRef}
                            src={`https://image.tmdb.org/t/p/w1280/${currentMovie.backdrop_path}`}
                            alt="img"
                            className={clsx(style['content-info-movie-img'])}
                        />
                    </div>
                )}
            </div>

            <div
                className={clsx(style['wrap-icon-right'])}
                onClick={() => {
                    handleMoveMovie('right');
                }}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={clsx(style['movie-icon-right'])}
                />
            </div>

            <ListScroll title="Phổ biến trên PhimHay" heroPosition dataApi={dataPoppularMovie} />
        </section>
    );
}

const mapStateToProps = (state) => {
    return { listMovieLove: state.listMovieLove };
};

const mapDispatchToProps = (dispatch) => {
    return {
        likeMovie: (idMovie) => {
            return dispatch({ type: 'LIKEMOVIE_ACTION', payload: idMovie });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroSidebar);
