import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useInput } from "../../../../CustomHooks/useInput";
import { login } from "../../../../store/adminStore/events/eventActions";
import styles from './LoginAdmin.module.css';

const LoginAdmin = () =>{

    const [labelColor, setLabelColor] = useState('white');

    const dispatch = useDispatch();

    const email = useInput('');
    const password = useInput('');

    const submitChange = (e) =>{
        e.preventDefault();
        const loginObj = {
            username: email.value,
            password: password.value,
        }
        dispatch(login(loginObj))
      
    }

    return (
        <>
        <div className={styles.modal}></div>
            <div className={styles.parent}>
                <div className={styles.loginMain}>

                    <form className={styles.form} onSubmit={submitChange}> 
                        <p className={styles.title}>Sign in Admin</p>

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
            </div>
        </>
    )
}

export default LoginAdmin;