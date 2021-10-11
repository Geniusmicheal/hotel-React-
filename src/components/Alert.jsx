import {  useContext } from 'react';
import { ServiceContext } from '../ContextApi';

function Alert() {
    const cardContext_ = useContext(ServiceContext);
    const {alert} = cardContext_;

    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}> {alert.msg}</div>
        )
    )
}
export default Alert;