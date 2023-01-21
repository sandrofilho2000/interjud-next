import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [credits, setCredits] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const [searchMainActive, setSearchMainActive] = useState(false)
    const [offerOverlayActive, setOfferOverlayActive] = useState(false)
    const [newCreditOverlayActive, setNewCreditOverlayActive] = useState(false)
    const [filterOverlayActive, setFilterOverlayActive] = useState(false)
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
        if(!obj){
            return false
        }else{
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
            setLoading(false)
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
 
        return (
            <AuthContext.Provider value={{
                user,
                userInfo,
                credits,
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
                setSystemNotificationActive,
                searchContext,
                setSearchContext,
                newCreditOverlayActive,
                setNewCreditOverlayActive
            }}>
                { !isEmpty(user) && !isEmpty(userInfo) && !isEmpty(credits) ? children : children}
            </AuthContext.Provider>
        )
    
    


}