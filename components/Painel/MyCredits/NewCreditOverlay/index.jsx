import Image from 'next/image'
import React, { use, useRef, useState } from 'react'
import { AiFillCloseCircle, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { FaCheck, FaStar, FaStarHalf } from 'react-icons/fa'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useAuth } from '../../../../context/AuthContext'
import logo from '../../../../public/assets/images/logo_j.webp'
const NewCreditOverlay = () => {
    const [ porcentagemNegociar, setPorcentagemNegociar ] = useState(100)
    const [ sliderLeft, setSliderLeft ] = useState(0)
    const [ ratingInfoActive, setRatingInfoActive ] = useState(false)
    const { newCreditOverlayActive, setNewCreditOverlayActive } = useAuth()

    const [ numProcesso, setNumProcesso ] = useState()
    const [ numProcessoLength, setNumProcessoLength ] = useState(0)
    const numProcessoInput = useRef()

    let handleSliderLeft = (num) => {
        const maxLeft = sliderLeft === 2 && num === 1
        const minLeft = sliderLeft === 0 && num === -1
        if (!maxLeft && !minLeft) {
            setSliderLeft(sliderLeft + num)
        }
    }

    let handleNumProcesso = (e) =>{
        let valor = numProcessoInput.current.value
        let count = (valor.match(/\d/g) || []).length
        let numbers = valor.match(/\d/g) || []

/*         let output;

        setNumProcessoLength(count)
        setNumProcesso(numbers.join(''))
        

        if(count == 7){
            output = [numbers.slice(0, 7), '-', numbers.slice(7)]
            output = output.join('')
            setNumProcesso(output)
        }
        if(count == 9){
            output = [numbers.slice(0, 7), '-', numbers.slice(7,9), '.', numbers.slice(9)]
            output = output.join('')
            setNumProcesso(output)
        }
        if(count == 14){
            output = [numbers.slice(0, 7), '-', numbers.slice(7,9), '.', numbers.slice(9,13), '.', numbers.slice(13,14)]
            output = output.join('')
            setNumProcesso(output)
        }
        if(count == 16){
            output = [numbers.slice(0, 7), '-', numbers.slice(7,9), '.', numbers.slice(9,13), '.', numbers.slice(13,14), '.', numbers.slice(14,16)]
            output = output.join('')
            setNumProcesso(output)
        } */

    }

    return (
        <div className={`newCreditOverlay overlay ${newCreditOverlayActive ? 'active' : ''}`}>

            <div className="titleClose">
                <h2>NOVO CRÉDITO <small>({sliderLeft + 1}/3)</small></h2>
                <AiFillCloseCircle onClick={() => setNewCreditOverlayActive(false)} className="closeNewCreditOverlay" />
            </div>

            <div className="newCreditContainer">
                <Image src={logo} width={420} height={430} />
                <div className="newCreditSlider" style={{ left: -(420 * sliderLeft) }}>
                    <div className="newCreditSingle">
                        <form className='firstForm'>
                            <input type="text" placeholder='Réu/Devedor' />
                            <div className="num_processo_container">
                                <input type="text" onChange={(e)=>{handleNumProcesso(e)}} ref={numProcessoInput}  placeholder='Nº do processo (Apenas dígitos)' />
                                <p className='error'>
                                    {numProcessoLength}/20
                                    <FaCheck className='success'/>
                                    <AiOutlineClose className='error'/>
                                </p>
                            </div>
                            <select name="" id="">
                                <option defaultValue="">
                                    Classe judicial
                                </option>
                                <option defaultValue="Trabalhista">
                                    Trabalhista
                                </option>
                                <option defaultValue="Precatório">
                                    Precatório
                                </option>
                                <option defaultValue="Cívil">
                                    Cívil
                                </option>
                                <option defaultValue="Consumidor">
                                    Consumidor
                                </option>
                            </select>
                        </form>
                    </div>

                    <div className="newCreditSingle">
                        <form className='secondForm'>
                            <input type="text" placeholder='Valor: R$' />
                            <input type="number" min={0} max={100} placeholder='Hon. contratuais(%):' />

                            <div className="porcentagem_negociar">
                                <p>Porcentagem a negociar</p>
                                <input type="range" id="porcentagem_negociar" onChange={(e) => { setPorcentagemNegociar(e.target.value) }} min={20} max={100} step={20} defaultValue={100} />
                                <span>{porcentagemNegociar}%</span>
                            </div>

                            <div className="valores">
                                <p className="com_honorarios">
                                    Valor com honorários: <span>R$12.000,00</span>
                                </p>
                                <p className="valor_negociado">
                                    Valor a ser negociado: <span>R$12.000,00</span>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className={`newCreditSingle ratingForm ${ratingInfoActive ? 'ratingInfoActive' : ''}`}>
                        <div className="stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <h2>SISTEMA DE RATING</h2>
                        <p>
                            Deseja que a Interjud avalie seu crédito gratuitamente?
                        </p>
                        <div className="vantagens">
                            <div className="vantagem_single">
                                <FaCheck /> <span>Estímativa de deságio aceitável</span>
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Receber a melhor oferta
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Agilidade na negociação
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Maior visibilidade
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Rapidez, transparência e segurança
                            </div>
                        </div>
                        <div className="aceitarRating">
                            <input type="button" className='recusar' id='recusar' value="RECUSAR" />
                            <input type="button" className='aceitar' id='aceitar' value="ACEITAR" />
                        </div>

                        <AiFillInfoCircle className='setInfoRating' onClick={() => setRatingInfoActive(true)}/>

                        <div className="ratingInfo">
                            <p>
                                A INTERJUD disponibiliza GRATUITAMENTE um serviço de avaliação do seu crédito, realizada por uma equipe de especialista. Serão atribuídas de uma a cinco ESTRELAS ao seu crédito, considerando a solidez do devedor, a fase processual em que se encontra, o tempo médio de conclusão do processo, dentre outras características.
                            </p>

                            <small>
                            **Ao aderir à avaliação do seu crédito, você aceita a pontuação atribuída pelos especialistas e se compromete a negociar este crédito exclusivamente pela plataforma InterJud pelo prazo de 6 meses.
                            </small>

                            <AiFillCloseCircle className='setInfoRating' onClick={() => setRatingInfoActive(false)}/>
                        </div>
                    </div>

                </div>
                <div className="newCreditArrows">
                    {
                        sliderLeft !== 0 && (
                            <div className="arrowPrev arrow" onClick={() => { handleSliderLeft(-1) }}>
                                <FcPrevious />
                            </div>
                        )
                    }

                    {
                        sliderLeft !== 2 && (
                            <div className="arrowNext arrow" onClick={() => { handleSliderLeft(1) }}>
                                <FcNext />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NewCreditOverlay