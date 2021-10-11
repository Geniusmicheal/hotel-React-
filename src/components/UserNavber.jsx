import {Link, NavLink} from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import jquery from 'jquery';
import { useContext } from 'react';
import { ServiceContext } from '../ContextApi';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

// for changing navbar  color
jquery(window).scroll(function() {
jquery('nav').toggleClass('scrolled', jquery(this).scrollTop() > 0);
})

const UserNavbar = () => {
    const cardContext_ = useContext(ServiceContext);
    const { user,logout,showAlert,setUser } = cardContext_;
    const history =useHistory();
    const location = useLocation();
    if((location.pathname)==='/login'){
        const navbar =document.querySelector('.navbar');
        if (navbar && navbar.classList.contains('bg-transparent')){
            navbar.classList.remove('bg-transparent');
            navbar.classList.add('bg-dark');
        }
       
    }
    const navbar_menu_button = () => {
        const navbarSupportedContent =document.getElementById("navbarSupportedContent");
        navbarSupportedContent.classList.toggle("show");
    }
    const check = (user && user?.isAdmin === false)?true :false;
    const userLogout = async () => {
        try{
            await logout(setUser);
            history.push('/');
        }catch{
            showAlert('Failed to logout','danger');
        }
    }
    return (
    <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent pb-2 fixed-top">
            {/* <div className="container-fluid "> */}
                <Link className="navbar-brand" to="/" >
                    <img  src={`${process.env.PUBLIC_URL}/deni_juliana.png`} className="img" />
                </Link>
                {/* <span className="navbar-brand font-weight-bolder">Travelslinks</span> */}
                <a  onClick={navbar_menu_button}  className="navbar-toggler border-0" style={{cursor: 'pointer'}}>
                    <span><FaAlignRight className="nav-icon" /></span>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active_class" exact to="/"> 
                                {!check?'Home': `Welcome  ${ user['firstName']? user['firstName'] : 'Guest'}`}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active_class" exact to="/hotels">Our Hotels</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active_class" exact to="/about">Airport transfer</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active_class" exact to="/contact">Apartments</NavLink>
                        </li>



                        {!check?(
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active_class" exact to="/login">Sign-in</NavLink>
                            </li>
                        ): ( <>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active_class"  to="/logine">Booked</NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" activeClassName="active_class"  onClick={userLogout}>Logout</a>
                            </li> 
                        </>)}
                    </ul>
                </div>
            {/* </div> */}
        </nav>
    </>
    );
}
export default UserNavbar;
