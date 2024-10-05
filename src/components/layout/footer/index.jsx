import React from "react";
import { SiZcool } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-red-300 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <SiZcool className="text-[48px] rounded-full bg-red-500 p-3"/>
          <span className="ml-3 font-bold text-xl">Al-Win</span>
        </a>
        <p className="text-sm text-black font-bold sm:ml-4 sm:pl-4 sm:border-red-500 sm:border-l-2 sm:py-2 sm:mt-0 mt-4">
          © 2024 Al-Win -
          <a
            href="https://instagram.com/alv1n.17"
            className="text-black ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @alv1n.17
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
