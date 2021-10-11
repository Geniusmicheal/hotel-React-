import { useContext } from 'react';
import '../css/Navbar.css';
import avatar from "../images/avatar.svg";
import { ServiceContext } from '../ContextApi';
import {FaBars,FaSearch,FaClock} from 'react-icons/fa';


const AdminNavbar = () => {
    const cardContext_ = useContext(ServiceContext);
    const { setSidebar } = cardContext_;

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => setSidebar(true)}>
                <i><FaBars/></i>
            </div>
            <div className="navbar__left">
                <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a className="active_link" href="#">  Admin </a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <i><FaSearch/></i>
                </a>
                <a href="#">
                    <i> <FaClock/></i>
                </a>
                <a href="#!">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
            </div>
      </nav>
    )
}

export default AdminNavbar
