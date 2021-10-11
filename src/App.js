import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServiceContextState from './ContextApi';
import Footer from './components/Footer';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';

import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard';
import Control from './pages/Control';
import Currencies from './pages/Currencies';
import Charge from './pages/Charge';
import Users from './pages/Users';
import Header from './components/Header';

function App() {
    const headerDetail = {
        classname: 'roomsHero', 
        maintext: 'Page Not Found',
        subtext:"We looked everywhere, but couldn't find the page you requested. Shall we start a new exploration?",
        path:'/',
        txtPath: "RETURN HOME"
    }
    return (
        <div className="App_">
            <Router> 
                <ServiceContextState>
                    <Navbar/>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/dashboard/currencies" component={Currencies} />
                        <PrivateRoute exact path="/dashboard/commission" component={Charge} />
                        <PrivateRoute exact path="/dashboard/users" component={Users} />
                        
                        <Route exact path="/control" component={Control} />
                        <Route exact path="/" component={Home} />
                        {/* <Route exact path="/about" component={About} /> */}
                        <Route exact path="/login" component={Login} />
                        <Route exact path={["/rooms", "/hotels"]} component={Rooms} />
                        {/* <Route exact path="/contact" component={Contact} /> */}
                        <Route exact path={["/rooms/:slug", "/hotels/:slug"]} component={SingleRoom} />
                        <Route render={props => (<Header detail={headerDetail}/>)} />
                    </Switch>
                    <Footer/>
                </ServiceContextState>
           
            </Router>
        </div>
          
    );
}

export default App;

// // 'X-Signature:'$(echo -n ${apiKey}${secret}$(date +%s)|sha256sum|awk '{ print $1}')'' \
// https://api.test.hotelbeds.com/hotel-api/1.0/status