import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../../CustomHooks/useInput";
import { createAction } from "../../../../store/adminStore/actions/actions";
import { LOGIN_ADMIN, SET_ERROR_MESSAGE_LOGIN } from "../../../../store/adminStore/actions/actionType";
import styles from './LoginAdmin.module.css';


const LoginAdmin = () =>{

    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.adminData.errorMessage);

    useEffect(() =>{
        if(errorMessage) alert(errorMessage);
        return () =>{
            dispatch(createAction(SET_ERROR_MESSAGE_LOGIN, ''));
        }
    }, [errorMessage])

    const email = useInput('');
    const password = useInput('');

    const submitChange = (e) =>{
        e.preventDefault();
        const loginObj = {
            username: email.value,
            password: password.value,
        }
        dispatch(createAction(LOGIN_ADMIN, loginObj))
      
    }

    return (
        <>
        <div className={styles.modal}></div>
            <div className={styles.parent}>
                <div className={styles.loginMain}>

                    <form className={styles.form} onSubmit={submitChange}> 
                        <p className={styles.title}>Sign in Admin</p>

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
        </>
    )
}

export default LoginAdmin;