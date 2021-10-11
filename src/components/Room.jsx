import {useContext} from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';

import { ServiceContext } from '../ContextApi';
const Room = ({room}) => {
    const cardContext_ = useContext(ServiceContext);
    const {currencies, commission } = cardContext_;
    const { images, roomTypeId,name,rates, type  } = room;
    let rate = rates? rates[0]?.retailRate?.total : '';
    if(rate){
        const getCommission = ((rate?.amount*commission)/100)+rate?.amount;
        const getCurrencyExchange = [currencies[rate?.currency?.code], currencies['NGN']];
        const toLocalExchange = ((1/getCurrencyExchange[0]?.rate)*getCommission)*getCurrencyExchange[1]?.rate;
        rate = {
            amount:parseFloat(toLocalExchange.toFixed(2)),
            symbol: getCurrencyExchange[1]?.symbol
        }
    }
  
    return (
        <div className="col-md-4 col-12 mx-auto p-2">
            <div className="card shadow-lg border-0 room">
                <img src={images[0].url || defaultImg} alt="single room" className="img-fluid"  style={{height: "280px"}}/>
                <div className="price-top">
                    <h6>{rate?.symbol}{rate?.amount}k</h6>
                    <p>per night</p>
                </div>
                <Link to={`/${type}/${roomTypeId}`} className="btn-warning_ room-link text-center" >Features</Link>
                <p className="room-info">{name}</p>
            </div>
        </div>
    )
}
export default Room;