import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseContext } from '../Firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import Lougout from '../Logout';
import Quiz from '../Quiz';
import Loader from '../Loader';

const Welcome = () => {

  const firebase = useContext(firebaseContext);

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    
    /*let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : navigate('/')
    })*/

    // if (!!userSession) {
    //   firebase.getUser(userSession.uid)
    //   .get()
    //   .then(doc => {
    //     if (doc && doc.exists) {
    //       const myData = doc.data();
    //       setUserData(myData)
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   }
   /**  const fetchData = async () => {
      if (!!userSession) {
        try {
          const docRef = doc(firebase.db, `users/${userSession.uid}`);
          const docSnapshot = await getDoc(docRef);


          if (docSnapshot.exists()) {
            const myData = docSnapshot.data();
            setUserData(myData);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    fetchData();*/

    /*return () => {
      listener()
    };*/

  }, [userSession, firebase, navigate])


  return userSession === null ? (
    <div className='quiz-bg'>
      <div className='container'>
        <Lougout />
        <Quiz UserData = {userData}/>
      </div>
    </div>
  ) : ( 
    <Loader 
          loadingMsg={"Loading..."} 
          styling={{ textAlign: 'center', color: '#FFFFFF' }}
    /> 
     )

  
}

export default Welcome