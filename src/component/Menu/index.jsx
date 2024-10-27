import Tippy from '@tippyjs/react/headless';
import style from './Menu.module.scss';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { changeCountry } from '../../store/Action';

function Menu({ children, typeMenu=false, menuLanguage=false, content=false,contentCountry=false, contentLang=false}) {
    const dispatch = useDispatch();
    const classes = clsx(style.menu, {
        [style.content] : content,
        [style.menuLanguage] : menuLanguage,
        [style.contentCountry] : contentCountry
    })
    

    const handleSelecCountry = (country) => {
        dispatch(changeCountry({name: country}));  
    }

    const renderContent = () => {
        return (
            content.map((item, index) => {
                return (
                    <Link key={index} target='_blank' to={`/genremovie/${item.name}`} className={clsx(style['menu-item'])}>
                        {item.name}
                    </Link>
                )
            })
        )
    }

    const renderCountry = () => {
        return (
            contentCountry && contentCountry.map((item, index) => {
                return (
                    <div key={index} className={clsx(style['menu-item'])}
                        onClick={() => {
                            handleSelecCountry(item.iso_3166_1);
                        }}
                    >
                        {item.native_name}  
                    </div>
                )
            })
        )
    }

    const renderContentLang = () => {
        return (
            contentLang && contentLang.map((item, index) => {
            return (
                <Link to='/' key={index} className={clsx(style['menu-item'])}>
                    {item.name} 
                </Link>
            )
        }))
    }

    var place;
    if(typeMenu){
        place = 'bottom-start';
    }else{
        place = 'top';
    }
    

    return (
        <div>
            <Tippy
                placement={place}
                interactive={true}
                render={(attrs) => {
                    return (
                        <div className={classes} {...attrs} tabIndex="-1">
                            {
                                content ? renderContent() : (contentCountry ? renderCountry() : renderContentLang())
                            }
                        </div>
                    );
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
