import React from 'react'
import {FaCocktail, FaHiking , FaShuttleVan,FaBeer} from 'react-icons/fa';
const Service = () => {

    const services =[
        {
            icon:<FaCocktail/>,
            title: "Free CockTail",
            info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
        },
        {
            icon:<FaHiking/>,
            title: "Endless Hiking",
            info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
        },
        {
            icon:<FaShuttleVan/>,
            title: "Free Shuttle",
            info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
        },
        {
            icon:<FaBeer/>,
            title: "Unlimited Beer",
            info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
        },

    ];

    return (
        <div className="container-fluid services" style={{marginTop: '5rem'}}>
            <div className="row">
            {services.map((item, index) => {
                return(
                    <div className="col-md-4 col-lg-3 col-12 mx-auto my-3" key={index}>
                        <div className="card shadow-lg border-0 p-4">
                            <article className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                            </article>              
                    </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Service;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {

// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);