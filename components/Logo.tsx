import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-white text-[40px] tracking-[1.65px] uppercase text-[#4d4d4d] no-underline leading-[60px]"
    >
      IEIC
    </Link>
  );
}
