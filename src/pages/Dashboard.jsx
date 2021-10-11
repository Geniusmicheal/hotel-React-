import '../css/Main.css';
import hello from "../images/hello.svg";
import {FaUser,FaCalendar,FaVideo,FaThumbsUp,FaMoneyBillWave} from 'react-icons/fa';
// import Chart from "../charts/Chart";
const Dashboard = () => {

    return (
        <main>
            <div className="main__container">
                {/* <!-- MAIN TITLE STARTS HERE --> */}

                <div className="main__title">
                    <img src={hello} alt="hello" />
                    <div className="main__greeting">
                        <h1>Hello Codersbite</h1>
                        <p>Welcome to your admin dashboard</p>
                    </div>
                </div>

                {/* <!-- MAIN TITLE ENDS HERE --> */}

                {/* <!-- MAIN CARDS STARTS HERE --> */}
                <div className="main__cards">
                    <div className="card_">
                        <i className="text-lightblue"><FaUser/></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Subscribers</p>
                            <span className="font-bold text-title">578</span>
                        </div>
                    </div>

                    <div className="card_">
                        <i className="text-red"><FaCalendar/></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Times of Watching</p>
                            <span className="font-bold text-title">2467</span>
                        </div>
                    </div>

                    <div className="card_">
                        <i className="text-yellow"><FaVideo/></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Videos</p>
                            <span className="font-bold text-title">340</span>
                        </div>
                    </div>

                    <div className="card_">
                        <i className="text-green"><FaThumbsUp/></i>    
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Likes</p>
                            <span className="font-bold text-title">645</span>
                        </div>
                    </div>
                </div>
                {/* <!-- MAIN CARDS ENDS HERE --> */}

                {/* <!-- CHARTS STARTS HERE --> */}
                <div className="charts">
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Daily Reports</h1>
                                <p>Cupertino, California, USA</p>
                            </div>
                            <i><FaMoneyBillWave/></i>
                        </div>
                        {/* <Chart /> */}
                    </div>

                    <div className="charts__right">
                        <div className="charts__right__title">
                            <div>
                                <h1>Stats Reports</h1>
                                <p>Cupertino, California, USA</p>
                            </div>
                            <i><FaMoneyBillWave/></i>
                        </div>

                        <div className="charts__right__cards">
                            <div className="card1">
                                <h1>Income</h1>
                                <p>$75,300</p>
                            </div>

                            <div className="card2">
                                <h1>Sales</h1>
                                <p>$124,200</p>
                            </div>

                            <div className="card3">
                                <h1>Users</h1>
                                <p>3900</p>
                            </div>

                            <div className="card4">
                                <h1>Orders</h1>
                                <p>1881</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- CHARTS ENDS HERE --> */}
            </div>
        </main>

    );
}

export default Dashboard