import Link from 'next/link';

export const SectionSixth = () => {
  return (
    <div className="min-h-screen w-screen bg-text-default">
      <div className="mx-auto flex h-full w-[90%] flex-col items-center justify-end text-black">
        <div className="flex flex-1 flex-col justify-center gap-s12">
          <div className="text-center text-s20 font-light leading-[21.5px]">
            Click on my email below to contact me
          </div>
          <div className="leading[175.5px] font-trial text-[175px] uppercase text-primary-lightBlue">
            <Link href="/">umangabhattarai11@gmail.com</Link>
          </div>
        </div>
        <div className="flex w-full justify-between py-s16 text-s20 font-light leading-[24px]">
          <div className="flex flex-col">
            <span>Kathmandu </span>
            <span>Nepal</span>
          </div>
          <div className="flex flex-col">
            <span>available now </span>
            <span>for projects</span>
          </div>

          <div className="flex flex-col">
            <span>Portfolio </span>
            <span>&copy; 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
