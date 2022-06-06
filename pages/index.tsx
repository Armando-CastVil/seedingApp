import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import URLForm from './components/URLForm'
import React  from 'react'
import Competitor from './modules/Competitor'
import getCompetitorInfo from './modules/getCompetitorInfo'
import { useState } from 'react'
import usePromise from "react-promise";
import DisplayList from './components/displayList'
const Home: NextPage = () => {
  


 
  return (
   
    <div className={styles.container}>
      <Head>
        <title>Seeding Demo</title>
        <meta name="description" content="It does stuff and things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <URLForm/>
      
        
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
