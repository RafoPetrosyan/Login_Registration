import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setUserList } from './store/actions';
import Header from './components/Header/Header';
import styles from './App.module.css';
import RouterView from './router';
  
const App = () => {

    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(() => {

      const storageList = localStorage.getItem('user-list');
      if (storageList) dispatch(setUserList( JSON.parse(storageList) ));

      const storageCurrentUser = localStorage.getItem('current-user');
      if(storageCurrentUser) dispatch(setCurrentUser( JSON.parse(storageCurrentUser) ));
      
    }, [])


    useEffect(() => {
      const storageList = localStorage.getItem('user-list');
      let concatList

      if(storageList){
          concatList = [...userData.userList];
          localStorage.setItem('user-list', JSON.stringify(concatList));
      }
      else{
          localStorage.setItem('user-list', JSON.stringify(userData.userList));
      }
      
      localStorage.setItem('current-user', JSON.stringify(userData.currentUser));
      
    }, [userData]); 
    
    
    return (
      <div className={styles.app}>
          <Header/>
          <RouterView/>
      </div>
    );
}

export default App;
