import React from 'react'
import styles from './Backdrop.module.scss'

interface props {
    children: React.ReactNode;
    closeHandler: (event:any)=>void
    active: boolean;
}

const Backdrop = ({children, active, closeHandler}:props) => {

    if(!active)return null

    return (
        <div onClick={(e)=>closeHandler(e)} id="backdrop" className={styles.backdrop}>
            {children}
        </div>
    )
}

export default Backdrop
