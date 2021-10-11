import { useLocation } from 'react-router';
import Sidebar from './Sidebar';
// import { FaFacebookSquare,FaLinkedin } from 'react-icons/fa';
// import {IoLogoYoutube} from 'react-icons/io';
// import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {

    const location =useLocation();
    if((location.pathname).includes("dashboard"))return (<Sidebar/>);
    return (
        <footer id="sticky-footer" className="bg-light text-dark-50">
            <div className="container py-1">
                <div className="my-auto">
                    <small>Copyright &copy; Micheal Developer</small>
                </div>
               
            </div>
        </footer>
    )
}
export default Footer

