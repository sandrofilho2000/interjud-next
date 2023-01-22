import Head from 'next/head'
import React, { useEffect, useLayoutEffect } from 'react'
import SideMenu from '../../components/Painel/SideMenu'
import { useAuth } from '../../context/AuthContext'
import MainTop from '../../components/Painel/MainTop'
import FilterOverlay from '../../components/Painel/FilterOverlay'
import MyCreditsMain from '../../components/Painel/MyCredits/MyCreditsMain'
import NewCreditOverlay from '../../components/Painel/MyCredits/NewCreditOverlay'
import WelcomeOverlay from '../../components/Painel/WelcomeOverlay'


const Painel = () => {
    const { searchMainActive, setSearchMainActive, searchContext, credits, user, userInfo } = useAuth()

        let isEmpty = (obj) => {
        if(!obj){
            return false
        }else{
            return Object.values(obj).every(x => x === null || x === '');
        }
    }

    useEffect(() => {
        if (isEmpty(credits[0])) {
            setSearchMainActive(false)
        }
    }, [])

    return (
        <div>
            <Head>
                <title>InterJud | Plataforma de negociação de crédito judicial</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" type="image-x/png" href="https://www.interjud.com.br/icon.png" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no" />
                <meta name="description" content="Compre ou venda créditos judiciais com a segurança da InterJud, Garanta agora seu direito e antecipe seus sonhos, ou Receba um valor justo pelo seu crédito judicial." />
                <meta name="author" content="Design por DamixCode/Desenvolvimento por Aurora Web Design" />
                <meta name="keywords" content="venda,creditos,judiciais,compra,creditos,judiciais,negocie,seu,credito,invista,em,creditos,judiciais" />
                <meta name="og:description" content="Compre ou venda créditos judiciais com a segurança da InterJud" />
                <meta name="og:url" content="https://www.interjud.com.br/" />
                <meta name="og:image" content="https://www.interjud.com.br/img/logo.webp" />
            </Head>
            {
                user && userInfo 
                    ? (
                        <>
                            <SideMenu />
                            <MainTop page="my_credits" />
                            <MyCreditsMain />
                            <FilterOverlay />
                            <NewCreditOverlay />
                        </>
                    ) :
                    (
                        <WelcomeOverlay />
                    )
            }

        </div>
    )
}

export default Painel