import React from 'react'
import RoomsList from '../components/RoomsList';
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
function Rooms() {
    const location = useLocation();
    const headerDetail = {
        classname: 'roomsHero', 
        maintext: 'Available '+ ((location.pathname)==='/hotels'?'Hotels':'Rooms'),
        subtext:'Best in Class Room',
        path:'/',
        txtPath: "RETURN HOME"
    }
    return (
        <>
            <Header detail={headerDetail}/>
            <RoomsList typeOf= {(location.pathname)==='/hotels'?'hotels':'rooms'}/>
            {(location.pathname)==='/hotels'?(<Pagination/>):'' }

        </>
    )
}

export default Rooms
