const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';

export const FETCH_MOVIE_NAMECOUNTRY = 'FETCH_MOVIE_NAMECOUNTRY';
export const FETCH_CHANGE_COUNTRY = 'FETCH_CHANGE_COUNTRY';
export const FETCH_MOVIE_POPULAR = 'FETCH_MOVIE_POPULAR';
export const FETCH_MOVIE_FAIL = 'FETCH_MOVIE_FAIL';
export const FETCH_MOVIE_DETAIL = 'FETCH_MOVIE_DETAIL';
export const FETCH_MOVIE_TRAILER = 'FETCH_MOVIE_TRAILER';
export const FETCH_MOVIE_NEWMOVIE = 'FETCH_MOVIE_NEWMOVIE';
export const FETCH_NAMEGENRE_MOVIE = 'FETCH_NAMEGENRE_MOVIE';
export const FETCH_LISTGENRE_MOVIE = 'FETCH_LISTGENRE_MOVIE';

export const fetchChangeCountry = (changeCountry) => {
    return {
        type: 'FETCH_CHANGE_COUNTRY',
        payload: changeCountry
    }
}

export const fetchMovieNameCountry = (movieNameCountry) => {
    return {
        type: 'FETCH_MOVIE_NAMECOUNTRY',
        payload: movieNameCountry
    }
}

export const fetchMoviePoppular = (moviedetail) => {
    return {
        type: 'FETCH_MOVIE_POPULAR',
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

export const fetchMovieTrailer = (movieTrailer) => {
    return {
        type: 'FETCH_MOVIE_TRAILER',
        payload: movieTrailer
    }
}
export const fetchNewMovie = (newMovie) => {
    return {
        type: 'FETCH_MOVIE_NEWMOVIE',
        payload: newMovie
    }
}
export const fetchNameGenre = (nameGenre) => {
    return {
        type: 'FETCH_NAMEGENRE_MOVIE',
        payload: nameGenre
    }
}
export const fetchListGenre = (listGenre) => {
    return {
        type: 'FETCH_LISTGENRE_MOVIE',
        payload: listGenre
    }
}

export const changeCountry = (country) => {
    return async (dispatch) => {
        try{
            dispatch(fetchChangeCountry(country));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}

export const movieNameCountry = () => {
    return async (dispatch) => {
        try{
            // Lấy danh sách tên tất cả các quôc gia
            const getNameCountry =  await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}&language=vi-VN`);
            const data = await getNameCountry.json();
            const dataNameCountry = data.filter((country) => ['US','GB','IN','VN','KR','JP','TW','FR','CN'].includes(country.iso_3166_1))

            dispatch(fetchMovieNameCountry(dataNameCountry));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}


// Lấy những danh sách bộ phim nổi tiếng
export const moviesPoppular = (country) => {
    return async (dispatch) => {
        try {
            // url lấy list bộ phim đang thịnh hành
            const urlPoppularMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&region=${country}&language=vi-VN`; 
            // Lấy danh sách những bộ phim mới
            const urlNewMovie = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=${country}&language=vi-VN`; 
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

// Lấy chi tiết phim
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

// Lấy trailer phim
export const movieTrailer = (id) => {
    return async (dispatch) => {
        try{
            const getTrailerMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
            const dataTrailerMovie = await getTrailerMovie.json();
            dispatch(fetchMovieTrailer(dataTrailerMovie));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}

// Lấy danh sách phim mới nhất
export const newMovie = (country) => {
    return async (dispatch) => {
        try{
            const getNewMovie = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=${country}&language=en-US&page=1`) ;
            const dataNewMovie = await getNewMovie.json();
            dispatch(fetchNewMovie(dataNewMovie));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}

// Lấy danh sách tên thể loại phim
export const nameGenre = () => {
    return async (dispatch) => {
        try{
            const getGenreMoves = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=vi-VN`
            );
            const dataNameGenre = await getGenreMoves.json();
            dispatch(fetchNameGenre(dataNameGenre));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}
// Lấy danh sách phim theo thể loại
export const listGenre = (id) => {
    return async (dispatch) => {
        try{
            const getGenreMove = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=vi-VN`
            );
            const dataListGenre = await getGenreMove.json();
            dispatch(fetchListGenre(dataListGenre));
        }catch(error){
            dispatch(fetchMovieFail(error.message));
        }
    }
}