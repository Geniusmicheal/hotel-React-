import { useContext,useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ServiceContext } from '../ContextApi';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';   

const RoomFilter = () => {
    const history =useHistory();
    const location_ = useLocation();
    const cardContext_ = useContext(ServiceContext);
    const {autoCompleteLocationApi,apiListOfRoomsRecord,setLoading,setHotelData,setRoomData } = cardContext_;
    let [loader, setLoader] = useState(false);
    let [apiLoader, setApiLoader] = useState(false);
    let [location, setLocation] = useState('');
    let [today, setToday] =useState(new Date());
    let currentDiv =  document.querySelector('.list-group');

    const nextDay_ = new Date();
    nextDay_.setDate(nextDay_.getDate() + 1);
    let [nextDay, setNextDay] =useState(nextDay_);
    let [endDay, setEndDay] =useState(nextDay_);
    
    function filterTab(id, e){
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-pane");
        tablinks = document.getElementsByClassName("tablist");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
            tabcontent[i].className = tabcontent[i].className.replace(" active", " fade");
        }
        document.getElementById(id).className = document.getElementById(id).className.replace(" fade"," active");
        e.currentTarget.className += " active";
    }


    const handleChangeStart = e =>{ 
        setToday(new Date(e));
        nextDay_.setDate(new Date(e).getDate() + 1);
        setNextDay(nextDay_);
    }

    const handleChangeEnd = e =>{
        setEndDay(new Date(e));
    }

    // const maxDate = new Date();
    // maxDate.setDate(maxDate.getDate() + 2000);

    const onSubmit_ = async e => {
        e.preventDefault();
        setLoader(true);
        let formData = {
            center: location,
            offset:0
        }, ele = e.target.elements;
        for (let i = 0; i < ele.length; i++) formData[ele[i].id] = ele[i].value;
        
        await apiListOfRoomsRecord(formData,setLoading, autoCompleteLocationApi,setHotelData,setRoomData);

        setLoader(false)
        if((location_.pathname)!=='/hotels')history.push('/hotels');
    }
    
    const handleBlur = e=>{
        // currentDiv.classList.add('d-none');
    }

    const handleFocus = e=>{
        if (currentDiv.classList.contains('d-none'))
        currentDiv.classList.remove('d-none');
    }

    const handleAutoComplete = async e => {
        setApiLoader(true);
        let data, val = (e.target.value).trim();
        setLocation('');
        if(val !=''){
            await autoCompleteLocationApi(val).then(response => response.json()).then(data_ =>{
                data= data_.suggestions;
                currentDiv.innerHTML='';
                for (let i = 0; i <data.length; i++) {
                    var btn = document.createElement("BUTTON");
                    btn.innerHTML = `${data[i].caption}`;
                    btn.value= `${data[i].latitude},${data[i].longitude}`;
                    btn.type = 'button';
                    btn.className ="list-group-item list-group-item-action"; 
                    currentDiv.appendChild(btn);
        
                    btn.addEventListener("click", function(){
                        console.log(this.value)
                        setLocation((this.value)); 
                        e.target.value =this.innerText;
                        currentDiv.innerHTML='';
                    });
                }
            }).catch(err => console.error(err) );
        }
            
        setApiLoader(false)
    }
    
    return (
        <div className="container mx-auto" style={{marginTop: '-7rem'}}>
            <div className="card shadow-lg border-0 ">
                <div className="card-body">
                    <ul className="nav nav-tabs nav-justified" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active tablist" onClick={filterTab.bind(this,'hotel') }>
                                <h4 className="widget-title">Hotel</h4>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link tablist" onClick={filterTab.bind(this,'airportransfer')}><h4 className="widget-title">Airport transfer</h4></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link tablist" onClick={filterTab.bind(this,'apartments')}><h4 className="widget-title">Apartments</h4></a>
                        </li>
                    </ul>
                    <div className="tab-content">

                        <div className="tab-pane active" id="hotel">
                            <form className="row form" onSubmit={onSubmit_}>

                                <div className="form-group  is-loading mt-4 col-md-12 col-12 ml-auto" >
                                    <label htmlFor="Fromdate" className="font-weight-bolder mr-3">Location </label>
                                    <div className="input-group" >
                                        <input className="form-control" placeholder="Where are you going?" style={{borderRight:'none'}} onKeyUp={handleAutoComplete} id="location"  autoComplete="off" onFocus={handleFocus} onBlur={handleBlur} />
                                        <div className="input-group-text" style={{borderLeft:'none',background:'none'}}>
                                            {apiLoader? (<span className="spinner-border spinner-border-sm"></span>):''}
                                        </div>
                                    </div>
                                    <div className="list-group d-none" style={{borderTop:'none',marginTop: '-2px'}}></div>
                                </div>

                                <div className="form-group mt-4 col-md-6 col-12 ml-auto">
                                    <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                    <DatePicker selected={today} minDate={new Date()} className="form-control" id="fromDate" dateFormat="yyyy-MM-dd" onChange={handleChangeStart}/>
                                </div>

                                <div className="form-group mt-4 col-md-6 col-12 ml-auto">
                                    <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                    <DatePicker selected={endDay} minDate={nextDay} className="form-control" id="toDate" dateFormat="yyyy-MM-dd" onChange={handleChangeEnd}/>
                                </div>
                                <div className="form-group mt-4 d-grid gap-2 col-md-12 col-12">
                                    <button className="btn btn-primary"  type="submit" disabled={loader} >
                                        Search {loader? (<span className="spinner-border spinner-border-sm"></span>):''}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane active" id="airportransfer"></div>
                        <div className="tab-pane active" id="apartments"></div>
                    </div>

                </div>
            </div>
        
        </div>
            
    )
}

export default RoomFilter

