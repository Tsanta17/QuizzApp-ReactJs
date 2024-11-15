import React, { useState, useEffect, useContext } from 'react';
import { firebaseContext } from '../Firebase';
import { Tooltip } from 'react-tooltip'

const Lougout = () => {

    const [checked, setChecked] = useState(false);
    const firebase = useContext(firebaseContext)
    console.log(checked)

    useEffect(() => {
     if (checked) {
        console.log('déconnexion')
        firebase.signoutUser();
     }
    }, [checked, firebase])

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }
    

  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input type='checkbox'
                onChange={handleChange} 
                checked={checked}
            />
            <span className='slider round' data-tooltip-id="my-tooltip" data-tooltip-content="Déconnexion !" data-tooltip-place="left"></span>
        </label>
        
        <Tooltip id="my-tooltip" 
            
            effect='solid'
        />
    </div>
  )
}

export default Lougout