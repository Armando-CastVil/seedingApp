import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import URLForm from './components/URLForm'
import React  from 'react'
import GetListFromURL from './components/GetListFromURL'
import { dummymatches } from './components/dummymatches'
import BracketDisplay from './components/BracketDisplay'



const Home: NextPage = () => {
  
  
  return (
   
    <div className={styles.container}>
      <Head>
        <title>Seeding Demo</title>
        <meta name="description" content="It does stuff and things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      
      <BracketDisplay/>
      
     
      
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
