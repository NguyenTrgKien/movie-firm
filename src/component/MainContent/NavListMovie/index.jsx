import style from './NavListMovie.module.scss';
import clsx from 'clsx';
import ListScroll from '../../ListScroll';
import { useEffect } from 'react';

const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';
function NavListMovie() {
    const fetchApi = async () => {
        // Lấy tên tất cả các quốc gia 
        const getApi = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`);
        // Api phim theo từng quốc gia
        const getApiCountry = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=VN`);
        const dataApiCountry = await getApiCountry.json();
        console.log(dataApiCountry);
        
        //https://api.themoviedb.org/3/discover/movie?api_key=2e5d859a&region=VN
        const dataApi = await getApi.json();
        console.log(dataApi);
    }
    useEffect(() => {
        fetchApi();
    },[]);
    return (  
        <section className={clsx(style['navlist-movie'])}>
            <ListScroll ></ListScroll>
        </section>
    );
}

export default NavListMovie;