import React, { useEffect, useRef, useState } from 'react'
import Credit from '../../../Credit'

const CreditsSlider = ({credits, text}) => {
    let slider = useRef()
    let [sliderNav, setSliderNav] = useState(0)
    let [creditsToShow, setCreditsToShow] = useState()

    let handleSliderCreditsToShow = () =>{
        let length = 15
        let windowWidth = window.innerWidth - 60
        let creditsShown = Math.floor(windowWidth / 270)
        let _creditsToShow = length - creditsShown
        setCreditsToShow(_creditsToShow)
    }


    let handleSliderNav = (num) => {
        if (sliderNav <= 0 && num == -1) {
            setSliderNav(0)
        } else if (sliderNav == creditsToShow && num == 1) {
            setSliderNav(creditsToShow)
        } else {
            setSliderNav(sliderNav += num)
        }

        handleSliderCreditsToShow()
    }
    
    useEffect(()=>{
        handleSliderCreditsToShow()
    }, [credits])

    return (
        <div ref={slider} className='creditsSlider'>

            <div className='creditsSliderController'>
                {
                    sliderNav != 0 &&
                    <div onClick={() => { handleSliderNav(-1) }} className='sliderController sliderControllerPrev'>
                    </div>
                }

                {
                    sliderNav != creditsToShow &&

                    <div onClick={() => { handleSliderNav(1) }} className='sliderController sliderControllerNext'>

                    </div>
                }

            </div>

            <h2>
                {text}
            </h2>
            <div style={{ marginLeft: `-${272 * sliderNav}px` }} className='creditsSliderSingle'>
                {
                    credits.map((item) => {
                        return (
                            <Credit credit={item} />
                        )
                    })
                }
                {
                    credits.map((item) => {
                        return (
                            <Credit credit={item} />
                        )
                    })
                }
                {
                    credits.map((item) => {
                        return (
                            <Credit credit={item} />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CreditsSlider