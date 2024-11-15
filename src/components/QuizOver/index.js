import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from "react-icons/gi";
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';

//dans un composant function on ne peut pas passer une ref via props d'où on utilise forwardRef 
const QuizOver = React.forwardRef((props, ref) => {

  // console.log(props)
  // console.log(ref)

  const {levelNames, score, maxQuestions, percent, quizLevel, loadLevelQuestions} = props

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  //console.log(API_PUBLIC_KEY);

  const hash='e97ad2e6cbb7d2f1207999a40d27a307';

  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [characterInfos, setCharacterInfos] = useState([])
  const [loading, setLoading] = useState(true)

  //console.log(asked)
  useEffect(() => {
    setAsked(ref.current)

    //vérification de la data dans le local storage pour mettre une MAJ tous les 15j
    if (localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate')
      checkDataUpdate(date);
    }

  }, [ref])

  const checkDataUpdate = date => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem( 'marvelStorageDate', Date.now());
    }
  }

  const averageGrade = maxQuestions / 2

  if (score < averageGrade) {
   
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 3000)
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase + string.slice(1);
  }

  const showModal = (id) => {
    setOpenModal(true);

    //si le data existe déjà dans la locale storage on n'appel plus l'api  
    if (localStorage.getItem(id)) {

      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);

    } else {

      axios 
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then( response => {
          //console.log(response)
          setCharacterInfos(response.data);
          setLoading(false);

          //stockage de la data provenant de l'api marvel pour minimiser les requêtes si on l'a déjà appelé
          localStorage.setItem( id, JSON.stringify(response.data));
          //marquage de la date de stockage 
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem( 'marvelStorageDate', Date.now());
          }
          
        })
        .catch( error => console.log(error) )
        }
  }

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  }

  const decision = score >= averageGrade ? (
    <Fragment>
      <div className='setpsBtnContainer'>
        {
          quizLevel < levelNames.length ? 
          (
            <Fragment>
              <p className='successMsg'>Félicitation, passez au niveau suivant !</p>
              <button 
                  className='btnResult success'
                  onClick={() => loadLevelQuestions(quizLevel)}
                  >
                  Niveau suivant
              </button>
            </Fragment>
          )
          :
          (
            <Fragment>
              <p className='successMsg'>
                 <GiTrophyCup size='50px' /> Félicitation, vous êtes un Pro
              </p>
              <button 
                className='btnResult gameOver'
                onClick={() => loadLevelQuestions([0])}
                >Acceuil
              </button>
            </Fragment>
          )
        }
      </div>
      <div className='percentage'>
          <div className='progressPercent'>Réussite: {percent} %</div>
          <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  ):
  (
    <Fragment>
         <div className='setpsBtnContainer'>
              <p className='failureMsg'>Vous avez échoué</p>
          </div>
          <div className='percentage'>
              <div className='progressPercent'>Réussite: {percent} %</div>
              <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
          </div>
      
    </Fragment>
  )

  const questionAnswer = score >= averageGrade ? 
   (
    asked.map((question) => {
      return (
      <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
              <button className='btnInfo'
                      onClick={() => showModal(question.heroId)}
              >
              Infos
              </button>
          </td>
      </tr>
      )
  })
   )
   :
   (
    <tr>
      <td colSpan="3">
         <Loader 
          loadingMsg={"Pas de réponses !"} 
          styling={{ textAlign: 'center', color: 'red' }}
         />
      </td>
    </tr>
   )

  const resultInModal  = !loading ? 
  (
    <Fragment>
      <div className='modalHeader'>
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className='modalBody'>
        <div className='comicImage'>
          <img 
            src={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension} 
            alt={characterInfos.data.results[0].name}
          />

          {characterInfos.attributionText}
        </div>
        <div className='comicDetails'>
          <h3>Description</h3>
          {
            characterInfos.data.results[0].description ? 
            <p>{characterInfos.data.results[0].description}</p> : <p>Description indisponble...</p>
          }
          <h3>Plus d'Infos</h3>
          {
            characterInfos.data.results[0].urls && 
            characterInfos.data.results[0].urls.map((url, index) => {
              return <a 
                key={index}
                href={url.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {capitalizeFirstLetter(url.type)}
              </a>
            })
          }
        </div>
      </div>
      <div className='modalFooter'>
        <button className='modalBtn' onClick={hideModal}>Fermer</button>
      </div>
    </Fragment> 
  )
  :
  (
    <Fragment>
      <div className='modalHeader'>
        <h2>Marvel response ...</h2>
      </div>
      <div className='modalBody'>
        <Loader />
      </div>
    </Fragment> 
  );

  return (
    <Fragment>
      
      {decision}

      <hr />

      <p>Les réponses aux questions</p>
      <div className='answerContainer'>
          <table className='answers'>
            <thead>
              <tr>
                <th>Questions</th>
                <th>Réponses</th>
                <th>Infos</th>
              </tr>
            </thead>
            <tbody>
              {questionAnswer}
            </tbody>
          </table>
      </div>
        <Modal showModal={openModal}
              hideModal={hideModal}
        >
          {resultInModal}
        </Modal>
    </Fragment>
  )
}) 

export default React.memo(QuizOver)