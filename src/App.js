import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from './store/actions';
import PageRoutes from './components/PageRoutes/PageRoutes';
import Header from './components/Header/Header';
import styles from './App.module.css';


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
        concatList = [...JSON.parse(storageList), userList];
        localStorage.setItem('user-data', JSON.stringify(concatList));
      }
      else{
        localStorage.setItem('user-data', JSON.stringify([userList]));
      }
    }, [userList]); 
    
    
    return (
      <div className={styles.app}>
          <Header/>
          <PageRoutes/>
      </div>
    );
}

export default App;
