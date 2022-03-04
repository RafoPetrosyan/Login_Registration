import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from './store/actions';
import Header from './components/Header/Header';
import styles from './App.module.css';
import RouterView from './router';
  
const App = () => {

    const userList = useSelector(state => state.userList.userList);
    const dispatch = useDispatch();

    useEffect(() => {
      const storageList = localStorage.getItem('user-data');
      if (storageList) dispatch(setData(JSON.parse(storageList)));
    }, [])


    useEffect(() => {
      const storageList = localStorage.getItem('user-data');
      let concatList

      if(storageList){
        concatList = [...JSON.parse(storageList), ...userList];
        localStorage.setItem('user-data', JSON.stringify(concatList));
      }
      else{
        localStorage.setItem('user-data', JSON.stringify(userList));
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
