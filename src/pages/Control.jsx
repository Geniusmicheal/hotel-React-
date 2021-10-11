import Alert from '../components/Alert';
import { useContext,useState } from 'react';
import { ServiceContext } from '../ContextApi';
import { useHistory } from 'react-router';
const Control = () => {
    const cardContext_ = useContext(ServiceContext);
    const {showAlert,setAlert,hotelLogin,user,setUser,singleRecordQuery,logout } = cardContext_;
    const history =useHistory();
    const check = (user && user?.isAdmin)? true: false;
    let [loader, setLoader] = useState(false);
    if(check)history.push('/dashboard');

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
                        localStorage.setItem('dhjsduijcxj', JSON.stringify(userData_));
                        setUser(userData_); history.push('/dashboard');
                    }else{
                        logout(setUser);
                        showAlert('The password is invalid or the user does not have a password.','danger');
                    }
                });
            });
        }catch(e){
            showAlert((e.message).replace("Firebase:","").trim(),'danger');
        }
        setLoader(false)

    }



    return (
        <div style={{backgroundColor:'#343a40', height :'100vh'}}>
            <div className="container" style={{paddingTop:"8vh"}}>
                <div className="card" style={{  maxWidth: '540px',margin: '0vh auto'}}>
                    <header className="card-header">Admin Login</header>
                    <div className="card-body" style={{ padding: '1.25rem'}}>
                        <Alert/>
                        <form  method="post" className="needs-validation" autocomplete="off" onSubmit={onSubmitLogin_}>
                            <div className="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" name="email" className="form-control" placeholder="Email Address" required/>
                            </div>

                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter Password" required/>
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

                            <div>
                                <input type="submit" value="Login" className="btn btn-success form-control"/>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">Footer</div>
                </div>
            </div>

        </div>
    )
}

export default Control;
