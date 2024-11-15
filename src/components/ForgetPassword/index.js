import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseContext } from '../Firebase';

const ForgetPassword = () => {

    const firebase = useContext(firebaseContext)
    console.log(firebase)

    const [email, setEmail] = useState('');
    const [succes, setSucces] = useState(null);
    const [error, setError] = useState(null) ;
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        firebase.passwordReset(email)
        .then(() => {
            setError(null);
            setSucces(`Consultez votre email ${email} pour changer le mot de passe`);
            setEmail('');

            setTimeout(() => {
                navigate('/Login');
            }, 5000)
        })
        .catch( error => {
            setError(error);
            setEmail('');
        })

    }


const disabled = email === '';

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
          <div className='formBoxLeftForget'>

          </div>
          <div className='formBoxRight'>
            <div className='formContent'>

                {succes && <span style={{
                    border: "1px solid green",
                    background: "green", 
                    color: "#ffffff"
                }}>{succes}</span>}

                {error && <span>{error.message}</span>}

              <h2>Mot de passe oublié !</h2>
              <form onSubmit={handleSubmit}>

                <div className='inputBox'>
                  <input onChange={e => setEmail(e.target.value)} value={email}  type='email' id='email' autoComplete='off' required />
                  <label htmlFor='email'>Email</label>
                </div>

                <button disabled={disabled}>Récupérer</button>

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

export default ForgetPassword;