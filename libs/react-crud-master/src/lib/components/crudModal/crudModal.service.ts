import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../rootReducer';


export async function create(url, rowData) {

    console.log(url);
    return axios.post(url, rowData)
}