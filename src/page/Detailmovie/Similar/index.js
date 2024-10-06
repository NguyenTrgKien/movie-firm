import clsx from 'clsx';
import style from './Similar.module.scss';
import { Link } from 'react-router-dom';


function Similar({similar}) {
    
    return (  
        <>
        {similar.map((item, index) => {
            return (
                <Link key={index} target='_blank' to={`/detailmovie/${item.id}`} className={clsx(style['episode-item'])}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className={clsx(style['episode-img'])}/>
                    <div className={clsx(style['episode-title'])}>
                        {item.title}
                    </div>
                </Link>
            )
        })}
        </>
    );
}

export default Similar;