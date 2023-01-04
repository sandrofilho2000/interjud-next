import Link from 'next/link'
import React from 'react'

const Button = ({ text, link }) => {
    return (
        <div className="button">
            <Link href={`${link}`}>{text}</Link>
        </div>
    )
}

export default Button