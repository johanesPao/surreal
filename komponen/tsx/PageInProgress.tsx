import "@/app/_css/globals.css";
import {
  IconBrandGmail,
  IconError404,
  IconHeading,
  IconHexagonLetterEFilled,
  IconOmega,
} from "@tabler/icons-react";
import Link from "next/link";

export default function PageInProgress() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-10 font-monaspaceRadon'>
      <IconError404 size={96} color='red' />
      <p>Huh? Sorry. I haven't implement the logic for this page yet.</p>
      <div className='flex gap-6'>
        <span>It is time to go </span>
        <Link
          href='/'
          className='flex group cursor-pointer skew hover:scale-125 transition-all duration-150 text-cobalt-blue-400'
        >
          <IconHeading />
          <IconOmega />
          <IconBrandGmail />
          <IconHexagonLetterEFilled />
        </Link>
        <span>sonny.</span>
      </div>
    </div>
  );
}
