"use client"
import React from "react";
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { usePathname } from "next/navigation";
function Footer() {
  const pathname = usePathname();
  const isRegister = pathname && pathname.startsWith("/register"); 
  const isLogin = pathname && pathname.startsWith("/login");
  return (
    <footer className={`${isLogin || isRegister ? "hidden" : "block"} bg-white dark:bg-black border-t dark:border-gray-800`}>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div>
            <div className="mb-6 md:mb-0 flex gap-2 h-8 items-center">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <Image
                src="/logo_heading.png"
                alt="logo_heading"
                width={64}
                height={24}
                className="dark:invert"
              />
            </div>
            <div className="w-64 text-sm text-gray-400 dark:text-gray-500 mt-6">
              Take your business to new heights with faster cash flow and clear
              financial insights all with a free Novo account. Apply in 10
              Minutes
            </div>
            <div>
              <div className="mt-10 flex space-x-4">
                <a href="#"><i className="fa-brands fa-facebook fa-xl text-gray-700 dark:text-gray-400"></i></a>
                <a href="#"><i className="fa-brands fa-square-instagram fa-xl text-gray-700 dark:text-gray-400"></i></a>
                <a href="#"><i className="fa-brands fa-square-x-twitter fa-xl text-gray-700 dark:text-gray-400"></i></a>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="grid max-sm:grid-cols-1 mt-6 max-md:grid-cols-2 gap-8 grid-cols-4">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-[#FD5339] !important">
                Our Product
              </h2>
              <ul className="text-gray-400 text-sm dark:text-gray-500">
                <li className="mb-1">
                  <a href="" className="hover:underline">
                    Checking Account
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Debit Card
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Funding
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Invoices
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Partner Perks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold text-[#FD5339] !important">
                Company
              </h2>
              <ul className="text-gray-400 text-sm dark:text-gray-500">
                <li className="mb-1">
                  <a href="" className="hover:underline">
                    Our Customers
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Company News
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Press
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Partnerships
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold text-[#FD5339] !important">
                Legal
              </h2>
              <ul className="text-gray-400 text-sm dark:text-gray-500">
                <li className="mb-1">
                  <a href="" className="hover:underline">
                    Resource Center
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Company News
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold text-[#FD5339] !important">
                Our Apps
              </h2>
              <ul className="text-gray-400 text-sm dark:text-gray-500">
                <li className="mb-1">
                  <a href="" className="hover:underline">
                    Download for iOS
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Download for Android
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:underline">
                    Log in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
