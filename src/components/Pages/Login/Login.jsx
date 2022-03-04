import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmedSignIn } from "../../../store/actions";
import { useInput } from "../CustomHooks/useInput";
import styles from './Login.module.css';

const Login = () =>{

    const currentUser = useSelector(state => state.userList.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const email = useInput('');
    const password = useInput('');

    const submitChange = e =>{
        e.preventDefault();
        const signInObj = {
            email: email.value,
            password: password.value,
        }
        dispatch(confirmedSignIn(signInObj));
        setTimeout(() =>{
            navigate('/home');
        }, 200);

    }

    return (
        <div className={styles.mainDiv}>

            <div className={styles.container}>

                <div className={styles.loginMain}>

                        <form className={styles.form} onSubmit={submitChange}> 
                            <p className={styles.title}>Sign in</p>
                            <div>
                                <label className={styles.label} htmlFor="email">
                                    E-Mail Address
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    className={styles.input}
                                    {...email.bind}
                                    required
                                />
                            </div>

                            <div>
                                <label className={styles.label} htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className={styles.input}
                                    {...password.bind}
                                    required
                                />
                                </div>

                                <div>
                                    <button className={styles.btn}> 
                                        Sign in
                                    </button>
                                </div>
                                
                        </form>
                </div>
            </div>
                
        </div>
    )
}

export default Login;