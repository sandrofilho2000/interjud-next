import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import FilterSearch from '../../FilterSearch'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'
import Pagination from '../../../Pagination'


const MyCreditsMain = ({ credits }) => {
  const { sideMenuOpen, setNewCreditOverlayActive, searchContext, setSearchContext } = useAuth()

  const [currPage, setCurrPage] = useState(1)
  const [creditsPerPage, setCreditsPerPage] = useState(4)
  const [showingCredits, setShowingCredits] = useState([])
  const [showPagination, setShowPagination] = useState(true)
  const [paginationClass, setPaginationClass] = useState('')

  const lastCreditIndex = currPage * creditsPerPage
  const firstCreditIndex = lastCreditIndex - creditsPerPage

  let isEmpty = (obj) => {
    return Object.values(obj).every(x => x === null || x === '');
  }

  const handleCurrPage = (nextPage) => {
    setCurrPage(nextPage)
  }

  const handleNextPage = (next) => {
    setCurrPage(currPage + next)
  }

  useEffect(() => {
    let list = [...credits]

    if (!isEmpty(searchContext)) {
      list.filter((item) => {
        if (searchContext.name) {
          list = list.filter((item) => {
            return item.name.toLowerCase().includes(searchContext.name.toLowerCase())
          })
        }
        if (searchContext.classe) {
          list = list.filter((item) => {
            return item.class.toLowerCase().includes(searchContext.classe.toLowerCase())
          })
        }
        if (searchContext.min) {
          list = list.filter((item) => {
            return Number(item.value) >= Number(searchContext.min)
          })
        }
        if (searchContext.max) {
          list = list.filter((item) => {
            return Number(item.value) <= Number(searchContext.max)
          })
        }
        if (searchContext.rating) {
          list = list.filter((item) => {
            return Number(item.rating) >= Number(searchContext.rating)
          })
        }
      })
    }

    setShowingCredits(list)

    if (showingCredits.length < creditsPerPage) {
      setShowPagination(false)
    } else {
      setShowPagination(true)
    }

    if (currPage !== 0 || currPage !== Math.ceil((list.length / creditsPerPage))) {
      setPaginationClass("")
    }

    if (currPage === 1) {
      setPaginationClass("prevNotAllowed")
    }

    if (currPage === Math.ceil((list.length / creditsPerPage))) {
      setPaginationClass("nextNotAllowed")
    }
    if (list.length <= creditsPerPage) {
      setShowPagination(false)
    } else {
      setShowPagination(true)
    }

    handleCurrPage(currPage)

  }, [currPage, searchContext, credits])

  const listCredits = showingCredits.slice(firstCreditIndex, lastCreditIndex)

  return (
    <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
      <h1>
        MEUS CRÉDITOS
      </h1>

      {
        !isEmpty(searchContext) &&
        <FilterSearch/>
      }

      <div className='myCreditsMain'>
        <div className="myCreditsContainer">
          <table>
            <tr>
              <th onClick={() => setNewCreditOverlayActive(true)} className='th_add_credit'>
                <span>
                  +
                </span>
              </th>
              <th>
                Nome
              </th>
              <th>
                Valor
              </th>
              <th>
                Classe
              </th>
              <th>
                Fase processual
              </th>
              <th>
                Rating
              </th>
              <th>
                Recebimento em (aprox.)
              </th>
              <th>
                Nº processo
              </th>
              <th>
                Hon. contratuais
              </th>
              <th>
                Hon. sucubenciais
              </th>
              <th>
                Matéria
              </th>
            </tr>

            {listCredits.map((item, index) => {
              let value = item.value && !isNaN(item.value) ? Number(item.value) : ''
              value = value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })

              let halfStar = Number.isInteger(item.rating)
              let fullStars = !isNaN(item.rating) ? Math.floor(item.rating) : 0
              let stars = Array.from(Array(fullStars).keys())

              return (
                <tr key={item.id}>
                  <td className='td_image'>
                    <div className="img_container">
                      <Image width={50} height={50} src={item.img} alt={item.name} />
                    </div>
                  </td>
                  <td>
                    <span className="credit_name">
                      {item.name}
                    </span>
                  </td>
                  <td>
                    <span className="credit_value">
                      {value}
                    </span>
                  </td>
                  <td>
                    <span className="credit_class">
                      {item.class}
                    </span>
                  </td>
                  <td>
                    <span className="credit_fase">
                      Inicial
                    </span>
                  </td>
                  <td>
                    <span className="credit_rating">
                      {
                        stars.map((item, index) => {
                          return <FaStar key={index} />
                        })
                      }

                      {
                        !halfStar &&
                        <FaStarHalf />
                      }
                    </span>
                  </td>
                  <td>
                    <span className="credit_tempo_recebimento">
                      6 meses
                    </span>
                  </td>
                  <td>
                    <span className="credit_num_processo">
                      1045539-86.2021.8.26.0114
                    </span>
                  </td>
                  <td>
                    <span className="credit_hon_contratuais">
                      5%
                    </span>
                  </td>
                  <td>
                    <span className="credit_hon_sucubenciais">
                      10%
                    </span>
                  </td>
                  <td>
                    <span className="credit_materia">
                      Descomissionamento
                    </span>
                  </td>
                </tr>
              )

            })}
          </table>
        </div>
        {
          showPagination && (
            <Pagination handleCurrPage={handleCurrPage} currPage={currPage} pagClass={paginationClass} handleNextPage={handleNextPage} totalCredits={credits.length} creditsPerPage={creditsPerPage} />
          )
        }
      </div>

    </main>
  )
}

export default MyCreditsMain