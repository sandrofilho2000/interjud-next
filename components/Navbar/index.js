import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import Logo from '../../public/assets/images/logo.webp'

const Navbar = () => {
    const [subMenuActive, setSubMenuActive] = useState(false)

    let handleSubMenuActive = () =>{
        setSubMenuActive(!subMenuActive)
    }
    return (
        <header>

            <div className="container">
                <h1 className="logo">
                    <Link href="https://www.interjud.com.br/index.php">
                        <Image src={Logo} width={140} height={70} alt="InterJud Logo" />
                    </Link>
                </h1>
                <div className="menu-desktop">
                    <ul>
                        <li onClick={()=>{handleSubMenuActive()}} className="menu-submenu-desktop">
                            <Link href="#">CRÉDITOS</Link>
                            <ul className={`submenu-desktop ${subMenuActive ? 'active' : ''}`}>

                                <li><Link href="https://www.interjud.com.br/cadastrar-se-vendedor">VENDA SEU CRÉDITO</Link></li>

                                <li><Link href="https://www.interjud.com.br/cadastrar-se-investidor">COMPRE UM CRÉDITO</Link></li>

                                <li><Link href="https://www.interjud.com.br/portal-de-credito">PORTAL DE CRÉDITOS</Link></li>

                                <li><Link href="https://www.interjud.com.br/como-funciona">COMO FUNCIONA</Link></li>
                            </ul>
                        </li>
                        <li><Link href="https://www.interjud.com.br/sobre-nos">SOBRE NÓS</Link></li>
                        <li><Link href="https://www.interjud.com.br/contato">CONTATO</Link></li>
                        <li><Link href="https://www.interjud.com.br/login">LOGIN</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar