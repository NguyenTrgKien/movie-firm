import style from './ListScroll.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function ListScroll({ listScrollContent = [], title }) {
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const response = await fetch(
            `http://www.omdbapi.com/?s=${encodeURIComponent('Avengers')}&apikey=${'2e5d859a'}`
        );
        const newItem = await response.json();
        if (newItem) {
            console.log(newItem);
        } else {
            console.log('lỗi');
        }
        setData((prev) => [...prev, ...newItem.Search]);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className={clsx(style['list-scroll'])}>
            <div className={clsx(style['wrap-icon-left'])}>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={clsx(style['list-scroll-icon-left'])}
                />
            </div>
            <h2 className={clsx(style['list-scroll-title'])}>{title && title}</h2>

            <div className={clsx(style['list-scroll-firm'])}>
                {listScrollContent.map((item, index) => {
                    return (
                        <div key={index} className={clsx(style['list-scroll-item'])}>
                            <img
                                src={item.image}
                                alt="ảnh phim"
                                className={clsx(style['list-scroll-item-img'])}
                            />
                            <div className={clsx(style['info-trendy'])}>{item.trendy}</div>
                        </div>
                    );
                })}
            </div>
            <div className={clsx(style['wrap-icon-right'])}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={clsx(style['list-scroll-icon-right'])}
                />
            </div>
            {data.map((value, index) => {
                console.log(value)
                return (
                    <div key={index}>
                        <img  src={value.Poster} alt="img" />
                        <video width='200' height='200' controls>
                            <source src={``} type='video/mp4'/>
                            <source src={`https://www.example.com/videos/${value.imdbID}.mp4`} type="video/mp4" />
                        </video>
                    </div>
                );
            })}
        </div>
    );
}

export default ListScroll;
