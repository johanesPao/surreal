type ExcelLineProps = {
  children: string;
};

const ExcelLine = ({ children }: ExcelLineProps) => {
  return (
    <span className='relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-[#339966] before:opacity-70 before:rounded-s -z-5'>
      <span className='relative text-slate-200 font-inconsolata text-sm italic'>
        {children}
      </span>
    </span>
  );
};

export default ExcelLine;
