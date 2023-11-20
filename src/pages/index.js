import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { getSession, useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import HomeBoard from '../pages/homeboard'
import TopBar from '../components/TopBar'


export default function Home() {
  

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, handleSignOut }){
  return(
    <div className='mx-0 px-0 py-0'>
    <HomeBoard name = {session.user.name} email = {session.user.email}/>
    <div className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
            <h5>{session.user.name}</h5>
            <h5>{session.user.email}</h5>
          </div>
          {/* <TopBar/> */}

          <div className="flex justify-center">
            <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500'>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</Link>
          </div>
      </div>
      
   
  </div>
  )
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}