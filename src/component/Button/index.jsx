import style from './Button.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

function Button({children, btnHero=false, btnSmall=false, btnMedium=false, active=false, detailInfo, to='', href='', noBgc=false}) {

    let classes = clsx(style.button, {
        [style.btnHero]: btnHero,
        [style.btnSmall] : btnSmall,
        [style.detailInfo]: detailInfo,
        [style.btnMedium]: btnMedium ,
        [style.active]: active,
        [style.noBgc] : noBgc
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
    }else if(href){
        Comp = 'a';
    }
    return (  
    <Comp className={classes} {...(href ? {href} : {to})} target='_blank'>
            {children}
        </Comp>
    );
}

export default Button;