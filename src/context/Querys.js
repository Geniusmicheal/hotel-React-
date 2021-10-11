import { db,timeStamp } from './Firebase';
import currency from '../data/currency.json';
import rate from '../data/rate.json';

const insertQuery = (collection,data,docID) => {
    data.timestamp =new Date();
    delete data[''];
    console.log(data);
    if(docID)return db.collection(collection).doc(docID).set(data);
    else return db.collection(collection).add(data);
}

const insertCurrenciesQuery =  (currencies) => {
    const batch = db.batch();
    const currencyData = currencies?currencies:currency;
    for(let id in currencyData){
        let data = {
            "symbol": currencyData[id]['symbol'],
            "name": currencyData[id]['name'],
            "code": currencyData[id]['code'],
            "rate": currencyData[id]['rate']? currencyData[id]['rate']: rate[id]?rate[id]:0
        }
        const docRef = db.collection('currencies').doc(id); //automatically generate unique id
        batch.set(docRef, data);
    }
    return batch.commit();
    // else{ batch.commit(); return window.location.reload(); }
}

// const mutliInsertUpdateQuery = (collection,data) => {


//     ref.child("Parent").update({
//         childe1: "newdata",
//         childe2: "newdata",
//         childe3: "newdata"
//       });


//     let counter = data;
//     let isArray = true;
//     if(typeof(data)==='object'){
//        const keys = Object.keys(id);
//        counter= data[keys[0]];
//     }

//     for (let i = 0; i < counter.length; i++) {
//         if(isArray){
//             data
//         }
//         const docRef = db.collection(collection).doc(id); //automatically generate unique id
//         batch.set(docRef, data);
//     }
// }

// tutorialsRef.doc(id).set({
//     title: 'zkoder Tut#1',
//     description: 'Tut#1 Description'
//   });


// const updateMutliQuery = (collection,data) => {
//     tutorialsRef.doc(id).update({
//         title: 'zkoder new Tut#1'
//       });
// }


const singleRecordQuery = (collection,docID) => {
    var query= db.collection(collection);
    if(Array.isArray(docID))query = query.where(docID[0],docID[1],docID[2]);
    else query= query.doc(docID);
   return query.get();
}

const getRecordQuery = (collection) => {
    return db.collection(collection).get();
}

export {insertQuery, singleRecordQuery, insertCurrenciesQuery, getRecordQuery};

