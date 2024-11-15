import React from 'react'

const Footer = () => {

  const date = new Date();
  const currentYear = date.getFullYear();


  return (
    <footer>
        <div className='footer-container'>
            <p>{`Projet réalisé par Tsaleta ¶ - ${currentYear}`}</p>
            <p>Crédit Iconfinder.com pour les icônes</p>
        </div>
    </footer>
  )
}

export default Footer