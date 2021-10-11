import React from 'react'
import FeaturedRooms from '../components/FeaturedRooms';
import Header from '../components/Header';
import Services from '../components/Service';

function Home() {
    const headerDetail = {
        classname: 'defaultHero', 
        maintext: 'Luxurious Rooms',
        subtext:'Deluxe rooms starting at $300',
        path:'/rooms',
        txtPath: "RETURN HOME"
    }
    return (
        <>
            <Header detail={headerDetail}/>
            <Services/>
            <FeaturedRooms/>
        </>
    )
}

export default Home
