import { ServiceContext } from './../ContextApi';
import { useContext,useState } from 'react';
import Alert from '../components/Alert';
function Currencies() {
    const cardContext_ = useContext(ServiceContext);
    let [loader, setLoader] = useState(false);
    const { currencies,setCurrencies,insertCurrenciesQuery,showAlert,setAlert } = cardContext_;
    const onSubmitCurrencies_ = e => {
        e.preventDefault();
        setLoader(true); setAlert(null);
        const inputText = document.querySelectorAll("input[type='text']");
        const inputNumber = document.querySelectorAll("input[type='number']");
        let formCurrencies = {};
        for (let i = 0; i < inputText.length; i++) {
            const key = inputText[i].id;
            const value= currencies[i];
            if((inputText[i].value).trim()=='' || !(inputNumber[i].value).trim()){
                showAlert("Please check, one of the currency symbol or rate is empty",'danger');
            }
            formCurrencies[key] = {
                'symbol': inputText[i].value,
                "name": value['name'],
                "code": value['code'],
                "rate": inputNumber[i].value
            };
        }
        if(Object.keys(formCurrencies).length > 100){
            insertCurrenciesQuery(formCurrencies);
            setCurrencies(Object.entries(formCurrencies).map(doc=> doc[1]));
            showAlert("Currencies Successfully Updated ",'success');
        }
        setLoader(false);
    }
    
    return (
        <main>
            <div className="main__container">
                <form className="card"  onSubmit={onSubmitCurrencies_}>
                    <Alert/>
                    <div className="card-header"> Featured</div>
                    <div className="card-body table-responsive">
                        <table className="table table-striped table-hover table-sm">
                            <thead className="">
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Symbol</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>{Object.entries(currencies).map((currency,i) =>
                                <tr key={currency[0]}>
                                    <td>{i+1}</td>
                                    <td>{currency[1].code}</td>
                                    <td>{currency[1].name}</td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={currency[1].symbol} id={currency[1].code}/>
                                    </td>

                                    <td>
                                        <input type="number" className="form-control" defaultValue={currency[1].rate} id={currency[1].code} step="any"/>
                                    </td>
                                </tr>
                            )} </tbody>
                        </table>
                    </div>
                    <div className="card-footer"> 
                        <button disabled={loader} type="submit" className="btn btn-outline-dark btn-block float-end">Submit</button>
                       
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Currencies;