import {TailSpin} from 'react-loader-spinner'
import styles from './Loader.module.css'

const Loader = ({text}) => {
  return (
    <div className={styles.wrapper}>
        <h2>Loading  {text} </h2>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}/>
    </div>
  )
}

export default Loader