import Head from 'next/head'
import { useEffect } from 'react'
import ComoFunciona from '../components/Home/ComoFunciona'
import Hero from '../components/Home/Hero'
import PortalCreditos from '../components/Home/PortalCreditos'
import Vantagens from '../components/Home/Vantagens'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <html lang="pt-br" />
        <title>InterJud | Plataforma de negociação de crédito judicial</title>
        <link rel="shortcut icon" type="image-x/png" href="https://www.interjud.com.br/icon.png" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width"/>
        <meta name="description" content="Compre ou venda créditos judiciais com a segurança da InterJud, Garanta agora seu direito e antecipe seus sonhos, ou Receba um valor justo pelo seu crédito judicial." />
        <meta name="author" content="Design por DamixCode/Desenvolvimento por Aurora Web Design" />
        <meta name="keywords" content="venda,creditos,judiciais,compra,creditos,judiciais,negocie,seu,credito,invista,em,creditos,judiciais" />
        <meta name="og:description" content="Compre ou venda créditos judiciais com a segurança da InterJud" />
        <meta name="og:url" content="https://www.interjud.com.br/" />
        <meta name="og:image" content="https://www.interjud.com.br/img/logo.webp" />
      </Head>
      <Navbar />
      <Hero />
      <PortalCreditos />
      <ComoFunciona />
      <Vantagens />
    </div>
  )
}
