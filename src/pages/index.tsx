/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Header = dynamic(
  () => import('@/components/Header'),
  { ssr:false }
)


export default function Home() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [cnt, setCnt] = useState(0);
  const getImage = () => {
    fetch("https://poticket.interpark.com/CommonAPI/Captcha/")
      .then(res => res.blob())
      .then(res => {
        let reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          let base64data = reader.result;
          // console.log(base64data);
          setImage(base64data);
        }
      });
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    }
    if (target.input.value.length !== 6) {
      alert('다시 입력하세요');
      return;
    }
    const res = await fetch(`/api/save?img=${image}&ans=${target.input.value.toUpperCase()}`)
    const data: {ok: boolean} = await res.json();
    
    getImage();
    setCnt(prev => prev + 1);
    target.input.value = "";
    // print(e.)
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      <Header />
      <main className='container mx-auto h-full'>
        <div className='flex flex-col justify-center items-center p-10 h-full'>
          <div className='mb-6 text-white'>
            <b>{cnt} / 10</b>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <img src={image as string} alt="captcha"/>
            </div>
            <div className='mb-6'>
              <input type="text" name='input' spellCheck="false" autoComplete="off" style={{'textTransform': "uppercase"}} id="answer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XAAABZ" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </main>
    </>
  )
}
