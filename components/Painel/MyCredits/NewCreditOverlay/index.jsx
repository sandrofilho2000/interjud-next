import { addDoc, collection } from 'firebase/firestore'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { AiFillCloseCircle, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { FaCheck, FaStar, FaStarHalf } from 'react-icons/fa'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useAuth } from '../../../../context/AuthContext'
import { db } from '../../../../firebase'
import logo from '../../../../public/assets/images/logo_j.webp'
const NewCreditOverlay = () => {

    const { newCreditOverlayActive, setNewCreditOverlayActive, systemNotificationActive, setSystemNotificationActive, credits, setCredits, userInfo, setLoading, loading } = useAuth()

    const [porcentagemNegociar, setPorcentagemNegociar] = useState(100)
    const [sliderLeft, setSliderLeft] = useState(0)
    const [ratingInfoActive, setRatingInfoActive] = useState(false)

    let isEmpty = (obj) => {
        if (!obj) {
            return false
        } else {
            return Object.values(obj).some(x => x === null || x === '');
        }
    }

    const notification = {}

    const numProcesso = useRef()
    const nameProcesso = useRef()
    const classeProcesso = useRef()

    const valueProcesso = useRef()
    const honProcesso = useRef()
    const porcentagemProcesso = useRef()

    const [newProcesso, setNewProcesso] = useState({})

    const [firstSlideOk, setFirstSlideOk] = useState()
    const [secondSlideOk, setSecondSlideOk] = useState()
    const [numProcessoLength, setNumProcessoLength] = useState(false)
    const [statusRatingProcesso, setStatusRatingProcesso] = useState(null)

    const [valorComHonorarios, setValorComHonorarios] = useState("")
    const [valorNegociar, setValorNegociar] = useState("")

    let passToCurrency = (num) => {
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

    let passToInteger = (num) => {
        let valor = num
        valor = valor.replaceAll(".", "")
        valor = valor.replaceAll(",", ".")
        valor = valor.replaceAll("R$", "")

        let newValor = Number(valor.trim())

        return newValor
    }

    let formatNumProcess = (e) => {
        e.target.value = (e.target.value.match(/\d/g) || []).join('')
        let valor = e.target.value
        let format_value = (valor.match(/\d/g) || []).join('')

        if (numProcessoLength === 20 && valor.length === 20) {
            let new_valor = [valor.slice(0, 7), '-', valor.slice(7, 9), '.', valor.slice(9, 13), '.', valor.slice(13, 14), '.', valor.slice(14, 16), '.', valor.slice(16, 20)].join('')
            e.target.value = new_valor
        }
    }

    let formatValueProcess = (e) => {
        let _valor = e.target.value
        let newValor = passToCurrency(_valor)
        e.target.value = newValor
    }

    let handleFirstSlideOk = (e) => {
        let num_processo = numProcesso.current.value
        let count_num_processo = (num_processo.match(/\d/g) || []).length

        let name_processo = nameProcesso.current.value
        setNumProcessoLength(count_num_processo)

        let classe_processo = classeProcesso.current.value == 'Classe judicial' ? '' : classeProcesso.current.value

        if (name_processo.length === 0 || count_num_processo !== 20 || classe_processo === '') {
            setFirstSlideOk(false)
        } else {
            setFirstSlideOk(true)
        }
    }

    let handleSecondSliderOk = () => {
        let valor_processo = Number(passToInteger(valueProcesso.current.value))
        let hon_processo = Number(honProcesso.current.value)
        hon_processo = hon_processo > 100 ? hon_processo = 100 : hon_processo
        let porcentagem_processo = Number(porcentagemProcesso.current.value)

        let valor_com_honorarios = (valor_processo / 100) * hon_processo
        valor_com_honorarios = valor_processo - valor_com_honorarios
        valor_com_honorarios = valor_com_honorarios.toFixed(2).replaceAll(".", ',')

        setValorComHonorarios(passToCurrency(valor_com_honorarios))

        let valor_negociar = (passToInteger(valor_com_honorarios) / 100) * porcentagem_processo
        valor_negociar = valor_negociar.toFixed(2).replaceAll(".", ',')
        setValorNegociar(passToCurrency(valor_negociar))

        if (passToInteger(valor_negociar)) {
            setSecondSlideOk(true)
        } else {
            setSecondSlideOk(false)
        }
    }

    let handleSliderLeft = (num) => {
        const maxLeft = sliderLeft === 2 && num === 1
        const minLeft = sliderLeft === 0 && num === -1

        if (!maxLeft && !minLeft) {
            if (num === 1) {
                if (sliderLeft === 0) {
                    if (firstSlideOk) {
                        setSliderLeft(sliderLeft + num)
                    } else {
                        notification.message = "Revise todos os campos antes de prosseguir"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                } if (sliderLeft === 1) {
                    if (secondSlideOk) {
                        setSliderLeft(sliderLeft + num)
                    } else {
                        notification.message = "Insira um valor ?? ser negoci??do valido!"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                }
            } else {
                setSliderLeft(sliderLeft + num)
            }
        }
    }

    let handleAddNewCredit = () =>{
        var newCredits = [newProcesso, ...credits]

        setLoading(true)
        
        if (!isEmpty(newProcesso)) {
            setCredits(newCredits)
            const docRef = addDoc(collection(db, "credits"), newProcesso);
            notification.message = "Cr??dito adicionado com sucesso!"
            notification.status = 'success'
            notification.active = true
            setSystemNotificationActive(notification)
        }
        setLoading(false)
    }



    useEffect(() => {
        setNewProcesso({ ...newProcesso, })

        setNewProcesso({
            name: nameProcesso.current.value.trim(),
            user_id: userInfo.id,
            class: classeProcesso.current.value.trim(),
            img: "https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Favianca.png?alt=media&token=9abdcef2-dc40-48f5-b788-b4b46646aad6",
            num_processo: numProcesso.current.value.trim(),
            status_rating: statusRatingProcesso,
            valor_total: valueProcesso.current.value.trim(),
            valor_com_honorarios: valorComHonorarios,
            valor_negociar: valorNegociar,
            rating: 4.5,
            hon_contratuais: honProcesso.current.value.trim(),
            porcentagem_negociar: porcentagemNegociar,
        })

    }, [statusRatingProcesso])

    return (
        <div className={`newCreditOverlay overlay ${newCreditOverlayActive ? 'active' : ''}`}>

            <div className="titleClose">
                <h2>NOVO CR??DITO <small>({sliderLeft + 1}/3)</small></h2>
                <AiFillCloseCircle onClick={() => setNewCreditOverlayActive(false)} className="closeNewCreditOverlay" />
            </div>

            <div className="newCreditContainer">
                <Image src={logo} width={520} height={530} alt="Novo cr??dito" />
                <div className="newCreditSlider" style={{ left: -(520 * sliderLeft) }}>
                    <div className="newCreditSingle">
                        <form className='firstForm'>
                            <input type="text" onChange={(e) => { handleFirstSlideOk(e) }} ref={nameProcesso} maxLength={25} placeholder='R??u/Devedor' />
                            <div className="num_processo_container">
                                <input type="text" onChange={(e) => { handleFirstSlideOk(e) }} maxLength={25} ref={numProcesso} onBlur={(e) => { formatNumProcess(e) }} placeholder='N?? do processo (Apenas d??gitos)' />
                                <p className={numProcessoLength === 20 ? 'success' : 'error'}>
                                    {numProcessoLength}/20
                                    <FaCheck className='success' />
                                    <AiOutlineClose className='error' />
                                </p>
                            </div>
                            <select onChange={(e) => { handleFirstSlideOk(e) }} ref={classeProcesso}>
                                <option defaultValue="">
                                    Classe judicial
                                </option>
                                <option defaultValue="Trabalhista">
                                    Trabalhista
                                </option>
                                <option defaultValue="Precat??rio">
                                    Precat??rio
                                </option>
                                <option defaultValue="C??vil">
                                    C??vil
                                </option>
                                <option defaultValue="Consumidor">
                                    Consumidor
                                </option>
                            </select>
                        </form>
                    </div>

                    <div className="newCreditSingle">
                        <form className='secondForm'>
                            <input type="text" ref={valueProcesso} onChange={(e) => { handleSecondSliderOk(e) }} placeholder='Valor: R$' onBlur={(e) => { formatValueProcess(e) }} />

                            <input type="number" ref={honProcesso} min={0} max={100} onChange={(e) => { handleSecondSliderOk(e) }} placeholder='Hon. contratuais(%):' />

                            <div className="porcentagem_negociar">
                                <p>Porcentagem a negociar</p>
                                <input type="range" id="porcentagem_negociar" ref={porcentagemProcesso} onChange={(e) => { setPorcentagemNegociar(e.target.value); handleSecondSliderOk(e) }} min={20} max={100} step={20} defaultValue={100} />
                                <span>{porcentagemNegociar}%</span>
                            </div>

                            <div className="valores">
                                <p className="com_honorarios">
                                    Valor com honor??rios: <span>{valorComHonorarios}</span>
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
                            Deseja que a Interjud avalie seu cr??dito gratuitamente?
                        </p>
                        <div className="vantagens">
                            <div className="vantagem_single">
                                <FaCheck /> <span>Est??mativa de des??gio aceit??vel</span>
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Receber a melhor oferta
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Agilidade na negocia????o
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Maior visibilidade
                            </div>
                            <div className="vantagem_single">
                                <FaCheck />Rapidez, transpar??ncia e seguran??a
                            </div>
                        </div>
                        <div className="aceitarRating">
                            <input type="button" className='recusar' id='recusar' defaultValue="RECUSAR" onClick={() => {setStatusRatingProcesso("N??O SOLICITADO");handleAddNewCredit()}} />
                            <input type="button" className='aceitar' id='aceitar' defaultValue="ACEITAR" onClick={() => setRatingInfoActive(true)} />
                        </div>

                        <AiFillInfoCircle className='setInfoRating' onClick={() => setRatingInfoActive(true)} />

                        <div className="ratingInfo">
                            <p>
                                A INTERJUD disponibiliza GRATUITAMENTE um servi??o de avalia????o do seu cr??dito, realizada por uma equipe de especialista. Ser??o atribu??das de uma a cinco ESTRELAS ao seu cr??dito, considerando a solidez do devedor, a fase processual em que se encontra, o tempo m??dio de conclus??o do processo, dentre outras caracter??sticas.
                            </p>

                            <input type="button" className='aceitar' id='aceitar' defaultValue="ACEITAR" onClick={() => {setStatusRatingProcesso("SOLICITADO");handleAddNewCredit()}} />

                            <small>
                                **Ao aderir ?? avalia????o do seu cr??dito, voc?? aceita a pontua????o atribu??da pelos especialistas e se compromete a negociar este cr??dito exclusivamente pela plataforma InterJud pelo prazo de 6 meses.
                            </small>

                            <AiFillCloseCircle className='setInfoRating' onClick={() => setRatingInfoActive(false)} />
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