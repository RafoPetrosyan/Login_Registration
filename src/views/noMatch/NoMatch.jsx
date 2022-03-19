import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './NoMatch.module.css';

const NoMatch = () =>{

    const navigate = useNavigate();

    const backGo = () =>{
        navigate(-1);
    }

    useEffect(() =>{
        const timout = setTimeout(() =>{
            backGo();
        }, 2000)
        return () =>{
            clearTimeout(timout);
        }
    }, []);
    
    return (
        <div className={styles.noMatch}>
            Page Not Found!
            <button className={styles.button} onClick={backGo}>
                Back go
            </button>
        </div>
    )
    
}

export default NoMatch;