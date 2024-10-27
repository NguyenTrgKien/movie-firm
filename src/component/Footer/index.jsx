import clsx from 'clsx';
import style from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import logo from '../../assets/logo/logo.png';
import chPlay from '../../assets/logo/chPLay.png';
import google from '../../assets/logo/google.png';
import { faInstagram, faSquareFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className={clsx(style['wrapper'])}>
            <div className={clsx(style['header-logo-app'])}>
                <div className={clsx(style['header-logo-app-item'])}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={clsx(style['header-logo-app-item'])}>
                    <FontAwesomeIcon
                        icon={faSquareFacebook}
                        className={clsx(style['logo-icon-item'])}
                    />
                    <FontAwesomeIcon icon={faTwitter} className={clsx(style['logo-icon-item'])} />
                    <FontAwesomeIcon icon={faInstagram} className={clsx(style['logo-icon-item'])} />
                </div>
            </div>
            <div className={clsx(style['content-info'])}>
                <div className={clsx(style['content-info-item'])}>
                    <h4 className={clsx(style['content-info-item-title'])}>COMPANY</h4>
                    <Link className={clsx(style['content-info-item-link'])}>About</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Careers</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Contact</Link>
                </div>
                <div className={clsx(style['content-info-item'])}>
                    <h4 className={clsx(style['content-info-item-title'])}>SUPPORT</h4>
                    <Link className={clsx(style['content-info-item-link'])}>Contact Support</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Help Center</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Supported Devices</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Activate Your Device</Link>
                </div>
                <div className={clsx(style['content-info-item'])}>
                    <h4 className={clsx(style['content-info-item-title'])}>PARTNERS</h4>
                    <Link className={clsx(style['content-info-item-link'])}>Advertise with us</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Partners with us</Link>
                </div>
                <div className={clsx(style['content-info-item'])}>
                    <h4 className={clsx(style['content-info-item-title'])}>GET THE APPS</h4>
                    <Link className={clsx(style['content-info-item-link'])}>iOS</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Android</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Roku</Link>
                    <Link className={clsx(style['content-info-item-link'])}>Amazon file</Link>
                </div>
            </div>
            <div className={clsx(style['footer-app'])}>
                <Button btnHero noBgc>
                    <img
                        src={chPlay}
                        alt="logo chPlay"
                        className={clsx(style['footer-app-logo'])}
                    />
                    App Store
                </Button>
                <Button btnHero noBgc href='https://www.google.com.vn/?hl=vi'> 
                    <img
                        src={google}
                        alt="logo google"
                        className={clsx(style['footer-app-logo'])}
                    />
                    Google Play
                </Button>
            </div>
        </div>
    );
}

export default Footer;
