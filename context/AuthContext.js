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
    const [searchedCredits, setSearchedCredits] = useState([{}])

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
            setSearchedCredits
        }}>
            {loading ? '' : children}
        </AuthContext.Provider>
    )
}