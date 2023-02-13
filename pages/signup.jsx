import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import sign_bg from '../public/assets/images/login_bg.png'
import Image from 'next/image'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'

const Signup = () => {
    const { signup, setSystemNotificationActive, user } = useAuth()
    const [passwdStrength, setPasswdStrength] = useState('')
    const router = useRouter()

    const [data, setData] = useState({
        email: '',
        password: '',
        repeat_password: '',
    })

    useEffect(() => {

        let notification = {
            status: 'warning',
            active: true
        }

        notification.message = "Sua senha deve conter um caracter maiúsculo, um minúsculo e um especial"
        setSystemNotificationActive(notification)

    }, [])

    const handleSignup = async (e) => {
        e.preventDefault()
        let passwd_1 = password.value
        let passwd_2 = repeat_password.value
        let notification = {
            status: 'error',
            active: true
        }
        if (passwd_1 !== passwd_2) {
            notification.message = "As senhas não batem!"
            setSystemNotificationActive(notification)
            return false
        } else {
            if (passwd_1.length < 8) {
                notification.message = "Sua senha deve conter no mínimo 8 dígitos!"
                setSystemNotificationActive(notification)
                return false
            } else {
                validatePassWord()
            }
        }


        if (passwdStrength !== "strong") {
            notification.status = 'warning'
            notification.message = "Crie uma senha mais forte"
            setSystemNotificationActive(notification)
            return false
        }
        else {
            try {
                await signup(data.email, data.password)
                router.push("/painel/home")
            } catch (err) {
                console.log(err)
                notification.status = "error"
                if (err.message.includes("missing-email")) {
                    notification.message = "Digite seu endereço de E-mail"
                } else if (err.message.includes("email-already-in-use")) {
                    notification.message = "E-mail já cadastrado!"
                }
                setSystemNotificationActive(notification)
                return false
            }
        }
    }


    const validatePassWord = () => {
        let passwd_1 = password.value

        let regEx_lower = /[a-z]/
        let regEx_upper = /[A-Z]/
        let regEx_numeric = /[0-9]/
        let regEx_special = /[\!\@\#\$\%\¨\&\*\(\)]/
        let count_check = 0

        if (regEx_lower.exec(passwd_1)) {
            count_check++
        }

        else {
            count_check--
        }

        if (regEx_upper.exec(passwd_1)) {
            count_check++
        }

        else {
            count_check--
        }

        if (regEx_numeric.exec(passwd_1)) {
            count_check++
        }

        else {
            count_check--
        }

        if (regEx_special.exec(passwd_1)) {
            count_check++
        }

        else {
            count_check--
        }

        if (passwd_1.trim().length >= 8) {
            count_check += 2
        } else if (passwd_1.trim().length < 8) {
            count_check -= 3
        }

        if (count_check < 3) {
            setPasswdStrength("weak")
        } else if (count_check >= 3 && count_check < 5) {
            setPasswdStrength("regular")
        } else {
            setPasswdStrength("strong")
        }
    }

    return (
        <div
            style={{
                margin: 'auto',
            }}
        >
            <Navbar />
            <main className='loginMain'>
                <Image width={1024} height={560} src={sign_bg} alt="Login background" />
                <form onSubmit={handleSignup} className="formLogin">
                    <AiOutlineUserAdd />
                    {/* <RiLoginBoxFill/> */}
                    <input
                        type="email"
                        autoComplete='on'
                        name="email"
                        id="email"
                        placeholder='E-mail...'
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        defaultValue={data.email} />
                    <div className={passwdStrength}>

                        <input
                            type="text"
                            autoComplete='on'
                            name="password"
                            id="password"
                            placeholder='Senha...'
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    password: e.target.value,
                                });

                                validatePassWord()
                            }
                            }
                            defaultValue={data.password} />
                    </div>
                    <input
                        type="text"
                        autoComplete='on'
                        name="repeat_password"
                        id="repeat_password"
                        placeholder='Repetir senha...'
                        onChange={(e) =>
                            setData({
                                ...data,
                                repeat_password: e.target.value,
                            })
                        }
                        defaultValue={data.repeat_password} />
                    <input type="submit" defaultValue="SE CADASTRAR" />
                    <div className="links">
                        <Link className='signUp' href="/login">Já tenho uma conta</Link>
                        <Link className='resetPassword' href="/reset_password">Esqueci minha senha</Link>
                    </div>
                    <div className="loginWith">
                        <p>
                            ou continue com
                        </p>
                        <div className="icons">
                            <div className="facebook">
                                <FaFacebookF />
                            </div>
                            <div className="google">
                                <FcGoogle />
                            </div>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Signup
