import style from './Button.module.scss';
import clsx from 'clsx';

function Button({children, btnHero=false}) {

    const classes = clsx(style.button, {
        [style.btnHero]: btnHero
    })

    console.log(classes);
    
    return (  
        <div className={classes}>
            {children}
        </div>
    );
}

export default Button;