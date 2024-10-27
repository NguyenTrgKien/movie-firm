import style from './ListScroll.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import {Link} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


function ListScroll({ dataApi = false, title = '', heroPosition = false}) {
    const [dataPopular, setDataPopular] = useState();
    const listScrollRef = useRef();
    const containerRef = useRef();
    useEffect(() => {
        setDataPopular(dataApi);
    },[dataApi]);
    if(heroPosition){
        if(containerRef.current){
            containerRef.current.classList.add(clsx(style['heroPosition']));
        }
    }
    
    const handleMoveMovieLeft = () => {
        if(listScrollRef.current){
            listScrollRef.current.scrollBy({
                left: -listScrollRef.current.clientWidth,
                behavior: 'smooth'
            })
        }
    }

    const handleMoveMovieright = () => {
        if(listScrollRef.current){
            listScrollRef.current.scrollBy({
                left: listScrollRef.current.clientWidth,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={clsx(style['list-scroll'])}
            ref={containerRef}
        >
            <div className={clsx(style['wrap-icon-left'])} 
                onClick={() => handleMoveMovieLeft()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={clsx(style['list-scroll-icon-left'])}
                />
            </div>
            <h2 className={clsx(style['list-scroll-title'])}>{title && title}</h2>

            <div className={clsx(style['list-scroll-firm'])}
                ref={listScrollRef}
            >
                {dataPopular && dataPopular.map((value, index) => {
                    const poster = value.poster_path;

                    return (
                        <Link target='_blank' to={`/detailmovie/${value.id}`} key={index} className={clsx(style['list-scroll-item'])}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${poster}`}
                                alt="ảnh phim"
                                className={clsx(style['list-scroll-item-img'])}
                            />
                            <div className={clsx(style['info-trendy'])}>Top 10</div>
                            <div className={clsx(style['list-info-movie'])}>
                                <h4 className={clsx(style['name-movie'])}>{value.title}</h4>
                                <div className={clsx(style['evaluate'])}>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['evaluate-start'])}
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['evaluate-start'])}
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['evaluate-start'])}
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['evaluate-start'])}
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={clsx(style['evaluate-start'])}
                                    />
                                    | {value.release_date}
                                </div>
                                <div className={clsx(style['list-category'])}>
                                    <span className={clsx(style['list-cate-item'])}>ThaiLand</span>
                                    <span className={clsx(style['list-cate-item'])}>Romance</span>
                                    <span className={clsx(style['list-cate-item'])}>Thai</span>
                                    <span className={clsx(style['list-cate-item'])}>
                                        FriendShip
                                    </span>
                                    <span className={clsx(style['list-cate-item'])}>China</span>
                                </div>
                                <p className={clsx(style['overview'])}>{value.overview}</p>
                                <div className={clsx(style['btns-movie'])}>
                                    <div className={clsx(style['btn-play'])}>
                                        <Button btnSmall to={`/watchmovie/${value.id}`}>
                                            <FontAwesomeIcon icon={faPlay} />
                                            Xem
                                        </Button>
                                    </div>
                                    <Button detailInfo to={`/detailmovie/${value.id}`} >
                                        Chi tiết
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className={clsx(style['wrap-icon-right'])}
                onClick={() => handleMoveMovieright()}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={clsx(style['list-scroll-icon-right'])}
                />
            </div>
        </div>
    );
}

export default ListScroll;
