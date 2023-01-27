import React from 'react'
import AOS from 'aos';
import AOS from 'aos';
import 'aos/dist/aos.css';

const index = () => {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className="welcomeSingle firstSilder">
            <h2 data-aos='fade-up' data-aos-delay="700" data-aos-duration="1200">Bem-vindo à InterJud!</h2>
            <h3 data-aos='fade-up' data-aos-delay="1900" data-aos-duration="1200">Antes de mais nada, qual é o seu nome?</h3>
            <form data-aos='fade-up' data-aos-delay="2300" data-aos-duration="1200" className='firstForm'>
                <input type="text" placeholder='Nome...' onChange={(e) => { setUserFirstName(e.currentTarget.value.trim()) }} />
                <input type="text" placeholder='Sobrenome...' onChange={(e) => { setUserLastName(e.currentTarget.value.trim()) }} />
            </form>
        </div>
    )
}

export default index