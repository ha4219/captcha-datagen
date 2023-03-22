import Head from 'next/head'
import dynamic from 'next/dynamic';


const Header = dynamic(
  () => import('@/components/Header'),
  { ssr:false }
)

function Result(props: {data: string}) {
  
  return (
    <>
      <Header />
      <main className='container mx-auto'>
        <div className='bg-white rounded-lg'>
          <div className='p-2 max-h-screen overflow-y-scroll'>
            {props.data}
          </div>
        </div>
      </main>
    </>
  );
}

import fs from "fs";

export async function getServerSideProps() {
  const data = fs.readFileSync("data.txt");

  return {
    props: {data: data.toString()}, // will be passed to the page component as props
  }
}

export default Result;