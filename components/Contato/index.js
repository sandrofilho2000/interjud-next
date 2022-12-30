import React from 'react'
import LineTitle from '../LineTitle'
import { Button } from '../Button'
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai"
import { FiInstagram } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"

const Contato = () => {
    return (
        <section className='contato' id='contato'>
            <div className='container'>
                <div className='contato-side contato-left'>
                    <LineTitle text="Estamos em"/>
                    <div className='socialMedia'>
                        <FiInstagram/>
                        <FaWhatsapp/>
                        <AiOutlineMail/>
                    </div>
                </div>
                <div className='contato-side contato-right'>
                    <LineTitle text="Contato"/>
                    <form>
                        <input className='contactName' type="text" name="contactName" id="contactName" placeholder='Nome: '/>
                        <input className='contactEmail' type="email" name="contactEmail" id="contactEmail" placeholder='E-mail: '/>
                        <select className='contactTopic' name="contactTopic" id="contactTopic">
                            <option selected disabled>
                                Assunto
                            </option>
                            <option>
                                Dúvidas
                            </option>
                            <option>
                                Elogios
                            </option>
                            <option>
                                Reclamações
                            </option>
                        </select>
                        <textarea className='contactMessage' name="contactMessage" id="contactMessage" placeholder='Sua Mensagem...'>
                        </textarea>
                        <button type="button" className='enviar button' id='enviar'>ENVIAR</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contato