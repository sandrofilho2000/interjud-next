import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Favorites = () => {
    const { sideMenuOpen, user, userInfo, setUserInfo, setSystemNotificationActive, setLoading, loading } = useAuth()

    const notification = {}

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/users%2Fdefault_avatar.pbg.webp?alt=media&token=bd0cd8cd-b54b-4b3d-abc7-91ffa81751c5'

    const [ newPic, setNewPic ] = useState(userInfo.avatar ? userInfo.avatar : defaultPic)
    const [ updateUser, setUpdateUser ] = useState({...userInfo})
    
    const [ oab, setOab ] = useState()

    const firstName = useRef()
    const lastName = useRef()
    const phone = useRef()

    const cep = useRef()
    const uf = useRef()
    const localidade = useRef()
    const bairro = useRef()
    const logradouro = useRef()
    const pic = useRef()

    const ufOab = useRef()
    const numOab = useRef()

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

    let handleOab = () =>{
        let _num = numOab.current.value.replace(/\D/g, "");
        numOab.current.value = _num

        let _uf = ufOab.current.value == 'UF' ? ufOab.current.value = '' : ufOab.current.value 
    
        if(_uf){
            numOab.current.setAttribute("required", true)
        }
        else{
            numOab.current.removeAttribute("required")
        }
        if(_num){
            ufOab.current.setAttribute("required", true)
        }
        else{
            ufOab.current.removeAttribute("required")
        }

        if(_num.length === 6 && _uf){
            setOab(`${_uf}${_num}`)
        }else{
            setOab(false)
        }

    }

    let formatCEP = async (e) => {
        let _cep = cep.current.value.replaceAll("-", "")
        let formatedCEP = _cep

        if (_cep.length >= 5) {
            formatedCEP = _cep.slice(0, 5) + '-' + _cep.slice(5)
        }

        if (formatedCEP.replace(/\D/g, '').length === 8) {
            let address = await fetch(`https://viacep.com.br/ws/${formatedCEP.replace(/\D/g, '')}/json/`)
                .then((response) => { return response.json() })

            if (!address.erro) {
                logradouro.current.value = address.logradouro
                localidade.current.value = address.localidade
                bairro.current.value = address.bairro

                var select = uf.current
                select.querySelectorAll("option").forEach((item) => {
                    if (item.value === address.uf) {
                        item.selected = true
                    }
                })
            } else {
                notification.message = "CEP não localizado!"
                notification.status = 'warning'
                notification.active = true
                setSystemNotificationActive(notification)

            }

        }

        cep.current.value = formatedCEP
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
        let file = pic.current.files[0]
        let url = window.URL.createObjectURL(file);        
        setNewPic(url)
    }

    let removePic = () => {
        setNewPic(defaultPic)
        setUpdateUser({...updateUser, avatar: defaultPic})
        pic.current.setAttribute("type", "text")
        pic.current.setAttribute("type", "file")
    }

    let handleUpdateProfile = async (e) =>{
        e.preventDefault()

        let updatedUser = {
            first_name: firstName.current.value.trim(),
            avatar: newPic,
            last_name: lastName.current.value.trim(),
            full_name: `${firstName.current.value.trim()} ${lastName.current.value.trim()}`,
            phone: formatPhone(phone.current.value.trim()),
            address: {
                bairro: bairro.current.value.trim(),
                cep: cep.current.value.trim(),
                localidade: localidade.current.value.trim(),
                logradouro: logradouro.current.value.trim(),
                uf: uf.current.value.trim()
            },
            oab: oab ? oab : false
        }
        
        let file = pic.current.files[0]

        setLoading(true)
        
        if(file){
            let fileName = file ? `${file.name}${generateRandom(10240 * 1243)}` : ''
    
            const storageRef = ref(storage, `users/${fileName}`);

            await uploadBytes(storageRef, file).then((snapshot) => {
                pic.current.setAttribute("type", "text")
                pic.current.setAttribute("type", "file")
            });
    
            await getDownloadURL(storageRef).then((url) => {
                updatedUser.avatar = url
            })
        }else{
        }
        
        const userReference = doc(db, "users", user.uid)
        await updateDoc(userReference, updatedUser);
        
        setLoading(false)        
        setUserInfo({...updatedUser})
    }

    useEffect(()=>{
        setNewPic(userInfo.avatar)
    }, [userInfo])

    useEffect(()=>{
        var select = uf.current
        select.querySelectorAll("option").forEach((item) => {
            if (item.value === userInfo.address.uf) {
                item.selected = true
            }
        })
    }, [])


    return (
        <main className={`main profileMain ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                PERFIL
            </h1>

            <form onSubmit={handleUpdateProfile}>
                <div className="profilePic">
                    <Image src={newPic} width={180} height={180} alt='' />
                    <div className="changePic">
                        <label className='remove'>
                            <span onClick={removePic}>
                                REMOVER
                            </span>
                        </label>
                        <label className='change'>
                            <input ref={pic} onChange={handleNewPic} type="file" name="file" id="file" />
                            <span>
                                TROCAR
                            </span>
                        </label>
                    </div>
                </div>
                <div className="fullName">
                    <input type="text" name="firstName" ref={firstName} id="firstName" defaultValue={userInfo.first_name} placeholder='Nome...*' required={true}/>
                    <input type="text" name="lastName" ref={lastName} id="lastName" placeholder='Sobrenome...*' defaultValue={userInfo.last_name} required={true}/>
                </div>

                <input type="text" name='phone' ref={phone} placeholder='Tel...*' defaultValue={userInfo.phone} maxLength={15} onChange={(e)=>{maskPhone(e)}} required={true}/>
                <div className="address">
                    <div className="middle">
                        <input type="text" ref={cep} name="cep" id="cep" placeholder='CEP...*' maxLength={9} defaultValue={userInfo.address.cep} required={true} onChange={formatCEP}/>
                        <input ref={logradouro} type="text" name="logradouro" id="logradouro" placeholder='Logradouro...*' defaultValue={userInfo.address.logradouro} required={true}/>
                        <select ref={uf} id="estado" name="estado" required={true}>
                            <option disabled selected>UF</option>
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
                        <input ref={localidade} type="text" name="localidade" id="localidade" placeholder='Cidade...*' defaultValue={userInfo.address.localidade} required={true} />
                        <input ref={bairro} type="text" name="bairro" id="bairro" placeholder='Bairro...*' defaultValue={userInfo.address.bairro} required={true} />
                        <input type="text" name="numero" id="numero" placeholder='Nº...' defaultValue={userInfo.address.numero}/>
                    </div>
                </div>

                <div className="oabContainer">
                    <select ref={ufOab} id="estado" name="estado" onChange={handleOab}>
                        <option selected>UF</option>
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
                    <input ref={numOab} maxLength={6} type="text" id="oab" placeholder='Nº OAB...' onChange={handleOab}/>
                </div>

                <input type="submit" value='SALVAR'/>
            </form>

        </main>
    )

}

export default Favorites