import style from './Button.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

function Button({children, btnHero=false, btnSmall=false, btnMedium=false, active=false, detailInfo, to=''}) {

    let classes = clsx(style.button, {
        [style.btnHero]: btnHero,
        [style.btnSmall] : btnSmall,
        [style.detailInfo]: detailInfo,
        [style.btnMedium]: btnMedium ,
        [style.active]: active
    })

    if(detailInfo){
        classes = clsx(style.detailInfo);
    }else if(btnMedium && active){
        classes = clsx({
            [style.btnMedium]: btnMedium,
            [style.active]: active
        });
    }
    else if(btnMedium){
        classes = clsx(style.btnMedium);
    }

    let Comp = 'div';
    if(to){
        Comp = Link;
    }
    return (  
        <Comp className={classes} to={to}>
            {children}
        </Comp>
    );
}

export default Button;