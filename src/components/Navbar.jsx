import { useContext } from 'react';
import { ServiceContext } from '../ContextApi';
import { useLocation } from 'react-router';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavber';


const Navbar = () => {
    const cardContext_ = useContext(ServiceContext);
    const { user,logout,showAlert,setUser } = cardContext_;
    const location =useLocation();
    const check = document.getElementsByClassName('App_')[0]?.classList;
    if((location.pathname).includes("dashboard")){
        if(!check?.contains('App'))check?.add('App');
        return (<AdminNavbar/>);
    }else{
        if(check?.contains('App'))check?.remove('App');
    }
    
    return (
        <>
         { location.pathname=='/control'? '' : <UserNavbar/> } 
         </>
    );
}
export default Navbar;
