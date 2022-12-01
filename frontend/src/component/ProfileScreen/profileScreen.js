// import React from "react";
// import {Outlet} from "react-router-dom";
// import {combineReducers, createStore} from "redux";
// import profileReducer from "../../reducers/profileReducer";
// import {Provider} from "react-redux";
import React, {useState, useEffect}  from "react";
import {useSelector, useDispatch} from "react-redux";
import UserProfile from "./userProfile";

// const reducer = combineReducers({
//     profile: profileReducer,
//
// });
// const store = createStore(reducer);
//
//
const ProfileScreen = () => {
    const profile = useSelector(state => state.profile);


    return(
        <>
            <UserProfile profile={profile} />
        </>
    )
}
export default ProfileScreen;