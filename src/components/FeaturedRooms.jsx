import { useContext } from 'react'
import { ServiceContext } from '../ContextApi';
import Room from './Room';

function FeaturedRooms() {
    const cardContext_ = useContext(ServiceContext);
    const {loading, roomData } = cardContext_;
    return (
 
        <section className="featured-rooms container">
            <div className="section-title">
                <h1>Featured Rooms</h1>
            </div>
        <div className="row">
            {!loading && roomData ? Object.entries(roomData).slice(0, 3).map((task, i ) =>
                <Room key={task[0]} room={task[1]}/>
            ) :'' }
        </div>
    </section>
    )
}

export default FeaturedRooms
