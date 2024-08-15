import { type ComponentPropsWithoutRef } from "react";
import "./styles.css";

export function Heading(props: ComponentPropsWithoutRef<"h1">) {
  return <h1 className='text-[18px] px-[5%] lg:px-[20%] font-monaspaceKrypton' {...props} />;
}

export function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className='text-[16px] font-bold px-[5%] lg:px-[20%] py-5 font-monaspaceKrypton scroll-mt-[40px]'
      {...props}
    />
  );
}

export function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className='text-[14px] font-bold px-[5%] lg:px-[20%] py-5 font-monaspaceKrypton scroll-mt-[40px]'
      {...props}
    />
  );
}

export function Heading4(props: ComponentPropsWithoutRef<"h4">) {
  return (
    <h3
      className='text-2xl font-bold px-[5%] lg:px-[20%] py-5 font-monaspaceKrypton scroll-mt-[40px]'
      {...props}
    />
  );
}
