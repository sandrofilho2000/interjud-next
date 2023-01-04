import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

const useCredits = () => {
    const [credits, setCredits] = useState([{}])
    const creditsCollectionRef = collection(db, "creditos")

    const getCredits = async () => {
        const data = await getDocs(creditsCollectionRef)
        let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setCredits(cre)
    }

    useEffect(() => {
        getCredits()
    }, [])

    return {
        credits: credits    
    }
}

export default useCredits