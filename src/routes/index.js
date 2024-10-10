import Home from '../page/Home';
import Detailmovie from '../page/Detailmovie';
import WatchMovie from '../page/WatchMovie';
import GenreMovie from '../page/GenreMovie';

const publicRouter =[
    {
        to: '/',
        component: Home
    },
    {
        to: '/detailmovie/:id',
        component: Detailmovie
    },
    {
        to: '/watchmovie/:id',
        component: WatchMovie
    },
    {
        to: '/genremovie/:genre',
        component: GenreMovie
    }
]

export {publicRouter};