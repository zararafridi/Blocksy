import React from 'react'
import style from './Error.module.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className={style.container}>
        <div className={style.heading}>Error 404 - Page not found</div>
        <div className={style.body}>Go back to 
            <Link className={style.link} to='/'>home</Link>
        </div>
    </div>
  )
}

export default Error