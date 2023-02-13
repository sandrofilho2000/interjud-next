import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'

const FaleConoscoMain = () => {

    const { sideMenuOpen } = useAuth()

    return (
        <main className={`main profileMain ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                FALE CONOSCO
            </h1>
            <form>
                <select className='contactTopic' name="contactTopic" id="contactTopic">
                    <option defaultValue="">
                        Assunto
                    </option>
                    <option defaultValue="Dúvidas">
                        Dúvidas
                    </option>
                    <option defaultValue="Elogios">
                        Elogios
                    </option>
                    <option defaultValue="Reclamações">
                        Reclamações
                    </option>
                </select>
                <textarea className='contactMessage' name="contactMessage" id="contactMessage" placeholder='Sua Mensagem...'>
                </textarea>
                <button type="button" className='enviar button' id='enviar'>ENVIAR <FaWhatsapp/></button>
            </form>
        </main>
    )
}

export default FaleConoscoMain