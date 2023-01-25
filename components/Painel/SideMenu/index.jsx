import Image from 'next/image'
import Link from 'next/link'
import React, { memo, useEffect } from 'react'
import { FaGlobeAmericas, FaHandshake } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { AiFillCreditCard, AiFillStar, AiFillHeart, AiOutlineUser, AiFillMessage, AiFillNotification, AiFillHome, AiOutlineWhatsApp } from 'react-icons/ai'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/router'

const SideMenuContainer = () => {
    const { sideMenuOpen, setSideMenuOpen, userInfo, logout, credits, user } = useAuth()

    const avatar = userInfo.avatar ? userInfo.avatar : 'https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/users%2Fdefault_avatar.pbg.webp?alt=media&token=bd0cd8cd-b54b-4b3d-abc7-91ffa81751c5'

    const first_name = userInfo ? userInfo.first_name : ''
 
    return (
        <aside className={`sideMenu ${sideMenuOpen ? 'active' : ''}`}>
            <ul>
                <li>
                    <Link href="./profile">
                        <span className='icon' title="Olá, Sandro">
                            <Image src={avatar} width={50} height={50} alt="Logo interjud da área logada" />
                        </span>
                        <span className='icon_text'>
                            Olá, {first_name}
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./home">
                        <span className='icon' title="Home">
                            <AiFillHome />
                        </span>
                        <span className='icon_text'>
                            Home
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./my_credits">
                        <span className='icon' title="Créditos">
                            <AiFillCreditCard />
                        </span>
                        <span className='icon_text'>
                            Meus créditos
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon' title="Propostas">
                            <FaHandshake />
                        </span>
                        <span className='icon_text'>
                            Propostas
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./favorites">
                        <span className='icon' title="Favoritos">
                            <AiFillHeart />
                        </span>
                        <span className='icon_text'>
                            Favoritos
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./profile">
                        <span className='icon' title="Perfil">
                            <AiOutlineUser />
                        </span>
                        <span className='icon_text'>
                            Perfil
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon' title="Mensagens">
                            <AiOutlineWhatsApp />
                        </span>
                        <span className='icon_text'>
                            Fale conosco
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon' title="Notificações">
                            <AiFillNotification />
                        </span>
                        <span className='icon_text'>
                            Notificações
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="../">
                        <span className='icon' title="Notificações">
                            <FaGlobeAmericas />
                        </span>
                        <span className='icon_text'>
                            Site
                        </span>
                    </Link>
                </li>
                
                <li>
                    <Link
                        onClick={() => {
                            logout()
                        }}
                        href="/login"
                    >
                        <span className='icon' title="Sair">
                            <BiLogOut />
                        </span>
                        <span className='icon_text'>
                            Sair
                        </span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

const SideMenu = memo(SideMenuContainer)

export default SideMenu