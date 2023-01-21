import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'

const useUserInfo = () => {
    const {user} = useAuth()
    const [userInfo, setUserInfo] = useState()

    const getUserInfo = async (id) => {
        const userInfoCollection = doc(db, "users", id)
        const docSnap = await getDoc(userInfoCollection);
        setUserInfo(docSnap.data())
    }

    useEffect(() => {
        if (user) {
            getUserInfo(id)
        }
    }, [user])

    return {
        userInfo: userInfo    
    }
}

export default useUserInfo