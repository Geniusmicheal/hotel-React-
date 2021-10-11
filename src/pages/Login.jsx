import { useContext,useState } from 'react';
import { useHistory } from 'react-router';
import Alert from '../components/Alert';
import { ServiceContext } from '../ContextApi';

function Login() {
    const cardContext_ = useContext(ServiceContext);
    const {showAlert,setAlert,hotelSignUp, 
        hotelLogin,user,setUser,insertQuery,
        singleRecordQuery,logout 
    } = cardContext_;
    const history =useHistory();
    const check = (user && user?.isAdmin === false)?true :false;
    if(check)history.push('/');
    
    let [loader, setLoader] = useState(false);

    function loginSignup(id, e){
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

    const onSubmitLogin_ = async e => {
        e.preventDefault();
        setLoader(true);
        const ele = e.target.elements;
        let formData = {
            email:ele.email.value,
            password:ele.password.value
        }
        setAlert(null);
        try{
            await hotelLogin(formData.email, formData.password).then(userCredential => {
                const userData = userCredential.user;
                singleRecordQuery('users',userData.uid).then((snapshot) => {
                    const userData_ = snapshot.data();
                    if(userData_?.isAdmin){
                        logout(setUser);
                        showAlert('The password is invalid or the user does not have a password.','danger');
                    }else{
                        localStorage.setItem('dhjsduijcxj', JSON.stringify(userData_));
                        setUser(userData_); history.goBack();
                    }
                });
            });
        }catch(e){
            showAlert((e.message).replace("Firebase:","").trim(),'danger');
        }
        setLoader(false)
    }

    const onSubmitSignup_ = async e => {
        e.preventDefault();
        setLoader(true);
        const ele = e.target.elements;

        let formData = {
            email:ele.email.value,
            password:ele.password.value,
            password_confirmation:ele.password_confirmation.value,
        }
        if(formData.password !==formData.password_confirmation)
            showAlert('Password and confirmation password not match','danger');
        else { setAlert(null);
            try{
                await hotelSignUp(formData.email, formData.password).then(userCredential => {
                    const userData = userCredential.user;
                    const userData_ = {
                        uid:userData.uid,
                        isAdmin :false,
                        email:  userData.email,
                        photo:null,
                        firstName:null,
                        lastName:null,
                        phoneNumber:null,
                    }; insertQuery('users',userData_,userData.uid);

                    localStorage.setItem('dhjsduijcxj', JSON.stringify(userData_));
                    setUser(userData_); history.goBack();
                });
                
            }catch(e){
                showAlert((e.message).replace("Firebase:","").trim(),'danger');
            }
        }
        setLoader(false)
    }


    return (
        <div className="container contact">
            <div className="row">
                <div className="col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4">

           
                        <div className="card">
                            <div className="card-body">
                                <ul className="nav nav-tabs nav-justified" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active tablist" onClick={loginSignup.bind(this,'login') }>
                                            <h4 className="widget-title">Login</h4>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link tablist" onClick={loginSignup.bind(this,'signup')}><h4 className="widget-title">Signup</h4></a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <Alert/>

                                    <div className="tab-pane active" id="login">
                                        <form className="needs-validation" onSubmit={onSubmitLogin_}>
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input type="email" className="form-control" placeholder="Email" required="" name="email"/>
                                            </div>

                                            <div className="form-group mt-3">
                                                <label>Password</label>
                                                <input type="password" className="form-control" placeholder="password" required="" name="password"/>
                                            </div> 

                                            <div className="d-flex justify-content-between  mt-3">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" id="customCheck" name="example1"/>
                                                    <label className="custom-control-label"> Remember me</label>
                                                </div>

                                                <div>
                                                    <a href="http://">Forget Password?</a>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 mx-auto">
                                                <button disabled={loader} type="submit" className="btn btn-outline-dark btn-lg btn-block">Login</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade" id="signup">
                                        <form className="needs-validation" onSubmit={onSubmitSignup_}>
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input type="email" className="form-control" placeholder="User Email" required="" name="email"/>
                                            </div>
                                    
                                            <div className="form-group mt-3">
                                                <label>Password</label>
                                                <input type="password" className="form-control" placeholder="password" required="" name="password"/> 
                                            </div> 
                                    
                                            <div className="form-group mt-3">
                                                <label>Password Confirmation</label>
                                                <input type="password" className="form-control" placeholder="password" required="" name="password_confirmation"/>
                                            </div> 
                                    
                                            <div className="mt-3 mx-auto">
                                                <button disabled={loader} type="submit" className="btn btn-outline-dark btn-lg btn-block">Signup</button>
                                            </div>

                                        </form>
                                    </div><br/><br/>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login


 

// singleRecordQuery('users',["isAdmin","==",false]).then((snapshot) => {
//     snapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
    // console.log(snapshot);

