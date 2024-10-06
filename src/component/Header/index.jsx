import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import { faCaretDown, faChevronDown, faGlobe, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
// import Tippy from '@tippyjs/react/headless';
import Menu from '../../component/Menu';

const menuItem = [
    {
        name: 'Phim lẻ',
        to: '/',
    },
    {
        name: 'Điện ảnh',
        to: '/',
    },
    {
        name: 'Võ thuật',
        to: '/',
    },
    {
        name: 'Cổ trang',
        to: '/detailmovie',
    },
];

const menuLanguage = [
    {
        name: 'Tiếng Việt',
    },
    {
        name: 'English',
    },
    {
        name: 'Japan',
    },
];

function Header() {
    const [colorHeader, setColorHeader] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setColorHeader(true);
            }else{
                setColorHeader(false);
            }            
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(style['wrapper'], {
                [style.bgcolor]: colorHeader,
            })}
        >
            <div className={clsx(style['logo-nav'])}>
                <img className={clsx(style['img-logo'])} src={logo} alt="logo" />
                <nav className={clsx(style['navigation'])}>
                    <ul>
                        <li>
                            <Link to="/" className={clsx(style['navigation-link'])}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to="/detailmovie" className={clsx(style['navigation-link'])}>
                                Phim mới nhất
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={clsx(style['navigation-link'])}>
                                Phim bộ
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={clsx(style['navigation-link'])}>
                                Phim lẻ
                            </Link>
                        </li>
                        <li>
                            <Menu typeMenu content={menuItem}>
                                <Link to="/" className={clsx(style['navigation-link'])}>
                                    Thể loại
                                    <FontAwesomeIcon icon={faChevronDown} className={clsx(style['navigation-link-icon'])}/>
                                </Link>
                            </Menu>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={clsx(style['search-login'])}>
                <div className={clsx(style['wrap-input'])}>
                    <input type="text" placeholder="Tìm kiếm" className={clsx(style['input'])} />
                    <button className={clsx(style['search-btn'])}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <Menu menuLanguage contentLang={menuLanguage}>
                    <div className={clsx(style['language'])}>
                        <FontAwesomeIcon icon={faGlobe} />
                        Language
                    </div>
                </Menu>
                <div className={clsx(style['register'])}>
                    <FontAwesomeIcon icon={faUser} />
                    Register
                </div>
            </div>
        </header>
    );
}

export default Header;
