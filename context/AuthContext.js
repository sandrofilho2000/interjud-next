import { createContext, useContext, useEffect, useState } from 'react'

import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} 

from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({ address: {} })
    const [credits, setCredits] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const [searchMainActive, setSearchMainActive] = useState(false)
    const [googleSignInInfo, setGoogleSignInInfo] = useState({})
    const [faceSignInInfo, setFaceSignInInfo] = useState({})
    const [offerOverlayActive, setOfferOverlayActive] = useState(false)
    const [infoOverlayActive, setInfoOverlayActive] = useState(false)
    const [newCreditOverlayActive, setNewCreditOverlayActive] = useState(false)
    const [filterOverlayActive, setFilterOverlayActive] = useState(false)
    const [favoritesCredits, setFavoritesCredits] = useState([])
    const [searchedCredits, setSearchedCredits] = useState([{}])
    const [currCreditOffer, setCurrCreditOffer] = useState({})
    const [searchContext, setSearchContext] = useState({
        name: null,
        class: null,
        min: null,
        max: null,
        rating: null
    })
    const [systemNotificationActive, setSystemNotificationActive] = useState({ active: false, status: '', message: "", link: "#" })

    let isEmpty = (obj) => {
        if (!obj) {
            return false
        } else {
            return Object.values(obj).every(x => x === null || x === '');
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
                const userInfoCollection = doc(db, "users", user.uid)
                const getUserInfo = async () => {
                    const docSnap = await getDoc(userInfoCollection);
                    setUserInfo(docSnap.data())
                }
                getUserInfo(user.uid)

            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])


    useEffect(() => {
        setTimeout(() => {
            if (systemNotificationActive.active) {
                setSystemNotificationActive({ ...systemNotificationActive, active: false })
            }
        }, 4000)
    }, [systemNotificationActive])


    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const reset_password = (email, password) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logout = async () => {
        setUser({})
        await (signOut(auth))
    }



    ///GET CREDITS
    useEffect(() => {
        const creditsCollectionRef = collection(db, "creditos")
        const getCredits = async () => {
            const data = await getDocs(creditsCollectionRef)
            let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCredits(cre)
        }
        getCredits()
    }, [])

    ///GET FAVORITES
    useEffect(() => {
        if (userInfo) {
            if (userInfo.favorites) {
                setFavoritesCredits(
                    credits.filter(item => userInfo.favorites.includes(item.id))
                )
            }
        }
    }, [credits, userInfo])

    return (
        <AuthContext.Provider value={{
            user,
            userInfo,
            credits,
            setCredits,
            favoritesCredits,
            login,
            signup,
            logout,
            signInWithGoogle,
            signInWithFacebook,
            reset_password,
            sideMenuOpen,
            setFavoritesCredits,
            setSideMenuOpen,
            searchMainActive,
            setSearchMainActive,
            searchedCredits,
            setSearchedCredits,
            infoOverlayActive,
            setInfoOverlayActive,
            offerOverlayActive,
            loading,
            setLoading,
            setOfferOverlayActive,
            filterOverlayActive,
            setFilterOverlayActive,
            currCreditOffer,
            setCurrCreditOffer,
            googleSignInInfo,
            setGoogleSignInInfo,
            faceSignInInfo,
            setFaceSignInInfo,
            systemNotificationActive,
            setSystemNotificationActive,
            searchContext,
            setSearchContext,
            setUserInfo,
            newCreditOverlayActive,
            setNewCreditOverlayActive
        }}>
            {!isEmpty(user) && !isEmpty(userInfo) && !isEmpty(credits) && !isEmpty(favoritesCredits) ? children : children}
        </AuthContext.Provider>
    )




}