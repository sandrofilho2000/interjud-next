import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import Logo from '../../public/assets/images/logo.webp'

const Navbar = () => {
    const { user } = useAuth()
    const [subMenuActive, setSubMenuActive] = useState(false)

    let handleSubMenuActive = () =>{
        setSubMenuActive(!subMenuActive)
    }
    return (
        <header className='header' id="header">

            <div className="container">
                <h1 className="logo">
                    <Link href="/">
                        <Image src={Logo} width={140} height={70} alt="InterJud Logo" />
                    </Link>
                </h1>
                <div className="menu-desktop">
                    <ul>
                        <li onClick={()=>{handleSubMenuActive()}} className="menu-submenu-desktop">
                            <Link href="#">CRÉDITOS</Link>
                            <ul className={`submenu-desktop ${subMenuActive ? 'active' : ''}`}>

                                <li><Link href="#cadastrar-se-vendedor">VENDA SEU CRÉDITO</Link></li>

                                <li><Link href="#cadastrar-se-investidor">COMPRE UM CRÉDITO</Link></li>

                                <li><Link href="/painel/home/">PORTAL DE CRÉDITOS</Link></li>

                                <li><Link href="#como-funciona">COMO FUNCIONA</Link></li>
                            </ul>
                        </li>
                        <li><Link href="#sobre-nos">SOBRE NÓS</Link></li>
                        <li><Link href="#contato">CONTATO</Link></li>
                        {
                            
                            user ? (
                                <li><Link href="/painel/home/">PAINEL</Link></li>
                                )
                                : 
                                (
                                <li><Link href="/login">LOGIN</Link></li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar