import style from './MainContent.module.scss';
import clsx from 'clsx';
import HeroSidebar from './HeroSidebar';
import MovieGrid from './MovieGrid';
import NavListMovie from './NavListMovie';


function MainContent() {
    
    return (  
        <div className={clsx(style['main-content'])}>
            <HeroSidebar/>
            <NavListMovie/>
            <MovieGrid/>
        </div>
    );
}

export default MainContent;