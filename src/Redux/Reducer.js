
import {DELETE_AUTHOR, FAIL_REQUEST , GET_AUTHOR_LIST,  MAKE_REQUEST,ADD_AUTHOR,UPDATE_AUTHER,GET_AUTHOR_OBJ,ADD_BOOK,GET_BOOK_LIST,GET_AUTHOR_DETAILS,UPDATE_BOOK} from "./ActionType"

const initialstate = {
    loading: true,
    authorlist: [],
    authorobj: {},
    errmessage: ''
}

export const Reducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errmessage: action.payload
            }
        case GET_AUTHOR_LIST:
            return {
                loading: false,
                errmessage: '',
                authorlist:action.payload,
                authorobj:{}
            }
            case DELETE_AUTHOR:return{
                ...state,
                loading:false
            }
            case ADD_AUTHOR:return{
                ...state,
                loading:false
            }
            case UPDATE_AUTHER:return{
                ...state,
                loading:false
            }
            case GET_AUTHOR_OBJ:return{
                ...state,
                loading:false,
                userobj:action.payload
            }
            case ADD_BOOK:return{
                ...state,
                loading:false
            }
            case GET_BOOK_LIST:
                return {
                    loading: false,
                    errmessage: '',
                    booklist:action.payload,
                    authorobj:{}
                }
            case GET_AUTHOR_DETAILS:return{
                ...state,
                loading:false,
                detailobj:action.payload
            }
            case UPDATE_BOOK:return{
                ...state,
                loading:false
            }
        default: return state
    }
}