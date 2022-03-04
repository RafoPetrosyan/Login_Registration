import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmedSignIn } from "../../../store/actions";
import { useInput } from "../../main/CustomHooks/useInput";
import styles from './Login.module.css';

const Login = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useInput('');
    const password = useInput('');

    const submitChange = async (e) =>{
        e.preventDefault();
        const signInObj = {
            email: email.value,
            password: password.value,
        }
        await dispatch(confirmedSignIn(signInObj));
        navigate('/home');
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