import React from 'react'

const Accordion = ({ items }) => {
    let handleAccordionSingleActive = (e) =>{
        e.stopPropagation()
        let accSingle = e.currentTarget.closest(".accordionSingle")
        let sectionId = accSingle.closest("section").getAttribute("id")

        let accordions = document.querySelectorAll(`#${sectionId} .accordionSingle`)
        accordions.forEach((item)=>{
            item.removeAttribute("active")
        })
        if(!accSingle.getAttribute("active")){
            accSingle.setAttribute("active", "true")
        }else{
            accSingle.removeAttribute("active")
        }
    }
    return (
        <div className="accordion-wrapper">
            {
                items.map((item) => {
                    return (
                        <div key={item.id} className='accordionSingle'>
                            <div className='accordionHead'>
                                <span>
                                    {item.head}
                                </span>

                                <span onClick={(e) => { handleAccordionSingleActive(e) }}>
                                    -
                                </span>
                            </div>
                            <div className='accordionContent'>
                                <p>
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Accordion

