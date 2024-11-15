import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseContext } from '../Firebase';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    const firebase = useContext(firebaseContext)
    const navigate = useNavigate();

    useEffect(() => {
      if (password.length > 5 && email !== '') {
        setBtn(true);
      }else if(btn === true) {
        setBtn(false)
      }
    }, [password, email, btn])
    
    const handleSubmit = (e) => {
      e.preventDefault();

      firebase.loginUser(email, password)
      .then(user => {
        setEmail('');
        setPassword('');
        navigate('/Welcome')
      })
      .catch(error => {
        setError(error)
        setEmail('');
        setPassword('');
      })
    }

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
          <div className='formBoxLeftLogin'>

          </div>
          <div className='formBoxRight'>
            <div className='formContent'>

              {error !== '' && <span>{error.message}</span>}

              <h2>Connexion</h2>
              <form onSubmit={handleSubmit}>

                <div className='inputBox'>
                  <input onChange={e => setEmail(e.target.value)} value={email}  type='email' id='email' autoComplete='off' required />
                  <label htmlFor='email'>Email</label>
                </div>

                <div className='inputBox'>
                  <input onChange={e => setPassword(e.target.value)} value={password}  type='password' id='password' autoComplete='off' required />
                  <label htmlFor='password'>Mot de passe</label>
                </div>

                {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

              </form>

              <div className='linkContainer'>
                <Link className='simpleLink' to='/Signup'>Etes-vous nouveaux ? Inscrivez-vous maintenant</Link>
                <br />
                <Link className='simpleLink' to='/forgetpassword'>Mot de passe oublié ?</Link>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Login