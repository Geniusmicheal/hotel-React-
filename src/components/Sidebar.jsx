import { useContext,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ServiceContext } from './../ContextApi';
import { useHistory } from 'react-router';
import '../css/Sidebar.css';
import {
    FaTimes,FaHome,FaUsers,FaQuestion,
    FaBuilding,FaWrench,FaArchive,FaHandshake,FaCalendarCheck,
    FaSignOutAlt,FaFileSignature,FaMoneyBillAlt,FaBriefcase,FaPowerOff
} from 'react-icons/fa';

const Sidebar = () => {
    const cardContext_ = useContext(ServiceContext);
    const { sidebar, setSidebar ,user,logout,showAlert,setUser } = cardContext_;
    const history =useHistory();
    const userLogout = async () => {
        try{
            await logout(setUser);
            history.push('/control');
        }catch{
            showAlert('Failed to logout','danger');
        }
    }

    // const [sidebar, setSidebar] = useState(true);
    
    return (
        <div className={sidebar ? "sidebar_responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={`${process.env.PUBLIC_URL}/deni_juliana.png`} alt="logo" />
                    {/* <h1>Codersbite</h1> */}
                </div>
                <i onClick={() => setSidebar(false)} id="sidebarIcon"><FaTimes/></i>
            </div>

            <div className="sidebar__menu">
                <NavLink className="sidebar__link" activeClassName="active_menu_link" exact to="/dashboard"> 
                    <i><FaHome/></i> Dashboard
                </NavLink>

                <h2>MNG</h2>
                <NavLink className="sidebar__link" activeClassName="active_menu_link" exact to="/dashboard/currencies"> 
                    <i><FaMoneyBillAlt/></i> Currencies
                </NavLink>

                <NavLink className="sidebar__link" activeClassName="active_menu_link" exact to="/dashboard/commission"> 
                    <i ><FaWrench/></i> Commission
                </NavLink>

                <NavLink className="sidebar__link" activeClassName="active_menu_link" exact to="/dashboard/users"> 
                    <i ><FaUsers/></i> Users
                </NavLink>

                <NavLink className="sidebar__link" activeClassName="active_menu_link" exact to="/dashboard/bookinglist"> 
                    <i ><FaBuilding/></i> Booked Hotels
                </NavLink>

                <div className="sidebar__logout" onClick={userLogout}>
                    <i><FaPowerOff/></i>
                    <a href="#">Log out</a>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;