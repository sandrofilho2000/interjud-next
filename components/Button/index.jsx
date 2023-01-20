import Link from 'next/link'
import React from 'react'

const Button = ({ text, link, aos }) => {
    return (
        <div data-aos={aos} data-aos-delay="500" data-aos-duration="1200" className="button">
            <Link href={`${link}`}>{text}</Link>
        </div>
    )
}

export default Button