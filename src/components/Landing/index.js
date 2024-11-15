import React, {useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

    const wolverineRef = useRef(null)

    const [btn, setBtn] = useState(false)

    useEffect(() => {
        wolverineRef.current.classList.add("startingImg")
        setTimeout(() => {
            wolverineRef.current.classList.remove("startingImg")
            setBtn(true)
        }, 1500)
    }, [])

    const setLeftImg = () =>{
        wolverineRef.current.classList.add("leftImg")
    }

    const setRightImg = () =>{
        wolverineRef.current.classList.add("rightImg")
    }

    const clearImg = () => {
        if (wolverineRef.current.classList.contains("leftImg")) {
            wolverineRef.current.classList.remove("leftImg");
        } else if (wolverineRef.current.classList.contains("rightImg")) {
            wolverineRef.current.classList.remove("rightImg");
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className='leftBox'>
                <Link className='btn-welcome' to="/Signup">Inscription</Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className='rightBox'>
                <Link className='btn-welcome' to="/Login">Connexion</Link>
            </div>
        </Fragment>
    )

  return (
    <main ref={wolverineRef} className='welcomePage'>
        {displayBtn}
    </main>
  )
}

export default Landing