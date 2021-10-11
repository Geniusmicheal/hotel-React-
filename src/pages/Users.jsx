import React, { useContext, useEffect,useState } from 'react';
import { ServiceContext } from '../ContextApi';
import avatar from "../images/avatar.svg";
import {Link} from 'react-router-dom';

const Users = () => {
    const cardContext_ = useContext(ServiceContext);
    const { singleRecordQuery } = cardContext_;
    let [data, setData] = useState([]);
    useEffect(() => {
        singleRecordQuery('users',['isAdmin','==',false]).then((snapshot) => {
            setData(snapshot.docs.map(doc=>doc.data()));
        });
    },[]);
    console.log(data);
    return (
        <main>
            <div className="main__container">
                <div className="card" >
                    <div className="card-header"> Featured</div>
                    <div className="card-body table-responsive">
                        <table className="table table-striped table-hover table-sm">
                            <thead className="">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phonenumber</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{data.map((user,i) =>
                                <tr key={i}>
                                    <td><img width="30" src={avatar} alt="avatar" /> </td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td><Link to={`/dashboard/bookinglist/${user.uid}`} className="btn btn-primary text-center btn-sm">
                                        View Booked Hotels
                                    </Link></td>
                                </tr>
                            )}</tbody>
                        </table>
                    </div>
                    <div className="card-footer"> Featured</div>
                </div>
            </div>
        </main>

    )
}

export default Users
