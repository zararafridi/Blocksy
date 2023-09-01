import style from './TextInput.module.css';

import React from 'react'

function TextInput(props) {
  return (
    <div className={style.wrapper}>
        <input {...props} />
        {props.error && (
            <p className={style.errorMessage}>{props.errormessage}</p>
        )}
    </div>
  )
}

export default TextInput