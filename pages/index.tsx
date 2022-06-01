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

const Home: NextPage = () => {
  var entryList: Competitor[]=[];
  const [entries, setEntries] = useState(entryList);
  const [isLoading, setLoading] = useState(false);
  
  
  //API call
  const handleSubmit = async () => {
    setEntries(await getCompetitorInfo())


    if(entries.length==0)
    {
      return <div className="App">Loading...</div>;
    }
  
    
    
  }





 
  return (
   
    <div className={styles.container}>
      <Head>
        <title>Seeding Demo</title>
        <meta name="description" content="It does stuff and things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      {<button id="button" type="submit" onClick={handleSubmit}>Submit event</button>}
      <div>
        <ol>
        
        {entries.map((p:any)=>(
            <li key={p.ID}>Player ID:{p.ID} Player Tag: {p.tag} Player Rating: {p.rating}</li>
        ))}
        </ol>
    </div>
        
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
