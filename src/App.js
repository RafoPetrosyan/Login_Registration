import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from './store/userStore/actions';
import RouterView from './views/router/index';
  


const App = () => {

    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();

  
    useEffect(() => {

      const storageList = localStorage.getItem('user-list');
      if (storageList) dispatch(setUserList( JSON.parse(storageList) ));
      
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
      <div>
          <RouterView/>
      </div>
    );
}

export default App;
