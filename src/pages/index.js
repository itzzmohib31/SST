import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import Sidebar from './Components/Sidebar'
import {signIn} from "next-auth/react";
import { useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
export default function Home() {

  const {status,data}=useSession();

  useEffect(()=>{
     if(status=='unauthenticated')
     {
       Router.replace("/auth/signin");
     }
  },[status])


  return (
    <>
      <Head>
        <title>Sir Saqib Tuitions</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div>
        <Sidebar></Sidebar>
      </div>
      </main>
    </>
  )
}

