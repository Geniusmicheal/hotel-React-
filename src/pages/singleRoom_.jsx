import { useContext, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { ServiceContext } from '../ContextApi';
import StyledHero from '../components/StyledHero';
import defaultBcg from '../images/room-3.jpeg';
import Room from '../components/Room';
import { PaystackButton } from 'react-paystack';

function SingleRoom({match}) {
    const location = useLocation();
    const path = (location.pathname).split('/');
    const cardContext_ = useContext(ServiceContext);
    const {hotelData, roomData,currencies, commission,user,setUser } = cardContext_;
    const data_ = (path[1]==='hotels'?hotelData:roomData);
    const check = (user && user?.isAdmin === false)?true :false;

    const [email, setEmail] = useState(user?.email);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [phone, setPhone] = useState(user?.phoneNumber);
    const [occassion, setOccassion] = useState('');

    if(roomData== null || !data_[match.params.slug]){
        return (<div className="container roomerror">
            <div className="row my-5">
                <div className="col-md-6 col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4 error">
                        <h1 className="text-center display-4">SORRY</h1>
                        <h3>No such {path[1]==='hotels'?'hotel': 'room' } could be found...</h3>
                        <Link to="/{{path[1]}" className="btn btn-warning_ mt-4 ">Back to {path[1]}</Link>
                    </div> 
                </div>
            </div>
        </div>);
    }

    const roomDetail = data_[match.params.slug];
    const hotelDetail = hotelData[roomDetail.hotelID]?hotelData[roomDetail.hotelID]: roomDetail;
    let rate = roomDetail?.rates ? roomDetail?.rates[0]?.retailRate?.total : '';

    if(rate){
        const getCommission = ((rate?.amount*commission)/100)+rate?.amount;
        const getCurrencyExchange = [currencies[rate?.currency?.code], currencies['NGN']];
        const toLocalExchange = ((1/getCurrencyExchange[0]?.rate)*getCommission)*getCurrencyExchange[1]?.rate;
        rate = {
            amount:parseFloat(toLocalExchange.toFixed(2)),
            symbol: getCurrencyExchange[1]?.symbol
        }
    }

    // you can call this function anything
    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        //         message: "Approved"
        // redirecturl: "https://gqpayapi.goquo.net/PayStack/BEResult/?trxref=1633339477603"
        // reference: "1633339477603"
        // status: "success"
        // trans: "1366331408"
        // transaction: "1366331408"
        // trxref: "1633339477603"
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

        
    const componentProps = {
        reference: (new Date()).getTime().toString(),
        email, amount: rate?.amount*100,  //Math.ceil(rate?.amount)00,
        metadata: { name: firstName+' '+lastName,  phone, },
        publicKey: 'pk_test_c4ad3f51065d927c0283318dc1d58acda391508c',
        text: 'Book Now',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };
    
    return (
        <>
            <StyledHero img={roomDetail?.images[0]?.url || defaultBcg }>   
                <div className="banner">
                    <h1>{roomDetail?.name}</h1>  
                    <p>{hotelDetail?.name}</p>
                    <Link to="/rooms" className="btn btn-primary_">Back To Rooms</Link>
                </div>
            </StyledHero>
            <section className="single-room container">
               <div className="row">
                    {[...new Set([...roomDetail?.images,...hotelDetail?.images])].map((item,index) => {
                        return (
                        <div className="col-md-4 col-12 mx-auto" key={index} style={{paddingBottom: 'calc(var(--bs-gutter-x) * 1)'}}>
                            <div className="card border-0 shadow-lg">
                               <img key={index} src={item.url} alt={item.altText} className="img-fluid" style={{maxHeight:'318px'}}/>
                            </div>
                        </div>)
                    })}
               </div>

               <div className="single-room-info">
                    <article className="desc">
                        <h3>Details</h3>
                        <p>{hotelDetail?.description?.short}</p>
                        {roomDetail===hotelDetail?'':
                        (<p>{roomDetail?.description}</p>)}

                        <table className="table">
                            <thead className="thead-light">
                                <tr><th colSpan="2">Address</th></tr>
                                <tr>
                                    <th>Line One</th>
                                    <td>{hotelDetail?.address?.line1}</td>
                                </tr>

                                <tr>
                                    <th>Line Two</th>
                                    <td>{hotelDetail?.address?.line2}</td>
                                </tr>

                                <tr>
                                    <th>Postal Code</th>
                                    <td>{hotelDetail?.address?.postalCode}</td>
                                </tr>

                                <tr>
                                    <th>City</th>
                                    <td>{hotelDetail?.address?.city}</td>
                                </tr>

                                <tr>
                                    <th>Country</th>
                                    <td>{hotelDetail?.address?.countryName}</td>
                                </tr>                                
                            </thead>
                        </table>
                    </article>

                    <article className="info">
                        <h3>Info</h3>
                        <table className="table">
                            <thead className="thead-light">

                                <tr>
                                    <th>Hotel Name</th>
                                    <td>{hotelDetail?.name}</td>
                                </tr>
                                {roomDetail===hotelDetail?'': (<>
                                    <tr>
                                        <th>Room Type</th>
                                        <td>{roomDetail?.name}</td>
                                    </tr>

                                    <tr>
                                        <th>Max occupancy</th>
                                        <td>{roomDetail?.maxOccupancy} Person(s)</td>
                                    </tr>

                                    <tr>
                                        <th>Price</th>
                                        <td>{rate?.symbol}{rate?.amount}k</td>
                                    </tr>
                                    <tr>
                                        <th>Check-in</th>
                                        <td>
                                            {(new Date(roomDetail?.rates[0]?.start)).toDateString()} {(new Date("February 04, 2011 "+hotelDetail?.checkIn?.from)).toLocaleString('en-US',{
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Check-Out</th>
                                        <td>{(new Date(roomDetail?.rates[0]?.end)).toDateString()} {(new Date("February 04, 2011 "+hotelDetail?.checkOut?.to)).toLocaleString('en-US',{
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}
                                        </td>
                                    </tr>
                                </>)}
                                <tr>
                                    <th>Star Rating</th>
                                    <td>{hotelDetail.starRating}</td>
                                </tr>  
                                <tr>
                                    <th>Phone Numbers</th>
                                    <td>{(hotelDetail.phoneNumbers).join(',')}</td>
                                </tr>     
                                                    
                                <tr>
                                    <th>Email</th>
                                    <td>{(hotelDetail.emails).join(',')}</td>
                                </tr>               
                            </thead>
                        </table>
                    </article>
                
                    <article className="info">
                        <div class="card">
                            <div class="card-header">Header</div>
                            <div class="card-body">
                           
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label>Firstname</label>
                                    <input type="text" className="form-control" placeholder="Firstname" value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>
                                </div> 

                                <div className="form-group mt-3">
                                    <label>Lastname </label>
                                    <input type="text" className="form-control" placeholder="Lastname" value={lastName} required onChange={(e) => setLastName(e.target.value)}/>
                                </div> 

                                <div className="form-group mt-3">
                                    <label>Special Occassion</label>
                                    <textarea rows="10" placeholder="Notes a guest has entered as they made the book can be added here. This allows you to display a free text field to your guests where they can enter any information they want to communicate to the hotel (e.g. that their booking is for a special occassion or that they have a particular room preference)." className="form-control" defaultValue={occassion} required onChange={(e) => setOccassion(e.target.value)}></textarea>
                                </div>

                            </div>
                            <div class="card-footer">
                                <PaystackButton {...componentProps} className="btn btn-outline-primary btn-block btn-lg float-end "/>
                            </div>
                        </div>
                    </article>
                </div>

            </section>
            {roomDetail!==hotelDetail?'':
                <section className="room-extras">
                {/* <section className="container"> */}
                    <h3>Our Rooms</h3>
                
            
                    <div className="row my-5">
                    { hotelDetail['roomTypes'].map((task, i) =>{
                        task['type']= 'rooms';
                        return (<Room key={task.roomTypeId} room={task}/>);
                    }
                ) }
                    </div>
                </section>
            }
            <section className="room-extras">
                <h3>Extras</h3>
                <ul className="extras">
                    {([...new Set([...roomDetail?.amenities,...hotelDetail?.amenities])]).map((item,index) => {
                        return <li key={index}>{item?.formatted}</li>
                    })}
                </ul>
                <div className="p-4 clearfix">
                    <div className="row">
                        <div className="col-md-12 col-12 ml-auto">
                        {roomDetail===hotelDetail?'':
                            check?'':(<Link to={`/login`} className="btn btn-outline-primary btn-block btn-lg float-end ">Book Now</Link>)
                        }
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

export default SingleRoom
