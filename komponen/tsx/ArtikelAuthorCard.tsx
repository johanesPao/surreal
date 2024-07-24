"use client";

import Image from "next/image";

const ArtikelAuthorCard = () => {
  return (
    <div className='px-[5%] lg:px-[30%] pt-5'>
      <div className='w-full bg-slate-900 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md p-10 shadow-xl flex flex-col items-center gap-5'>
        <div className='ava-container flex items-center justify-items-start'>
          <Image
            src='https://f002.backblazeb2.com/file/surreal-assets/me.jpg'
            alt='Avatar of Johanes Indra Pradana Pao'
            width={120}
            height={120}
            className='rounded-xl shadow-lg mr-5'
          />
          <p className='text-stone-300 text-sm first-letter:text-[20px]'>
            {`Johanes Indra Pradana Pao, or Pao to his friends, is a Business Analyst Senior Supervisor with over a decade of experience turning data into insights. With a knack for creating financial models and machine learning magic, Pao has a history of solving complex problems—like bridging data gaps during a major ERP overhaul.`}
          </p>
        </div>
        <p className='text-stone-300 text-sm first-letter:text-[20px]'>
          {`When he’s not mastering the art of data, Pao is focused on family, especially his son, who always takes precedence over work. Pao enjoys sharing his Programming and Excel knowledge and thrives in the office, where he gets to dive into data science and technology. Surviving catholic school is just one of his many skills, but balancing work and family is his real talent.`}
        </p>
        <p className='text-stone-300 text-sm first-letter:text-[20px]'>
          {`His tech stack includes Python, TypeScript, Rust, Excel, TensorFlow, and a few programming languages he’s still trying to pronounce correctly.`}
        </p>
      </div>
    </div>
  );
};

export default ArtikelAuthorCard;
