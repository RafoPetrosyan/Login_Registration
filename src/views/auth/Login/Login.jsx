import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { confirmLogin } from "../../../store/actions";
import { useInput } from "../../../CustomHooks/useInput";
import styles from './Login.module.css';

const Login = () =>{

    const [labelColor, setLabelColor] = useState('white');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useInput('');
    const password = useInput('');

    const submitChange = (e) =>{
        e.preventDefault();
        const loginObj = {
            email: email.value,
            password: password.value,
        }
        dispatch(confirmLogin(loginObj))
        setLabelColor('red');
    }

    const navigateAuth = () =>{
        navigate('/auth');
    }

    return (
        <>
        <div className={styles.modal} onClick={navigateAuth}></div>

           <div className={styles.loginMain}>

            <div className={styles.navigateDiv}>
                <button className={styles.navigateBtn} onClick={navigateAuth}>X</button>
            </div>

            <form className={styles.form} onSubmit={submitChange}> 
                <p className={styles.title}>Sign in</p>

                <div>
                    <label className={styles.label} htmlFor="email" style={{color: labelColor}}>
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
                    <label className={styles.label} htmlFor="password" style={{color: labelColor}}>
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
        </>
    )
}

export default Login;