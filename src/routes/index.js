import Home from '../page/Home';
import Detailmovie from '../page/Detailmovie';
import FormRegister from '../page/FormRegister';

const publicRouter =[
    {
        to: '/',
        component: Home
    },
    {
        to: '/detailmovie',
        component: Detailmovie
    },
    {
        to: '/formregister',
        component: FormRegister
    }
]

export {publicRouter};