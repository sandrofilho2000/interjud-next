import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const [searchMainActive, setSearchMainActive] = useState(false)
    const [offerOverlayActive, setOfferOverlayActive] = useState(false)
    const [filterOverlayActive, setFilterOverlayActive] = useState(false)
    const [searchedCredits, setSearchedCredits] = useState([{}])
    const [currCreditOffer, setCurrCreditOffer] = useState({})
    const [systemNotificationActive, setSystemNotificationActive] = useState({active: false, status: '', message: ""})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        setTimeout(()=>{
            if(systemNotificationActive.active){
                setSystemNotificationActive({...systemNotificationActive, active: false})
            }
        }, 4000)
    }, [systemNotificationActive])

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await (signOut(auth))
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            sideMenuOpen,
            setSideMenuOpen,
            searchMainActive,
            setSearchMainActive,
            searchedCredits,
            setSearchedCredits,
            offerOverlayActive,
            setOfferOverlayActive,
            filterOverlayActive,
            setFilterOverlayActive,
            currCreditOffer,
            setCurrCreditOffer,
            systemNotificationActive,
            setSystemNotificationActive
        }}>
            {loading ? '' : children}
        </AuthContext.Provider>
    )
}