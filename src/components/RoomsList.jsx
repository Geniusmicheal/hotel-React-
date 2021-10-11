import { useContext } from 'react';
import { ServiceContext } from '../ContextApi';
import Room from './Room';
import notfound from '../images/notfound.svg';

function RoomsList(typeOf) {
    const type= typeOf.typeOf; 
    const cardContext_ = useContext(ServiceContext);
    const {loading, roomData,hotelData } = cardContext_;
    const rooms= type==='hotels'?hotelData:roomData ;
    
    if(rooms &&  Object.keys(rooms).length > 1 ){
        return (
            <section className="container">
                <div className="row my-5">
                {!loading && rooms ? Object.entries(rooms).map((task, i ) =>
                    task[0] ==='pagination'? '' : (<Room key={task[0]} room={task[1]}/>) 
               ) :'' }
                </div>
            </section>
        );
   
    }
    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0 p-4">
                <div className="row">
                    <div className="col-md-6 col-12 my-auto">
                        <img src={notfound}  alt="not found" className="img-fluid"/>
                    </div>
                    <div className="col-md-6 col-12 mx-auto">
                        <div className="empty-search">
                            <h3 className="display-4">Unfortunately no {type} matched your search parameters</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
     
}

export default RoomsList
