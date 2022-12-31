import React, { useEffect, useState } from 'react'
import MainTop from './MainTop'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../../context/AuthContext'
import { db, storage } from '../../../firebase';
import Credit from '../../Credit';

const Main = () => {
    const {sideMenuOpen, setSideMenuOpen} = useAuth()
    const [credits, setCredits] = useState([{}])
    const creditsCollectionRef = collection(db, "creditos")

    const getCredits = async () => {
        const data = await getDocs(creditsCollectionRef)
        let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setCredits(cre)
    }

    useEffect(()=>{
        getCredits()
    }, [])

    
    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <MainTop/>
            <h1>
                HOME
            </h1>
            <div className='creditsWrapper'>
                {
                    credits.map((item)=>{
                        return (
                            <Credit credit={item} />
                        )
                    })
                }
                {
                    credits.map((item)=>{
                        return (
                            <Credit credit={item} />
                        )
                    })
                }
                {
                    credits.map((item)=>{
                        return (
                            <Credit credit={item} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Main