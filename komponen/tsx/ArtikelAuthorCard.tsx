"use client";

import Image from "next/image";

const ArtikelAuthorCard = () => {
  return (
    <div className='px-[5%] lg:px-[30%] mt-20 ml-16 pt-5 font-monaspaceArgon'>
      <div className='relative w-full bg-slate-900 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md p-10 shadow-xl flex flex-col items-start gap-5 text-stone-300 text-[14px] first-letter:text-[20px]'>
        <Image
          src='https://f002.backblazeb2.com/file/surreal-assets/me.jpg'
          alt='Avatar of Johanes Indra Pradana Pao'
          width={120}
          height={120}
          className='absolute -top-[85px] -left-[60px] -rotate-[18deg] rounded-xl shadow-lg mt-1 mr-5 mb-1 -z-10'
        />
        <p className='backdrop-invert-0 mix-blend-difference'>
          {`Johanes Indra Pradana Pao is a Business Analyst Senior Supervisor with over a decade of experience turning data into insights. With a knack for creating financial models and machine learning magic, Pao has a history of solving complex problems—like bridging data gaps during a major ERP overhaul.`}
        </p>
        <p className='backdrop-invert-0 mix-blend-difference'>
          {`When he’s not mastering the art of data, Pao is focused on family, especially his son, who always takes precedence over work. Pao enjoys sharing his Programming and Excel knowledge and thrives in the office, where he gets to dive into data science and technology. Surviving catholic school is just one of his many skills, but balancing work and family is his real talent.`}
        </p>
        <p className='backdrop-invert-0 mix-blend-difference'>
          {`His tech stack includes Python, TypeScript, Rust, Excel, TensorFlow, and a few programming languages he’s still trying to pronounce correctly.`}
        </p>
        <p className='backdrop-invert-0 mix-blend-difference'>
          {`If you find his writings mind-blowing, sensational, and earth-shattering—especially if they save you from a spreadsheet meltdown—feel free to donate here. He’s in the middle of a ‘loan’ from his wife, and he promises this will help him pay it back!`}
        </p>
      </div>
    </div>
  );
};

export default ArtikelAuthorCard;
