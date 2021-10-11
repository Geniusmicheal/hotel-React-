import { createContext,useEffect,useState } from "react";
import {sendForPasswordLink,recoverSigninPassword,hotelSignUp,hotelLogin,logout} from './context/Authentication';
// import { authApp} from './context/Firebase';
import apiListOfRoomsRecord from "./context/GetHotel";
import { insertQuery,singleRecordQuery,insertCurrenciesQuery,getRecordQuery } from "./context/Querys";


// db.collection('users')
export const ServiceContext = createContext();
const ServiceContextState = (props) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser]= useState(null);
    const [roomData, setRoomData] = useState(null);
    const [hotelData, setHotelData] = useState(null);    
    const [ alert , setAlert] = useState(null);
    const [currencies, setCurrencies]= useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [commission, setCommission] = useState(null);
    
    const showAlert = (msg, type) => { 
        setAlert({msg,type});
        setTimeout(() => setAlert(null), 5000);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const filterData = {
            fromDate: new Date().toJSON().slice(0,10),
            toDate : (nextDay.toJSON().slice(0,10)),
            offset:0
        }
        apiListOfRoomsRecord(filterData,setLoading, autoCompleteLocationApi,setHotelData,setRoomData);
        let obj = JSON.parse(localStorage.getItem("dhjsduijcxj"));
        if(obj && '' in obj)delete obj[''];
        setUser(obj);
       
        getRecordQuery('currencies').then(snapshot =>{
            let data = {}
            if((snapshot.docs).length>0){
                snapshot.docs.map(doc=>data[doc.id]=doc.data());
                setCurrencies(data);
            } else insertCurrenciesQuery();
            // setCurrencies(snapshot.docs.map(doc=> doc.data())); 
        });

        singleRecordQuery('commission','commission').then((snapshot) => {
            const userData_ = snapshot.data();
            setCommission(userData_.commission);
        });

        return function cancel() {
            abortController.abort()
        }
      
        


        // var tutorialsRef = firebase.firestore().collection("/tutorials");
        // tutorialsRef.get().then(function(snapshot) {
        //     vat tutorials = [];
          
        //     snapshot.forEach(function(childSnapshot) {
        //       var id = childSnapshot.id;
        //       var data = childSnapshot.val();
        //       // ...
          
        //       tutorials.push({ id: id, title: data.title, description: data.description});
        //     });
        //   });

        // const unsubscribe = authApp.onAuthStateChanged(user_ => {
        //     if(user_){
        //       console.log(user_);  
        //     }
            
        //     // 
        // });
        // return unsubscribe;
    },[]);
    

    const autoCompleteLocationApi = async (id) =>{
        // const locationApi =`https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?limit=5&language=en&access_token=pk.eyJ1Ijoib2h0ZWFtdm4iLCJhIjoiY2tlNmdqeWtoMGtsMjJ5cG9keHo0ZW1xYSJ9.nmr8-ZXK5UDqG2EOEYv3DA`;
        const locationApi =`https://lookup.hotels.com/egta/suggest/v1.4/json/?locale=en_IE&groupedResults=false&maxResults=6&query=${id}`;
        return await fetch(locationApi);
        
    }
   
    const contextValue = { 
        loading,setLoading,user,setUser,roomData,setRoomData, insertQuery,
        hotelData, setHotelData, alert, setAlert, showAlert,singleRecordQuery,
        hotelSignUp, hotelLogin, logout,sidebar, insertCurrenciesQuery, getRecordQuery,
        setSidebar,apiListOfRoomsRecord, autoCompleteLocationApi,currencies,setCurrencies,commission, setCommission
    }

    return (<ServiceContext.Provider value={contextValue}> {props.children}</ServiceContext.Provider>);

}
export default ServiceContextState;

