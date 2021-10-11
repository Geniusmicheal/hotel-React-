import React from 'react'
import { Link } from 'react-router-dom'
import RoomFilter from './RoomFilter';

const Header = ({detail}) => {
    const { classname, maintext,subtext,path,txtPath  } = detail;
    return (
        <>
            <header className={classname}></header>
            <div className="banner">
                <h1>{maintext}</h1>  
           
                <p>{subtext}</p>
                <Link to={path} className="btn btn-warning_">{txtPath}</Link>
            </div>
            <RoomFilter/>
        </>
    )
}

export default Header
