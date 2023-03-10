import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillCaretDown, AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import FilterSearch from '../../FilterSearch'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'
import Pagination from '../../../Pagination'
import creditPlaceholder from '../../../../public/assets/images/credit_placeholder.png'
import { db } from '../../../../firebase'
import { deleteDoc, doc } from 'firebase/firestore'



const MyCreditsMain = () => {
  const { sideMenuOpen, setNewCreditOverlayActive, searchContext, setSearchContext, credits, setSystemPromptActive, setSystemNotificationActive, setCurrCredit, currCredit } = useAuth()

  console.log("loads")

  const [currPage, setCurrPage] = useState(1)
  const [creditsPerPage, setCreditsPerPage] = useState(4)
  const [showingCredits, setShowingCredits] = useState([])
  const [showPagination, setShowPagination] = useState(true)
  const [paginationClass, setPaginationClass] = useState('')
  const [ordenation, setOrdernation] = useState({ key: 'name', primitive: 'string', asc: true })

  const lastCreditIndex = currPage * creditsPerPage
  const firstCreditIndex = lastCreditIndex - creditsPerPage

  let isEmpty = (obj) => {
    return Object.values(obj).every(x => x === null || x === '');
  }

  let handleOrdenation = (list) => {
    let order = ordenation.asc

    let orderString = (list) => {
      list.sort((a, b) => {
        let fa = String(a[ordenation.key]).toLowerCase(),
          fb = String(b[ordenation.key]).toLowerCase();

        if (order) {
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
        } else {
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
        }

        return 0;
      });

      return list
    }

    let orderInteger = (list) => {
      if (order) {
        list.sort((a, b) => {
          return a[ordenation.key] - b[ordenation.key];
        });
      } else {
        list.sort((a, b) => b[ordenation.key] - a[ordenation.key]);
      }
      return list
    }

    if (ordenation.primitive === 'string') {
      list = orderString(list)
    } else if (ordenation.primitive === 'integer') {
      list = orderInteger(list)
    }

    return list
  }

  let handleDeleteCredit = async () =>{

    await deleteDoc(doc(db, "credits", currCredit.id));

    setSystemNotificationActive({ active: true, status: 'success', message: "Cr??dito exclu??do com sucesso!", link: "#" })
    setSystemPromptActive({ active: false, message: '', link: "#", callback: ()=>{} })
  }

  let handleDeleteCreditPrompt = (credit) =>{
    let credit_name = credit.name
    credit_name = credit_name.length > 9 ? `${credit_name.slice(0, 7)}...` : credit_name

    let message = `Deseja realmente excluir este cr??dito? (${credit_name})`
    setCurrCredit(credit)
    setSystemPromptActive({ active: true, message: message, link: "#", callback: handleDeleteCredit })
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
        if (!isEmpty(item)) {
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
              return Number(item.valor_negociar) >= Number(searchContext.min)
            })
          }
          if (searchContext.max) {
            list = list.filter((item) => {
              return Number(item.valor_negociar) <= Number(searchContext.max)
            })
          }
          if (searchContext.rating) {
            list = list.filter((item) => {
              return Number(item.rating) >= Number(searchContext.rating)
            })
          }
        }
      })
    }

    list = handleOrdenation(list)
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

  }, [currPage, searchContext, credits, ordenation])

  const listCredits = showingCredits.slice(firstCreditIndex, lastCreditIndex)

  return (
    <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
      <h1>
        MEUS CR??DITOS
      </h1>

      {
        !isEmpty(searchContext) &&
        <FilterSearch />
      }

      <div className='myCreditsMain'>
        <div className="myCreditsContainer">
          <table>
            <thead>
              <tr>
                <th onClick={() => setNewCreditOverlayActive(true)} className='th_add_credit'>
                  <span>
                    +
                  </span>
                </th>
                <th><span style={{paddingLeft: 0}}>Img</span></th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Nome
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'value', primitive: 'integer', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Valor
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'class', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Classe
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Fase processual
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'rating', primitive: 'integer', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Rating
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Recebimento em (aprox.)
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    N?? processo
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Hon. contratuais
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Hon. sucubenciais
                  </span>
                </th>
                <th onClick={() => { setOrdernation({ ...ordenation, key: 'name', primitive: 'string', asc: !ordenation.asc }) }}>
                  <AiFillCaretDown />
                  <span>
                    Mat??ria
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listCredits.map((item, index) => {
                let value = item.valor_negociar && !isNaN(item.valor_negociar) ? Number(item.valor_negociar) : ''
                value = value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })

                let halfStar = Number.isInteger(item.rating)
                let fullStars = !isNaN(item.rating) ? Math.floor(item.rating) : 0
                let stars = Array.from(Array(fullStars).keys())

                let img = item.img && item.img !== 'default.png' && item.img !== 'NULL' && item.img !== 'Avaliado' ? item.img : creditPlaceholder

                return (
                  <tr key={item.id}>

                    <td className='td_edit_delete_credit'>
                      <BsFillPencilFill className='edit_credit' />
                      <AiFillDelete onClick={()=>{handleDeleteCreditPrompt(item)}} className='delete_credit' />
                    </td>
                    <td className='td_image'>
                      <div className="img_container">
                        <Image width={50} height={50} src={img} alt={item.name} />
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
            </tbody>
          </table>
        </div>
        {
          showPagination && (
            <Pagination handleCurrPage={handleCurrPage} currPage={currPage} pagclassName={paginationClass} handleNextPage={handleNextPage} totalCredits={credits.length} creditsPerPage={creditsPerPage} />
          )
        }
      </div>

    </main>
  )
}

export default MyCreditsMain