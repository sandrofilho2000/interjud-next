import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import Logo from '../../public/assets/images/logo.webp'

const Footer = () => {
    const [subFooterActive, setSubFooterActive] = useState(false)

    let handleSubFooterActive = () => {
        setSubFooterActive(!subFooterActive)
    }
    return (
        <footer>

            <div className="container">
                <div className="menu-desktop">
                    <ul>
                        <li className="menu-submenu-desktop"><Link href="#header">INÍCIO</Link></li>
                        <li><Link href="#sobre-nos">SOBRE NÓS</Link></li>
                        <li><Link href="#contato">CONTATO</Link></li>
                        <li><Link href="/login">LOGIN</Link></li>
                    </ul>
                </div>
                <h1 className="logo">
                    <Link href="#index.php">
                        <Image src={Logo} width={140} height={70} alt="InterJud Logo" />
                    </Link>
                </h1>
            </div>
        </footer>
    )
}

export default Footer