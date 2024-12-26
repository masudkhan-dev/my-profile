import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="border-t-4 border-[#0a0a0a]">
        <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <Link href="/" className="font-bold text-xl text-[#A8D5BA]">
            Masudur Rahman
          </Link>

          <p className="text-sm text-[#f8f9fa]">
            &copy; Copyright 2024 - {new Date().getFullYear()} All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
