import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

const CheckHeader = ({children}) => {

    const location = useLocation()
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        (location.pathname === '/loginRegister') ? setShowHeader(false) 
                                                : setShowHeader(true)
    }, [location])

    return (
        <div>
            {showHeader && children}
        </div>
    );
}

export default CheckHeader;