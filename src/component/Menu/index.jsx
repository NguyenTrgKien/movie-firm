import Tippy from '@tippyjs/react/headless';
import style from './Menu.module.scss';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

function Menu({ children, typeMenu=false, menuLanguage=false, content=[], contentLang=[]}) {
    const classes = clsx(style.menu, {
        [style.typeMenu] : typeMenu,
        [style.menuLanguage] : menuLanguage
    })
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

    const renderContentLang = () => {
        return (
            contentLang.map((item, index) => {
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
                            {renderContent()}
                            {renderContentLang()}   
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
