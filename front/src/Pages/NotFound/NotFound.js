import React from "react";
import {useLocation} from "react-router-dom";
import NotFoundAnimation from "../../Assets/Animations/404/NotFoundAnimation";

export default function NotFound() {

    const location = useLocation();

    return (
        <div>
            <NotFoundAnimation/>
            <p>Could not find {location.pathname}</p>
        </div>
    )
}