import { combineReducers } from "redux";
import AlbumReducer from "./AlbumReducer";

export default combineReducers({
    album_reducer: AlbumReducer
});
