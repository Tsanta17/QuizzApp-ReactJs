import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseContext } from '../Firebase';
import { setDoc, doc } from 'firebase/firestore';

const Signup = (props) => {

  // pour la redirection vers welcome
  const navigate = useNavigate()
  console.log(navigate);

  const firebase = useContext(firebaseContext);
  console.log(firebase)

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('')

  const handleChange = (e) => {
      setLoginData({...loginData, [e.target.id]: e.target.value});
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
      

  //   const {email, password, pseudo} = loginData;
  //   await firebase.signUpUser(email, password)

  //   .then(authUser => {
      
  //     const userDocRef = firebase.getUser(authUser.user.uid);
  //     console.log('UID:', authUser.user.uid);
      
  //     // Mise à jour des données du document Firestore
  //     return userDocRef.set({
  //       pseudo: pseudo,
  //       email: email
  //     })
  //   })
  //   .then(() => {
  //     //vider le state après envoie dans la db
  //     setLoginData(data);
  //     navigate('/Welcome');
  //   })
  //   .catch(error => {
  //     setError(error);
  //     setLoginData(data);
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const authUser = await firebase.signUpUser(email, password); // Supposons que vous ayez une fonction signupUser dans votre instance Firebase pour l'authentification

        const userDocRef = doc(firebase.db, `users/${authUser.user.uid}`);
        console.log('UID: ', authUser.user.uid);

        const userData = {
            pseudo: pseudo,
            email: email,
            // Autres données utilisateur à enregistrer
        };

        await setDoc(userDocRef, userData); // Enregistrement des données utilisateur dans Firestore

        // Réinitialisation des champs de formulaire après l'enregistrement des données
        setLoginData(data);
        // ... Réinitialisation d'autres états du formulaire si nécessaire

        // Redirection vers une autre page ou traitement supplémentaire après l'enregistrement
        // history.push('/autre_page');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données : ', error);
        setError(error);
        setLoginData(data);
        // Gestion des erreurs, affichage d'un message à l'utilisateur, etc.
    }
};

  //destructuring de l'objet loginData.
  const {pseudo, email, password, confirmPassword} = loginData;

  const btn = pseudo !== '' || email !== '' || password !== '' || confirmPassword !== password ? 
  <button >Inscrire</button> : <button disabled>Inscrire</button>

  //gestion erreurs
  const errorMsg = error !== '' && <span>{error.message}</span>;

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
          <div className='formBoxLeftSignup'>

          </div>
          <div className='formBoxRight'>
            <div className='formContent'>

              <form onSubmit={handleSubmit}>

                {errorMsg}
                <h2>Inscription</h2>

                <div className='inputBox'>
                  <input onChange={handleChange} value={pseudo} type='text' id='pseudo' autoComplete='off' required />
                  <label htmlFor='pseudo'>Pseudo</label>
                </div>

                <div className='inputBox'>
                  <input onChange={handleChange} value={email}  type='email' id='email' autoComplete='off' required />
                  <label htmlFor='email'>Email</label>
                </div>

                <div className='inputBox'>
                  <input onChange={handleChange} value={password}  type='password' id='password' autoComplete='off' required />
                  <label htmlFor='password'>Mot de passe</label>
                </div>

                <div className='inputBox'>
                  <input onChange={handleChange} value={confirmPassword} type='password' id='confirmPassword' autoComplete='off' required />
                  <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                </div>

                {btn}

              </form>

              <div className='linkContainer'>
                <Link className='simpleLink' to='/Login'>Déjà inscrit ? Connectez-vous</Link>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup