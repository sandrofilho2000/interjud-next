import React from 'react'
import { FcPrevious, FcNext } from 'react-icons/fc'
const Pagination = ({ totalCredits, creditsPerPage, handleCurrPage, handleNextPage, pagClass, currPage }) => {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalCredits / creditsPerPage); i++){
        pages.push(i)
    }

    return (
        <div className={`pagination ${pagClass}`}>
            <span onClick={()=>{handleNextPage(-1)}} className="arrow arrowPrev">
                <FcPrevious />
            </span>
            {
                pages.map((item, index)=>{
                    return (
                    <span onClick={()=>{handleCurrPage(item)}} className={currPage === item ? 'active' : ''} key={item}>
                        {item}
                    </span>
                    )
                })
            }
            <span onClick={()=>{handleNextPage(1)}} className="arrow arrowNext">
                <FcNext />
            </span>
        </div>
    )
}

export default Pagination