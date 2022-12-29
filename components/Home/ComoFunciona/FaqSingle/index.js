import React, { useState } from 'react'

const FaqSingle = () => {
    let handleFaqSingleActive = (e) => {
        document.querySelectorAll(".faqSingle").forEach((item)=>{
            item.classList.remove("active")
        })

        let faqSingle = e.currentTarget.closest(".faqSingle")

        if(faqSingle.classList.contains("active")){
            faqSingle.classList.remove("active")
        }else{
            faqSingle.classList.add("active")
        }
    }

    return (
        <div className='faqSingle'>
            <div className='faqHead'>
                <span>
                    1º CADASTRO
                </span>

                <span onClick={(e)=>{handleFaqSingleActive(e)}}>
                    -
                </span>
            </div>
            <div className='faqContent' onClick={(e)=>{handleFaqSingleActive(e)}}>
                <p>
                    Preencha seus dados pessoais e os dados do processo a ser negociado, com as informações mais fiéis possíveis. Se necessário, contate seu advogado. Você pode optar por aderir GRATUITAMENTE ao serviço de avaliação de risco
                </p>
            </div>
        </div>
    )
}

export default FaqSingle