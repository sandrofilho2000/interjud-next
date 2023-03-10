import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiFillInfoCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { Button } from '../../../components/Button'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useAuth } from '../../../context/AuthContext'
import logo from '../../../public/assets/images/logo_j.webp'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link'
import Router from 'next/router';


const WelcomeOverlay = () => {

    const { systemNotificationActive, setSystemNotificationActive, user, googleSignInInfo } = useAuth()

    const [newUserInfo, setNewUserInfo] = useState({})
    const [userAddress, setUserAddress] = useState({})
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userProfile, setUserProfile] = useState('')
    const [emailVerified, setEmailVerified] = useState(false)

    const ufSelect = useRef()
    const cidadeInput = useRef()
    const bairroInput = useRef()
    const logradouroInput = useRef()

    const [userCPF, setUserCPF] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userCEP, setUserCEP] = useState('')
    const [sliderLeft, setSliderLeft] = useState(0)

    const notification = {}

    let isEmpty = (obj) => {
        if (!obj) {
            return false
        } else {
            return Object.values(obj).every(x => x === null || x === '');
        }
    }

    let validateAddress = () => {
        notification.message = ''
        notification.active = true
        notification.status = 'error'

        if (!userCEP) {
            notification.message = "Por favor, insira seu CEP!"
        }

        if (!userAddress.logradouro) {
            notification.message = "Por favor, insira um logradouro!"
        }

        if (!userAddress.uf) {
            notification.message = "Por favor, selecione seu estado!"
        }

        if (!userAddress.localidade) {
            notification.message = "Por favor, insira sua cidade!"
        }

        if (!userAddress.bairro) {
            notification.message = "Por favor, insira seu bairro!"
        }

        console.log(userAddress)

        if (notification.message) {
            setSystemNotificationActive(notification)
            return false
        }

        else {
            return true
        }
    }

    let validateName = (num) => {
        if (userFirstName && userLastName) {
            setSliderLeft(sliderLeft + num)
            setNewUserInfo({ ...newUserInfo, first_name: userFirstName, last_name: userLastName })
        } else {
            notification.message = "Revise todos os campos antes de prosseguir"
            notification.status = 'error'
            notification.active = true
            setSystemNotificationActive(notification)
        }
    }

    let validateProfile = (num) => {
        if (userProfile) {
            setSliderLeft(sliderLeft + num)
            setNewUserInfo({ ...newUserInfo, profile: userProfile })
        } else {
            notification.message = "Selecione uma op????o"
            notification.status = 'error'
            notification.active = true
            setSystemNotificationActive(notification)
        }
    }

    let validateCPF = (num) => {
        let cpf = userCPF.replace(/\D/g, '');
        notification.status = 'error'
        notification.active = true
        notification.message = "CPF inv??lido!"

        if (!cpf) {
            notification.message = "Por favor, insira seu CPF"
            setSystemNotificationActive(notification)
            return false
        }

        if (cpf.length !== 11) {
            setSystemNotificationActive(notification)
            return false
        }

        let soma = 0
        soma += cpf[0] * 10;
        soma += cpf[1] * 9;
        soma += cpf[2] * 8;
        soma += cpf[3] * 7;
        soma += cpf[4] * 6;
        soma += cpf[5] * 5;
        soma += cpf[6] * 4;
        soma += cpf[7] * 3;
        soma += cpf[8] * 2;
        soma = (soma * 10) % 11;

        if (soma == 10 || soma == 11) {
            soma = 0
        }

        if (soma != cpf[9]) {
            setSystemNotificationActive(notification)
            return false
        }

        soma = 0
        soma += cpf[0] * 11;
        soma += cpf[1] * 10;
        soma += cpf[2] * 9;
        soma += cpf[3] * 8;
        soma += cpf[4] * 7;
        soma += cpf[5] * 6;
        soma += cpf[6] * 5;
        soma += cpf[7] * 4;
        soma += cpf[8] * 3;
        soma += cpf[9] * 2;
        soma = (soma * 10) % 11

        if (soma == 10 || soma == 11) {
            soma = 0
        }

        if (soma != cpf[10]) {
            setSystemNotificationActive(notification)
            return false
        }

        setSliderLeft(sliderLeft + num)
        setNewUserInfo({ ...newUserInfo, cpf: userCPF })
        return true;

    }

    let formatCPF = (e) => {
        let cpf = e.target.value ? e.target.value : ''
        cpf = e.target.value.replaceAll(".", "").replaceAll("-", "")
        let formatedCPF = cpf

        if (cpf.length >= 3) {
            formatedCPF = cpf.slice(0, 3) + '.' + cpf.slice(3)
        }

        if (formatedCPF.length >= 6) {
            formatedCPF = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6)
        }

        if (cpf.length >= 9) {
            formatedCPF = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9)
        }

        if (cpf.indexOf('.') !== -1) {
            formatedCPF = cpf.replaceAll('.', '')
            formatedCPF = cpf.replaceAll('-', '')
        }

        e.target.value = formatedCPF
        setUserCPF(formatedCPF)
    }

    let formatPhone = (v) => {
        var r = v.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
            setNewUserInfo({ ...newUserInfo, phone: r })
        } else if (r.length > 5) {
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            r = r.replace(/^(\d*)/, "($1");
        }
        return r;
    }

    let formatCEP = async (e) => {
        let cep = e.target.value.replaceAll("-", "")
        let formatedCEP = cep

        if (cep.length >= 5) {
            formatedCEP = cep.slice(0, 5) + '-' + cep.slice(5)
        }

        if (formatedCEP.replace(/\D/g, '').length === 8) {
            let address = await fetch(`https://viacep.com.br/ws/${formatedCEP.replace(/\D/g, '')}/json/`)
                .then((response) => { return response.json() })

            if (!address.erro) {
                logradouroInput.current.value = address.logradouro
                cidadeInput.current.value = address.localidade
                bairroInput.current.value = address.bairro

                var select = ufSelect.current
                select.querySelectorAll("option").forEach((item) => {
                    if (item.value === address.uf) {
                        item.selected = true
                    }
                })
                setUserAddress({ ...address })
            } else {
                notification.message = "CEP n??o localizado!"
                notification.status = 'warning'
                notification.active = true
                setSystemNotificationActive(notification)
            }

        }

        e.target.value = formatedCEP
        setUserCEP(formatedCEP)
    }

    let maskPhone = (o, f) => {
        setTimeout(function () {
            var v = formatPhone(o.target.value);
            if (v != o.target.value) {
                o.target.value = v;
            }
        }, 1);
    }

    let handleSliderLeft = (num) => {
        const maxLeft = sliderLeft === 4 && num === 1
        const minLeft = sliderLeft === 0 && num === -1

        if (!maxLeft && !minLeft) {

            if (num === 1) {

                if (sliderLeft === 0) {
                    validateName(num)
                }

                if (sliderLeft === 1) {
                    validateProfile(num)
                }

                if (sliderLeft === 2) {
                    validateCPF(num)
                }
            } else {
                setSliderLeft(sliderLeft + num)
            }
        }

    }

    let validateSignUp = (e, skipSignUp = false) => {
        notification.active = true

        let addressOk = validateAddress()

        if(newUserInfo.first_name && newUserInfo.last_name && newUserInfo.profile && newUserInfo.cpf && addressOk && newUserInfo.phone.length >= 10){
            let addUserToDataBase = async (obj) => {
                await setDoc(doc(db, "users", user.uid), obj);
            }
            addUserToDataBase(newUserInfo)
    
            notification.status = "success"
            notification.message = "Perfil criado com sucesso"
            setSystemNotificationActive(notification)
    
            
            setTimeout(()=>{
                Router.reload(window.location.pathname)
            }, 1000)
        }else{
            notification.status = "error"
            if(addressOk){
                notification.message = "Erro ao criar perfil! Por favor revise todos os campos."
            }
            setSystemNotificationActive(notification)
        }
    }

    useEffect(() => {
        setNewUserInfo({ ...newUserInfo, address: { ...userAddress }, emailVerified: emailVerified })
    }, [userAddress, userCEP])

    
    useEffect(()=>{
        console.log(googleSignInInfo)
        if(!isEmpty(googleSignInInfo)){
            let name = googleSignInInfo.user.displayName.split(" ")
            let first_name = name[0]
            let last_name = name[1] 

            first_name = first_name[0].toUpperCase() + first_name.substring(1)
            last_name = last_name[0].toUpperCase() + last_name.substring(1)

            setUserFirstName(first_name)
            setUserLastName(last_name)
            setEmailVerified(true)
            console.log(googleSignInInfo.user.providerData[0].photoURL)
            setNewUserInfo({...newUserInfo, avatar: googleSignInInfo.user.providerData[0].photoURL})
        }
    }, [])

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className={`welcomeOverlay overlay active`}>

            <div className="welcomeContainer">
                <Image src={logo} width={520} height={530} alt="Novo cr??dito" />

                <div className="welcomeSlider" style={{ left: -(520 * sliderLeft) }}>
                    <div className="welcomeSingle firstSilder">
                        <h2 data-aos='fade-up' data-aos-delay="700" data-aos-duration="1200">Bem-vindo ?? InterJud!</h2>
                        <h3 data-aos='fade-up' data-aos-delay="1900" data-aos-duration="1200">Antes de mais nada, qual ?? o seu nome?</h3>
                        <form data-aos='fade-up' data-aos-delay="2300" data-aos-duration="1200" className='firstForm'>
                            <input type="text" placeholder='Nome...' onChange={(e) => { setUserFirstName(e.currentTarget.value.trim()) }} defaultValue={userFirstName} />
                            <input type="text" placeholder='Sobrenome...' onChange={(e) => { setUserLastName(e.currentTarget.value.trim()) }}  defaultValue={userLastName} />
                        </form>
                    </div>

                    <div className="welcomeSingle secondSlider">
                        <h3>Ol??, {userFirstName}!</h3>
                        <h4>
                            Nos ajude a entender o que voc?? busca na InterJud para melhorarmos sua experi??ncia na nossa plataforma
                        </h4>
                        <form>
                            <label>
                                <input type="radio" name="perfil" id="vender" defaultValue="vendedor" onClick={(e) => { setUserProfile(e.target.value) }} />
                                <div className='label'>
                                    QUERO VENDER
                                </div>
                            </label>
                            <label>
                                <input type="radio" name="perfil" id="comprar" defaultValue="comprador" onClick={(e) => { setUserProfile(e.target.value) }} />
                                <div className='label'>
                                    QUERO COMPRAR
                                </div>
                            </label>
                            <label>
                                <input type="radio" name="perfil" id="indefinido" defaultValue="indefinido" onClick={(e) => { setUserProfile(e.target.value) }} />
                                <div className='label'>
                                    APENAS VISITANDO
                                </div>
                            </label>
                        </form>
                    </div>

                    <div className="welcomeSingle thirdSlider">
                        <h3>Estamos quase l??, {userFirstName}!</h3>
                        <h4>
                            Para continuarmos o seu cadastro, iremos precisar do seu CPF
                        </h4>
                        <form action="">
                            <input type="text" name="cpf" id="cpf" placeholder='Seu CPF...' onKeyUp={(e) => { formatCPF(e) }} maxLength={14} />
                        </form>
                    </div>

                    <div className="welcomeSingle forthSlider">
                        <h3>
                            Para finalizarmos, basta preencher os campos abaixo e pronto!
                        </h3>
                        <form>
                            <input type="text" name='celphone' placeholder='Tel...' onChange={maskPhone} />
                            <div className="address">
                                <div className="top">
                                    <input type="text" name="cep" id="cep" placeholder='CEP...' maxLength={9} onChange={(e) => { formatCEP(e) }} />
                                    <input type="text" ref={logradouroInput} name="logradouro" id="logradouro" placeholder='Logradouro...' onChange={(e) => { setUserAddress({ ...userAddress, logradouro: e.currentTarget.value }) }} />
                                    <select id="estado" ref={ufSelect} name="estado" onChange={(e) => { setUserAddress({ ...userAddress, uf: e.currentTarget.value }) }}>
                                        <option disabled selected>Estado</option>
                                        <option defaultValue="AC">AC</option>
                                        <option defaultValue="AL">AL</option>
                                        <option defaultValue="AP">AP</option>
                                        <option defaultValue="AM">AM</option>
                                        <option defaultValue="BA">BA</option>
                                        <option defaultValue="CE">CE</option>
                                        <option defaultValue="DF">DF</option>
                                        <option defaultValue="ES">ES</option>
                                        <option defaultValue="GO">GO</option>
                                        <option defaultValue="MA">MA</option>
                                        <option defaultValue="MT">MT</option>
                                        <option defaultValue="MS">MS</option>
                                        <option defaultValue="MG">MG</option>
                                        <option defaultValue="PA">PA</option>
                                        <option defaultValue="PB">PB</option>
                                        <option defaultValue="PR">PR</option>
                                        <option defaultValue="PE">PE</option>
                                        <option defaultValue="PI">PI</option>
                                        <option defaultValue="RJ">RJ</option>
                                        <option defaultValue="RN">RN</option>
                                        <option defaultValue="RS">RS</option>
                                        <option defaultValue="RO">RO</option>
                                        <option defaultValue="RR">RR</option>
                                        <option defaultValue="SC">SC</option>
                                        <option defaultValue="SP">SP</option>
                                        <option defaultValue="SE">SE</option>
                                        <option defaultValue="TO">TO</option>
                                        <option defaultValue="EX">EX</option>
                                    </select>
                                </div>
                                <div className="bottom">
                                    <input type="text" ref={cidadeInput} name="cidade" id="cidade" onChange={(e) => { setUserAddress({ ...userAddress, localidade: e.currentTarget.value }) }} placeholder='Cidade...' />
                                    <input type="text" ref={bairroInput} name="bairro" id="bairro" onChange={(e) => { setUserAddress({ ...userAddress, bairro: e.currentTarget.value }) }} placeholder='Bairro...' />
                                    <input type="text" name="numero" id="numero" onChange={(e) => { setUserAddress({ ...userAddress, logradouro: e.currentTarget.value }) }} placeholder='N??...' />
                                </div>
                            </div>

                        </form>
                        <button onClick={(e) => { validateSignUp(e) }}>
                            FINALIZAR
                        </button>
                    </div>

                </div>

                <div className="welcomeArrows">
                    {
                        sliderLeft !== 0 && (
                            <div className="arrowPrev arrow" onClick={() => { handleSliderLeft(-1) }}>
                                <FcPrevious />
                            </div>
                        )
                    }

                    {
                        sliderLeft !== 3 && (
                            <div className="arrowNext arrow" onClick={() => { handleSliderLeft(1) }}>
                                <FcNext />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="links">
                <Link href="../login/" className='active'> <AiOutlineArrowLeft /> <span>VOLTAR PARA O SITE</span> </Link>
                <Link href={window.location.pathname} className={sliderLeft === 3 ? 'active' : ''} onClick={(e) => { validateSignUp(e, true) }}>  <span>FINALIZAR DEPOIS</span> <AiOutlineArrowRight /></Link>
            </div>
        </div>
    )
}

export default WelcomeOverlay