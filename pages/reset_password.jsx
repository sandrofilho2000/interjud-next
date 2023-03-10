import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import login_bg from '../public/assets/images/login_bg.png'
import Image from 'next/image'
import { FiLogIn } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()

    const { reset_password, login, setSystemNotificationActive } = useAuth()

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        let email = data.email
        let password = ""

        try {
            await login(email, password)
            router.push('/painel/home')
        } catch (err) {
            let notification = {
                status:'error',
                active:true
            }
            
            if (err.message.includes("wrong-password")) {
                notification.message = "E-mail ou senha incorreta!"
            } 

            else if (err.message.includes("invalid-email")) {
                notification.message = "E-mail inválido!"
            }

            else if (err.message.includes("user-not-found")) {
                notification.link ="/signup"
                notification.status = "success"
                notification.message = "Usuário não cadastrado. Clique aqui para criar sua conta!"
            }

            else if (err.message.includes("internal-error")) {
                reset_password('sandrofilho98@yahoo.com.br')
                
                return false
            }

            console.log(err.message)

            setSystemNotificationActive(notification)
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
                <Image width={1024} height={560} src={login_bg} alt="Login background"/>
                <form onSubmit={handleLogin} className="formLogin">
                    <FiLogIn />
                    <input
                        type="email"
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

                    <input type="submit" defaultValue="ENTRAR" />
                    <div className="links">
                        <Link className='signUp' href="/signup">Não tenho uma conta</Link>
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

export default Login
