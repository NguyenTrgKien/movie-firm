import {FETCH_MOVIE_POPPULAR, FETCH_MOVIE_DETAIL, moviedetail} from '../Action';


export const initState = {
    listMovieLove: [],
    moviePoppular: {
        dataPoppularMovie: [],
        dataNewMovie: []
    },
    movieDetail: {
        dataDetailMovie: [],
        dataCastCrew: [],
        dataSimilar: []
    }

};

const RootReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_MOVIE_DETAIL:
            return {
                ...state,
                movieDetail: {
                    dataDetailMovie: action.payload[0],
                    dataCastCrew: action.payload[1],
                    dataSimilar: action.payload[2]
                }
            }
        case FETCH_MOVIE_POPPULAR:
            return {
                ...state,
                moviePoppular: {
                    dataPoppularMovie: action.payload[0],
                    dataNewMovie: action.payload[1]
                }
            }
        case 'LIKEMOVIE_ACTION':
            if(state.listMovieLove.includes(action.payload)){
                return {
                    listMovieLove : state.listMovieLove.filter((item) => item !== action.payload)   
                }
            }else{
                return {
                    listMovieLove: [...state.listMovieLove, action.payload]
                };
            }
        default:
            return state;
    }
};

export default RootReducer;
