import { type ComponentPropsWithoutRef } from "react";
import "./styles.css";

export function Heading(props: ComponentPropsWithoutRef<"h1">) {
  return <h1 className='heading' {...props} />;
}

export function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className='text-4xl font-bold px-[5%] lg:px-[20%] py-5' {...props} />
  );
}
