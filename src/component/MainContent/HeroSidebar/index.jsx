import style from './HeroSidebar.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faHeart,
    faLeftLong,
    faPlay,
    faRightLong,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import imgHero from '../../../assets/image/imgHero.png';
import Button from '../../../component/Button';
import ListScroll from '../../ListScroll';

const listScrollContent = [
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    },
    {
        image: imgHero,
        trendy: 'Top 10'
    }
]

function HeroSidebar() {
    return (
        <section className={clsx(style['hero-sidebar'])}>
            <div className={clsx(style['wrap-icon-left'])}>
                <FontAwesomeIcon icon={faChevronLeft} className={clsx(style['movie-icon-left'])} />
            </div>
            <div className={clsx(style['content-info-movie'])}>
                <h2 className={clsx(style['movie-title'])}>MY DEMON</h2>
                <div className={clsx(style['info-movie'])}>2023 . T16 . 16 Tập . Hàn Quốc</div>
                <div className={clsx(style['movie-btns'])}>
                    <Button btnHero>
                        <FontAwesomeIcon icon={faPlay} />
                        Xem Video
                    </Button>
                    <div className={clsx(style['movie-btn-heart'])}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className={clsx(style['movie-btn-share'])}>
                        <FontAwesomeIcon icon={faShare} />
                    </div>
                </div>
            </div>
            <div className={clsx(style['wrap-icon-right'])}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={clsx(style['movie-icon-right'])}
                />
            </div>
            <img className={clsx(style['image-hero'])} src={imgHero} alt="image hero" />
            
            <ListScroll title='Phổ biến trên PhimHay' listScrollContent={listScrollContent}/>

        </section>
    );
}

export default HeroSidebar;
