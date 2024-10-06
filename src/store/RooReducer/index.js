export const initState = {
    listMovieLove: [],
};

const RootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LIKEMOVIE_ACTION':
            return {
                listMovieLove: [...state.listMovieLove, action.payload],
            };
        default:
            return state;
    }
};

export default RootReducer;
