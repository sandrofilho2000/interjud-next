import { useRouter } from 'next/router'
import React, { useState } from 'react'
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
    const { user, signup } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',   
    })

    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            await signup(data.email, data.password)
        } catch (err) {
            console.log(err)
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
                <Image width={1024} height={560} src={sign_bg}  alt="Login background"/>
                <form onSubmit={handleSignup} className="formLogin">
                    <AiOutlineUserAdd />
                    {/* <RiLoginBoxFill/> */}
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
                        value={data.email} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Senha...'
                        onChange={(e) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Repetir senha...'
                        onChange={(e) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password} />
                    <input type="submit" value="SE CADASTRAR" />
                    <div className="links">
                        <Link className='signUp' href="/login">Já tenho uma conta</Link>
                        <Link className='resetPassword' href="#">Esqueci minha senha</Link>
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
