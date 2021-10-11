import { ServiceContext } from './../ContextApi';
import { useContext,useState } from 'react';
import Alert from '../components/Alert';

const Charge = () => {
    const cardContext_ = useContext(ServiceContext);
    const { commission, setCommission,showAlert,setAlert,insertQuery } = cardContext_;
    let [loader, setLoader] = useState(false);

    const onSubmitCommission_ = e => {
        e.preventDefault();
        setLoader(true); setAlert(null);
        const ele = e.target.elements;
        try {
            insertQuery('commission',{'commission': ele[0].value},'commission');
            showAlert("Commission Successfully Updated ",'success');
            setCommission( ele[0].value);
        } catch (e) {
            showAlert((e.message).replace("Firebase:","").trim(),'danger');
        }
        setLoader(false);
    }
    return (
        <main>
            <div className="main__container">
                <form onSubmit={onSubmitCommission_}  className="card" >
                    <Alert/>
                    <div className="card-header"> Featured</div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Commission(%):</label>
                            <input type="number" className="form-control" step="any" min="0" max="100" defaultValue={commission}/>
                        </div>
                    </div>
                    <div className="card-footer"> 
                        <button disabled={loader} type="submit" className="btn btn-outline-dark btn-block float-end">Submit</button>
                    
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Charge;
// defaultValue={currency.rate} id={currency.code} 