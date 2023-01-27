import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebase';

const Favorites = () => {
    const { sideMenuOpen, userInfo, setUserInfo } = useAuth()

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/users%2Fdefault_avatar.pbg.webp?alt=media&token=bd0cd8cd-b54b-4b3d-abc7-91ffa81751c5'

    const [newPic, setNewPic] = useState(userInfo.avatar ? userInfo.avatar : defaultPic)

    const picInput = useRef()

    let formatPhone = (v) => {
        var r = v.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 5) {
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            r = r.replace(/^(\d*)/, "($1");
        }

        return r;
    }
    storage

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

                var select = ufInput.current
                select.querySelectorAll("option").forEach((item) => {
                    if (item.value === address.uf) {
                        item.selected = true
                    }
                })
                setUserAddress(address)
            } else {
                notification.message = "CEP não localizado!"
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

    let generateRandom = (maxLimit = 100) => {
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand)
        return rand;
    }

    let handleNewPic = async (e) => {
        let file = e.target.files[0]
        let fileName = `${file.name}${generateRandom(10240 * 1243)}`

        const storageRef = ref(storage, `users/${fileName}`);

        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        await getDownloadURL(storageRef).then((url) => {
            setNewPic(url)
            setUserInfo({...userInfo, avatar: url})
        })
    }

    let removePic = () => {
        setNewPic(defaultPic)
        picInput.current.setAttribute("type", "text")
        picInput.current.setAttribute("type", "file")
    }

    console.log(userInfo)

    return (
        <main className={`main profileMain ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                PERFIL
            </h1>

            <form>
                <div className="profilePic">
                    <Image src={newPic} width={180} height={180} alt='' />
                    <div className="changePic">
                        <label className='remove'>
                            <span onClick={removePic}>
                                REMOVER
                            </span>
                        </label>
                        <label className='change'>
                            <input ref={picInput} onChange={handleNewPic} type="file" name="file" id="file" />
                            <span>
                                TROCAR
                            </span>
                        </label>
                    </div>
                </div>
                <div className="fullName">
                    <input type="text" name="firstName" id="firstName" defaultValue={userInfo.first_name} placeholder='Nome...*' />
                    <input type="text" name="lastName" id="lastName" placeholder='Sobrenome...*' defaultValue={userInfo.last_name} />
                </div>

                <input type="text" name='celphone' placeholder='Tel...*' onChange={maskPhone} defaultValue={userInfo.celPhone}/>
                <div className="address">
                    <div className="middle">
                        <input type="text" name="cep" id="cep" placeholder='CEP...*' maxLength={9} defaultValue={userInfo.address.cep} />
                        <input type="text" name="logradouro" id="logradouro" placeholder='Logradouro...*' defaultValue={userInfo.address.logradouro} />
                        <select id="estado" name="estado" >
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
                        <input type="text" name="cidade" id="cidade" placeholder='Cidade...*' defaultValue={userInfo.address.localidade} />
                        <input type="text" name="bairro" id="bairro" placeholder='Bairro...*' defaultValue={userInfo.address.bairro} />
                        <input type="text" name="numero" id="numero" placeholder='Nº...' defaultValue={userInfo.address.numero}/>
                    </div>
                </div>

                <div className="oabContainer">
                    <input type="text" id="oab" placeholder='OAB...' />
                    <select id="estado" name="estado" >
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

                <button>
                    ENVIAR
                </button>
            </form>

        </main>
    )

}

export default Favorites