import * as types from './types';

/* show Users fetched from server for later use....*/
export const setData = (data) => {
    return {
        type: types.SETDATA,
        allAlbums: data
    }
}