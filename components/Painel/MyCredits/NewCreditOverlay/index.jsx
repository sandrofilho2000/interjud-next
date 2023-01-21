import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { AiFillCloseCircle, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { FaCheck, FaStar, FaStarHalf } from 'react-icons/fa'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useAuth } from '../../../../context/AuthContext'
import logo from '../../../../public/assets/images/logo_j.webp'
const NewCreditOverlay = () => {

    const { newCreditOverlayActive, setNewCreditOverlayActive, systemNotificationActive, setSystemNotificationActive } = useAuth()

    const [ porcentagemNegociar, setPorcentagemNegociar ] = useState(100)
    const [ sliderLeft, setSliderLeft ] = useState(0)
    const [ ratingInfoActive, setRatingInfoActive ] = useState(false)

    const numProcesso = useRef()
    const nameProcesso = useRef()
    const classeProcesso = useRef()

    const valueProcesso = useRef()
    const honProcesso = useRef()
    const porcentagemProcesso = useRef()

    const [ firstSlideOk, setFirstSlideOk ] = useState()
    const [ secondSlideOk, setSecondSlideOk ] = useState()
    const [ numProcessoLength, setNumProcessoLength ] = useState(false)

    const [valorComHonorarios, setValorComHonorarios] = useState("")
    const [valorNegociar, setValorNegociar] = useState("")

    let passToCurrency = (num) =>{
        let valor = String(num)
        valor = valor.replaceAll(".", "")
        valor = valor.replaceAll(",", ".")
        valor = valor.replaceAll("R$", "")
        valor = Number(valor.trim())
        let newValor = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return newValor
    }

    let passToInteger = (num) =>{
        let valor = num
        valor = valor.replaceAll(".", "")
        valor = valor.replaceAll(",", ".")
        valor = valor.replaceAll("R$", "")

        let newValor = Number(valor.trim())

        return newValor
    }

    let formatNumProcess = (e) =>{
        e.target.value = (e.target.value.match(/\d/g) || []).join('')
        let valor = e.target.value
        let format_value = (valor.match(/\d/g) || []).join('')

        if(numProcessoLength === 20 && valor.length === 20){
            let new_valor = [valor.slice(0, 7), '-', valor.slice(7, 9), '.', valor.slice(9,13), '.', valor.slice(13,14), '.', valor.slice(14,16), '.', valor.slice(16, 20) ].join('')
            e.target.value = new_valor
        }
    }

    let formatValueProcess = (e) =>{
        let _valor = e.target.value
        let newValor = passToCurrency(_valor)
        e.target.value = newValor
    }


    let handleFirstSlideOk = (e) =>{
        let num_processo = numProcesso.current.value
        let count_num_processo = (num_processo.match(/\d/g) || []).length

        let name_processo = nameProcesso.current.value
        setNumProcessoLength(count_num_processo)

        let classe_processo = classeProcesso.current.value == 'Classe judicial' ? '' : classeProcesso.current.value

        if(name_processo.length === 0 || count_num_processo !== 20 || classe_processo === ''){
            setFirstSlideOk(false)
        }else{
            setFirstSlideOk(true)
        }
    }

    let handleSecondSliderOk = () =>{
        let valor_processo = Number(passToInteger(valueProcesso.current.value))
        let hon_processo = Number(honProcesso.current.value)
        hon_processo = hon_processo > 100 ? hon_processo = 100 : hon_processo
        let porcentagem_processo = Number(porcentagemProcesso.current.value)

        let valor_com_honorarios = (valor_processo / 100) * hon_processo
        valor_com_honorarios =  valor_processo - valor_com_honorarios
        valor_com_honorarios = valor_com_honorarios.toFixed(2).replaceAll(".", ',')

        setValorComHonorarios(passToCurrency(valor_com_honorarios))

        let valor_negociar = (passToInteger(valor_com_honorarios) / 100) * porcentagem_processo
        valor_negociar = valor_negociar.toFixed(2).replaceAll(".", ',')
        setValorNegociar(passToCurrency(valor_negociar))

        if(passToInteger(valor_negociar)){
            setSecondSlideOk(true)
        }else{
            setSecondSlideOk(false)
        }
    }


    let handleSliderLeft = (num) => {
        const maxLeft = sliderLeft === 2 && num === 1
        const minLeft = sliderLeft === 0 && num === -1

        const notification = {}

        
        if (!maxLeft && !minLeft) {
            if(num === 1){
                if(sliderLeft === 0){
                    if(firstSlideOk){
                        setSliderLeft(sliderLeft + num)
                    }else{
                        notification.message = "Revise todos os campos antes de prosseguir"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                }if(sliderLeft === 1){
                    if(secondSlideOk){
                        setSliderLeft(sliderLeft + num)
                    }else{
                        notification.message = "Insira um valor à ser negociádo valido!"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                }
            }else{
                setSliderLeft(sliderLeft + num)
            }
        }
    }


    return (
        <div className={`newCreditOverlay overlay ${newCreditOverlayActive ? 'active' : ''}`}>

            <div className="titleClose">
                <h2>NOVO CRÉDITO <small>({sliderLeft + 1}/3)</small></h2>
                <AiFillCloseCircle onClick={() => setNewCreditOverlayActive(false)} className="closeNewCreditOverlay" />
            </div>

            <div className="newCreditContainer">
                <Image src={logo} width={520} height={530} alt="Novo crédito" />
                <div className="newCreditSlider" style={{ left: -(520 * sliderLeft) }}>
                    <div className="newCreditSingle">
                        <form className='firstForm'>
                            <input type="text" onChange={(e)=>{handleFirstSlideOk(e)}} ref={nameProcesso} maxLength={25} placeholder='Réu/Devedor' />
                            <div className="num_processo_container">
                                <input type="text" onChange={(e)=>{handleFirstSlideOk(e)}} maxLength={25} ref={numProcesso} onBlur={(e)=>{formatNumProcess(e)}}  placeholder='Nº do processo (Apenas dígitos)' />
                                <p className={numProcessoLength === 20 ? 'success' : 'error'}>
                                    {numProcessoLength}/20
                                    <FaCheck className='success'/>
                                    <AiOutlineClose className='error'/>
                                </p>
                            </div>
                            <select onChange={(e)=>{handleFirstSlideOk(e)}} ref={classeProcesso}>
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
                            <input type="text" ref={valueProcesso}  onChange={(e)=>{handleSecondSliderOk(e)}} placeholder='Valor: R$' onBlur={(e)=>{formatValueProcess(e)}}  />

                            <input type="number" ref={honProcesso} min={0} max={100} onChange={(e)=>{handleSecondSliderOk(e)}} placeholder='Hon. contratuais(%):' />

                            <div className="porcentagem_negociar">
                                <p>Porcentagem a negociar</p>
                                <input type="range" id="porcentagem_negociar" ref={porcentagemProcesso} onChange={(e) => { setPorcentagemNegociar(e.target.value); handleSecondSliderOk(e) }} min={20} max={100} step={20} defaultValue={100} />
                                <span>{porcentagemNegociar}%</span>
                            </div>

                            <div className="valores">
                                <p className="com_honorarios">
                                    Valor com honorários: <span>{valorComHonorarios}</span>
                                </p>
                                <p className="valor_negociado">
                                    Valor a ser negociado: <span>{valorNegociar}</span>
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
                            <input type="button" className='recusar' id='recusar' defaultValue="RECUSAR" />
                            <input type="button" className='aceitar' id='aceitar' defaultValue="ACEITAR" onClick={() => setRatingInfoActive(true)}/>
                        </div>

                        <AiFillInfoCircle className='setInfoRating' onClick={() => setRatingInfoActive(true)}/>

                        <div className="ratingInfo">
                            <p>
                                A INTERJUD disponibiliza GRATUITAMENTE um serviço de avaliação do seu crédito, realizada por uma equipe de especialista. Serão atribuídas de uma a cinco ESTRELAS ao seu crédito, considerando a solidez do devedor, a fase processual em que se encontra, o tempo médio de conclusão do processo, dentre outras características.
                            </p>

                            <input type="button" className='aceitar' id='aceitar' defaultValue="ACEITAR" onClick={() => setRatingInfoActive(true)}/>

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