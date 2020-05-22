import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';

// constants
export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHNAGE_LOADING = 'home/rank/CAHNGE_LOADING';

// actionCreators
const changeRankList = (data) => ({
    type: CHANGE_RANK_LIST,
    data: fromJS(data)
})

const changeLoading = (data) => ({
    type: CHNAGE_LOADING,
    data
})

export const getRankList = () => {
    return dispatch => {
        getRankListRequest().then(data => {
            let list = data && data.list;
            dispatch(changeRankList(list))
            dispatch(changeLoading(false))
        })
    }
}


// reduecer
const defaultState = fromJS({
    rankList: [],
    loading: true,
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        case CHNAGE_LOADING:
            return state.set('loading', action.data);
        default:
            return state
    }
}

export { reducer };