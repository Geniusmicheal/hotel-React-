import { useContext, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { ServiceContext } from '../ContextApi';
import StyledHero from '../components/StyledHero';
import defaultBcg from '../images/room-3.jpeg';
import Room from '../components/Room';
import { PaystackButton } from 'react-paystack';
import Alert from '../components/Alert';
import Header from '../components/Header';

function SingleRoom({match}) {
    const location = useLocation();
    let [loader, setLoader] = useState(false);
    const path = (location.pathname).split('/');
    const cardContext_ = useContext(ServiceContext);
    const {hotelData, roomData,currencies, commission,user,setUser,insertQuery,showAlert,setAlert } = cardContext_;
    const data_ = (path[1]==='hotels'?hotelData:roomData);
    const check = (user && user?.isAdmin === false)?true :false;

    const headerDetail = {
        classname: 'roomsHero', 
        maintext: 'SORRY',
        subtext:`No such ${path[1]} could be found........`,
        path:`/${path[1]}`,
        txtPath: `Back to ${path[1]}`

    }

    if(roomData== null || !data_[match.params.slug]){
        return (
            <>
                <Header detail={headerDetail}/>
            </>
            );
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

    // Implementation for whatever you want to do with reference and after success call.
    const handlePaystackSuccessAction = async (reference) => {

        const bodyApi = {
            "start": roomDetail?.rates[0]?.start,
            "end": roomDetail?.rates[0]?.end,
            "bookingContact": {
                "firstName": user?.firstName,
                "lastName": user?.lastName,
                "email": user?.email
            },
            "notes":{"fromGuest":user?.occassion },
            "rooms": [{
                "rateId":roomDetail?.rates[0]?.rateId,
                "adults": parseInt(user?.numAdults),
                "notes":{"fromGuest":user?.occassion },
            }],
            "paymentType": "API"
        };
        const targetUrl ="https://www.9javiews.com.ng/api/bookings";
        // const proxyUrl ='https://thingproxy.freeboard.io/fetch/',
        // targetUrl = `https://sandbox.impala.travel/v1/bookings`;

        await fetch(targetUrl,{
            "method": "POST",
            "headers": { "Content-Type": "application/json",
              "X-API-KEY": "sandb_ChgX6KXGZOBrxKxoWMJGtypnsK91sossu7YstE6g"
            },
            "body":JSON.stringify(bodyApi)
        }).then(response => response.json()).then(data_ => {
            const getCurrencyExchange = [currencies[rate?.currency?.code], currencies['NGN']];
            const exchangeRateInNaria = (1/getCurrencyExchange[0]?.rate)*getCurrencyExchange[1]?.rate;
            const commissionInNaria = exchangeRateInNaria* ((rate?.amount*commission)/100);
            const userBookedData ={
                uid:user?.uid,
                bookedDetail:data_,
                paymentDetail:reference,
                roomDetail,hotelDetail,
                commissionDetail:{
                    exchangeRateInNaria,
                    commission: {commissionInNaria, commissionInPecentage: commission }
                }
            };

            let bookedRoom = {};
            const key = roomDetail?.rates[0]?.rateId;
            bookedRoom[key] = {
                start: roomDetail?.rates[0]?.start,
                end: roomDetail?.rates[0]?.end,
            };
            insertQuery('users',user,user?.uid);
            insertQuery('bookedRooms',bookedRoom,user.uid);
            insertQuery('bookedDetails',userBookedData,`${reference.reference}${reference.transaction}`);
            showAlert("Hotel booked successfully",'success');
            setLoader(false);
    
        }).catch(err => console.error(err) );

        

      };
  
    // implementation for  whatever you want to do when the Paystack dialog closed.
    const handlePaystackCloseAction = () => {
        setLoader(false);
    }

    const componentProps = {
        reference: (new Date()).getTime().toString(),
        email:user?.email, 
        amount: rate?.amount*100,  //Math.ceil(rate?.amount)00,
        currency: 'NGN',
        metadata: { 
            name: user?.firstName+' '+user?.lastName,  
            phone:user?.phoneNumber, 
        },
        publicKey: 'pk_test_c4ad3f51065d927c0283318dc1d58acda391508c',
        text: 'Book Now',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };
  

    const onHandleSubmit = (e) => {
        e.preventDefault(); setLoader(true);setAlert(null);
        const ele = e.target.elements; let user_ = user;
        for (let i = 0; i < ele.length; i++) user_[ele[i].name] = ele[i].value;
        localStorage.setItem('dhjsduijcxj', JSON.stringify(user_)); setUser(user_); 
        ele[6].click();
    }

    
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
               <Alert/>
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
                    {roomDetail===hotelDetail?'':(
                        <form className="info" onSubmit={onHandleSubmit}>
                            <div className="card">
                                <div className="card-header">Header</div>
                                <div className="card-body">
                            
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" className="form-control" placeholder="Email" name="email" defaultValue={user?.email} required/>
                                    </div>

                                    <div className="form-group mt-3">
                                        <label>Firstname</label>
                                        <input type="text" className="form-control" placeholder="Firstname" name="firstName" defaultValue={user?.firstName} required />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label>Lastname </label>
                                        <input type="text" className="form-control" placeholder="Lastname" name="lastName" defaultValue={user?.lastName} required/>
                                    </div>

                                    <div className="form-group mt-3">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" placeholder="phone number" name="phoneNumber" defaultValue={user?.phoneNumber} required />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label>Number Of Adults</label>
                                        <input type="number" className="form-control" placeholder="number of adults" name="numAdults" min="1" max={roomDetail?.maxOccupancy} required />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label>Special Occassion</label>
                                        <textarea rows="10" placeholder="Notes a guest has entered as they made the book can be added here. This allows you to display a free text field to your guests where they can enter any information they want to communicate to the hotel (e.g. that their booking is for a special occassion or that they have a particular room preference)." className="form-control" name="occassion"></textarea>
                                    </div>

                                </div>
                                <div className="card-footer">


                                    <PaystackButton {...componentProps} className="btn btn-outline-primary btn-block btn-lg float-end  d-none"/>
                                    <button disabled={loader} type="submit" className="btn btn-outline-dark btn-lg btn-block">
                                        {loader? (<><span className="spinner-border spinner-border-sm"></span> Loading...</>):'Book Now'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
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
            </section>



        </>
    )
}

export default SingleRoom
