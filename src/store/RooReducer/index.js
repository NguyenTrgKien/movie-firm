import {
    FETCH_MOVIE_POPULAR,
    FETCH_MOVIE_DETAIL,
    FETCH_MOVIE_TRAILER,
    FETCH_MOVIE_NEWMOVIE,
    FETCH_NAMEGENRE_MOVIE,
    FETCH_LISTGENRE_MOVIE,
    FETCH_MOVIE_NAMECOUNTRY,
    FETCH_CHANGE_COUNTRY
} from '../Action';

export const initState = {
    listMovieLove: [],
    moviePoppular: {
        dataPoppularMovie: [],
        dataNewMovie: [],
    },
    movieDetail: {
        dataDetailMovie: false,
        dataCastCrew: false,
        dataSimilar: false,
    },
    dataMovieTrailer: false,
    dataNewMovie: false,
    dataNameGenre: false,
    dataListGenre: false,
    dataNameCountry: false,
    listCountry: {
        name: 'VN'
    }
};

const RootReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_CHANGE_COUNTRY:
            return {
                ...state,
                listCountry: action.payload
            }
        case FETCH_MOVIE_NAMECOUNTRY:
            return {
                ...state,
                dataNameCountry: action.payload     
            }
        case FETCH_LISTGENRE_MOVIE:
            return {
                ...state,
                dataListGenre: action.payload
            }
        case FETCH_NAMEGENRE_MOVIE:
            return {
                ...state,
                dataNameGenre: action.payload
            }
        case FETCH_MOVIE_NEWMOVIE:
            return {
                ...state,
                dataNewMovie: action.payload,
            };
        case FETCH_MOVIE_TRAILER:
            return {
                ...state,
                dataMovieTrailer: action.payload,
            };
        case FETCH_MOVIE_DETAIL:
            return {
                ...state,
                movieDetail: {
                    dataDetailMovie: action.payload[0],
                    dataCastCrew: action.payload[1],
                    dataSimilar: action.payload[2],
                },
            };
        case FETCH_MOVIE_POPULAR:
            return {
                ...state,
                moviePoppular: {
                    dataPoppularMovie: action.payload[0],
                    dataNewMovie: action.payload[1],
                },
            };
        case 'LIKEMOVIE_ACTION':
            if (state.listMovieLove.includes(action.payload)) {
                return {
                    listMovieLove: state.listMovieLove.filter((item) => item !== action.payload),
                };
            } else {
                return {
                    listMovieLove: [...state.listMovieLove, action.payload],
                };
            }
        default:
            return state;
    }
};

export default RootReducer;
