import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo_J from '../../../public/assets/images/logo_j.webp'
import { FaGlobeAmericas, FaHandshake } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { AiFillCreditCard, AiFillStar, AiFillHeart, AiOutlineUser, AiFillMessage, AiFillNotification } from 'react-icons/ai'

const SideMenu = () => {
    return (
        <aside className='sideMenu active'>
            <ul>
                <li>
                    <Link href="../">
                        <span className='icon'>
                            <Image src={Logo_J} width={40} height={55}/>
                        </span>
                        <span className='icon_text'>
                            Olá, Sandro
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <span className='icon'>
                            <FaGlobeAmericas/>
                        </span>
                        <span className='icon_text'>
                            Home
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiFillCreditCard/>
                        </span>
                        <span className='icon_text'>
                            Créditos
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiFillStar/>
                        </span>
                        <span className='icon_text'>
                            Créditos Avaliados
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon'>
                            <FaHandshake/>
                        </span>
                        <span className='icon_text'>
                            Propostas
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiFillHeart/>
                        </span>
                        <span className='icon_text'>
                            Favoritos
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiOutlineUser/>
                        </span>
                        <span className='icon_text'>
                            Perfil
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiFillMessage/>
                        </span>
                        <span className='icon_text'>
                            Mensagens
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <span className='icon'>
                            <AiFillNotification/>
                        </span>
                        <span className='icon_text'>
                            Notificações
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <span className='icon'>
                            <BiLogOut/>
                        </span>
                        <span className='icon_text'>
                            Deslogar
                        </span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default SideMenu