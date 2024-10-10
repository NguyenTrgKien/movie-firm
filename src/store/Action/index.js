const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';

export const FETCH_MOVIE_POPPULAR = 'FETCH_MOVIE_POPPULAR';
export const FETCH_MOVIE_FAIL = 'FETCH_MOVIE_FAIL';
export const FETCH_MOVIE_DETAIL = 'FETCH_MOVIE_DETAIL';

export const fetchMoviePoppular = (moviedetail) => {
    return {
        type: 'FETCH_MOVIE_POPPULAR',
        payload: moviedetail,
    };
};

export const fetchMovieFail = (error) => {
    return {
        type: 'FETCH_MOVIE_FAIL',
        payload: error,
    };
};

export const fetchMovieDetail = (moviedetail) => {
    return {
        type: 'FETCH_MOVIE_DETAIL',
        payload: moviedetail,
    };
};

export const moviesPoppular = () => {
    return async (dispatch) => {
        try {
            const urlPoppularMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=vi-VN`; // url lấy list bộ phim đang thịnh hành
            const urlNewMovie = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=vi-VN`;
            const [getPoppularMovie, getNewMovie] = await Promise.all([
                fetch(urlPoppularMovie),
                fetch(urlNewMovie),
            ]);
            const dataPoppularMovie = await getPoppularMovie.json();
            const dataNewMovie = await getNewMovie.json();

            dispatch(fetchMoviePoppular([dataPoppularMovie.results, dataNewMovie.results]));
        } catch (error) {
            dispatch(fetchMovieFail(error.message));
        }
    };
};

export const moviedetail = (id) => {
    return async (dispatch) => {
        try {
            const urlDetailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=vi-VN`; // Lấy chi tiết phim
            const urlListCast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`; // Lấy danh sách diễn viên
            const urlSimilar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1&language=vi-VN`;
            const [responseDetailMovie, responseCast, responseSimilar] = await Promise.all([
                fetch(urlDetailMovie),
                fetch(urlListCast),
                fetch(urlSimilar),
            ]);
            const dataDetailMovie = await responseDetailMovie.json();
            const dataCastCrew = await responseCast.json();
            const dataSimilar = await responseSimilar.json();
            dispatch(fetchMovieDetail([dataDetailMovie, dataCastCrew, dataSimilar]));
        } catch (error) {
            dispatch(fetchMovieFail(error.message));
        }
    };
};
