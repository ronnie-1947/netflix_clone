import React, {useEffect, useState} from 'react'
import styles from './Nav.module.scss'
import Image from 'next/image'


const Nav = () => {

    const [show, setShow] = useState(false)

    useEffect(()=>{

        const listener = ()=>{
            if(window.scrollY > 100) {
                setShow(true)
            }else{
                setShow(false)
            }
        }

        window.addEventListener('scroll', listener)

        return ()=>{
            window.removeEventListener('scroll', listener)
        }

    },[])

    return (
        <nav className={`${styles.nav} ${show && styles.nav__sticky}`}>
            <span className={styles.nav__logo}>
                <Image src="/netflix.png" alt="logo" height={50} width={150} />
            </span>
            <span className={styles.nav__usr}>
                <Image src="/Netflix-avatar.png" alt="logo" height={50} width={50} />
            </span>

        </nav>
    )
}

export default Nav
