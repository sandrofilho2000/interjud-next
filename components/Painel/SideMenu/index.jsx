import Image from 'next/image'
import Link from 'next/link'
import React, { memo } from 'react'
import Avatar from '../../../public/assets/images/Depoimentos/foto1.jpg'
import { FaGlobeAmericas, FaHandshake } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { AiFillCreditCard, AiFillStar, AiFillHeart, AiOutlineUser, AiFillMessage, AiFillNotification, AiFillHome } from 'react-icons/ai'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/router'

const SideMenuContainer = () => {
    const { sideMenuOpen, setSideMenuOpen, user, logout } = useAuth()
    const router = useRouter()

    return (
        <aside className={`sideMenu ${sideMenuOpen ? 'active' : ''}`}>
            <ul>
                <li>
                    <Link href="#">
                        <span className='icon' title="Olá, Sandro">
                            <Image src={Avatar} width={50} height={50} alt="Logo interjud da área logada" />
                        </span>
                        <span className='icon_text'>
                            Olá, Sandro
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./">
                        <span className='icon' title="Home">
                            <AiFillHome />
                        </span>
                        <span className='icon_text'>
                            Home
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="./painel/my_credits">
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
                        <span className='icon' title="Créditos Avaliados">
                            <AiFillStar />
                        </span>
                        <span className='icon_text'>
                            Créditos Avaliados
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
                    <Link href="#">
                        <span className='icon' title="Favoritos">
                            <AiFillHeart />
                        </span>
                        <span className='icon_text'>
                            Favoritos
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
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
                            <AiFillMessage />
                        </span>
                        <span className='icon_text'>
                            Mensagens
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
                            router.push("/login")
                        }}
                        href="#"
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