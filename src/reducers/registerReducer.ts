
import actionTypes, {REGISTER_ERROR, REGISTER_SUCCESS} from "../actions/actionTypes";
import initialState from "./initialState";

export default function(state = initialState.register, action: any) {
    let newState;
    switch(action.type) {
        case actionTypes.REGISTER_SUCCESS:
            newState = {...state, status: REGISTER_SUCCESS};
            return newState;
        case actionTypes.REGISTER_ERROR:
            newState = {...state, status: REGISTER_ERROR};
            return newState;
        default:
            return state;
    }
}