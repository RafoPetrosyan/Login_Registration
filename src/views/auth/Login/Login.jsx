import React from "react";
import { useDispatch } from "react-redux";
import { confirmLogin } from "../../../store/actions";
import { useInput } from "../../main/CustomHooks/useInput";
import styles from './Login.module.css';

const Login = () =>{

    const dispatch = useDispatch();

    const email = useInput('');
    const password = useInput('');

    const submitChange = (e) =>{
        e.preventDefault();
        const loginObj = {
            email: email.value,
            password: password.value,
        }
        dispatch(confirmLogin(loginObj))
    }

    return (
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
    )
}

export default Login;