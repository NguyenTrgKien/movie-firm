import style from './WatchMovie.module.scss';
import clsx from 'clsx';
import Header from '../../component/Header';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../component/Button';
import { movieTrailer, moviedetail } from '../../store/Action';
import { useSelector, useDispatch } from 'react-redux';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function WatchMovie() {
    const { id } = useParams();
    const [isPlaying, setIsPlaying] = useState(true);
    const textAreaRef = useRef();
    const dispatch = useDispatch();
    const dataMovieTrailer = useSelector((state) => {
        return state.dataMovieTrailer;
    });
    const { dataDetailMovie, dataCastCrew } = useSelector((state) => {
        return state.movieDetail;
    });
    const trailer =
        dataMovieTrailer &&
        dataMovieTrailer.results.find(
            (value) => value.site === 'YouTube' && value.type === 'Trailer'
        );

    useEffect(() => {
        dispatch(movieTrailer(id));
        dispatch(moviedetail(id));
    }, [dispatch, id]);

    return (
        <>
            <Header scrollHeader={false} />
            <div className={clsx(style['wrapper-content'])}>
                <div className={clsx(style['content-video-movie'])}>
                    <div className={clsx(style['wrap-video-movie'])}>
                        <ReactPlayer
                            className={clsx(style['video-movie'])}
                            url={`https://www.youtube.com/watch?v=${trailer.key}`}
                            controls={true}
                            width="100%"
                            height="100%"
                            playing={isPlaying}
                            // volume={volume}
                            onEnded={() => {
                                setIsPlaying(false);
                                setTimeout(() => {
                                    setIsPlaying(true);
                                }, 100);
                            }}
                        />
                    </div>
                    <div className={clsx(style['episodes-movie'])}>
                        <h3 className={clsx(style['movie-title'])}>{dataDetailMovie.title}</h3>
                        <div className={clsx(style['number-episode-movie'])}>Episode: 1-24</div>
                        <div className={clsx(style['episodes-movie-item'])}>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                            <div className={clsx(style['episodes-movie-item-link'])}>1</div>
                        </div>
                    </div>
                </div>
                <div className={clsx(style['content-info-movie'])}>
                    <h2 className={clsx(style['content-info-movie-title'])}>
                        {dataDetailMovie.title}
                    </h2>
                    <div className={clsx(style['movie-info-date'])}>
                        <span className={clsx(style['movie-info-data-evaluate'])}>
                            9
                            <FontAwesomeIcon icon={faStar} className={clsx(style['icon-star'])} />
                            {/* {dataDetailMovie.vote_average.toFixed()} */}
                        </span>
                        <div className={clsx(style['movie-data'])}>
                            {dataDetailMovie.release_date}
                        </div>
                    </div>
                    <div className={clsx(style['movie-genre'])}>
                        {dataDetailMovie &&
                            dataDetailMovie.genres.map((value, index) => {
                                return (
                                    <span key={index} className={clsx(style['movie-genre-item'])}>
                                        {value.name}
                                    </span>
                                );
                            })}
                    </div>
                    <div className={clsx(style['movie-genre'])}></div>
                    <div className={clsx(style['movie-overview'])}>
                        <span className={clsx(style['movie-overview-title'])}>Overview:</span>
                        {dataDetailMovie.overview}
                    </div>
                </div>
                <div className={clsx(style['content-info-cast'])}>
                    {dataCastCrew.cast &&
                        dataCastCrew.cast.map((cast, index) => {
                            return (
                                <div key={index} className={clsx(style['content-info-cast-item'])}>
                                    <div className={clsx(style['image-cast'])}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                            className={clsx(style['image-cast-item'])}
                                        />
                                    </div>
                                    <div className={clsx(style['name-cast'])}>{cast.name}</div>
                                    <span className={clsx(style['info-job'])}>cast</span>
                                </div>
                            );
                        })}
                </div>
                <div className={clsx(style['movie-commend'])}>
                    <h4 className={clsx(style['quantity-comment'])}>10 Comments</h4>
                    <div className={clsx(style['user-comment'])}>
                        <div className={clsx(style['content-post-comment'])}>
                            <div className={clsx(style['user'])}>
                                <img className={clsx(style['image-user'])} />
                            </div>
                            <div className={clsx(style['content-comment'])}>
                                <textarea
                                    onMouseOut={() => {
                                        if (textAreaRef.current) {
                                            textAreaRef.current.focus();
                                        }
                                    }}
                                    ref={textAreaRef}
                                    type="text"
                                    className={clsx(style['input-comment'])}
                                    placeholder="Comment..."
                                    maxLength="280"
                                ></textarea>
                                <span className={clsx(style['info-max-comment'])}>0/280</span>
                            </div>
                        </div>
                        <div className={clsx(style['buttons-post-comment'])}>
                            <Button btnSmall>Hủy</Button>
                            <Button btnSmall active>
                                Đăng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WatchMovie;
