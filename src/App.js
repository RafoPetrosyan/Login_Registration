import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from './store/actions';
import Header from './components/Header/Header';
import styles from './App.module.css';
import RouterView from './router';
  
const App = () => {

    const userList = useSelector(state => state.userData.userList);
    const dispatch = useDispatch();

    useEffect(() => {
      const storageList = localStorage.getItem('user-list');
      if (storageList) dispatch(setUserList(JSON.parse(storageList)));
    }, [])


    useEffect(() => {
      const storageList = localStorage.getItem('user-list');
      let concatList

      if(storageList){
        concatList = [...userList];
        localStorage.setItem('user-list', JSON.stringify(concatList));
      }
      else{
        localStorage.setItem('user-list', JSON.stringify(userList));
      }
    }, [userList]); 
    
    
    return (
      <div className={styles.app}>
          <Header/>
          <RouterView/>
      </div>
    );
}

export default App;
