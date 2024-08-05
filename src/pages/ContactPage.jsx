import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl lg:text-center">
              <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
                Kontakt
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                Kérdés, vagy probléma esetén írj nekünk.
              </p>
              <div className="justify-between max-w-4xl">
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                  1. Ha bármilyen kérdése van az arany vagy tárgyakvétele során, kérjük, forduljon 365/24/7 Online Támogatásunkhoz az alábbi módokon:
                   
                </p>
                <p className="mt-4 text-md font-bold text-gray-900 text-left mb-4">Discord ID: mmosale88
                </p>

                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                2. Ha el szeretné adni Metin2-ös, vagy Solaris2-ös fiókját vagy más szolgáltatásokat, kérjük, vegye fel a kapcsolatot a képviselőnk Discordján egy kiváló ajánlatért.
                </p>
                <p className="mt-4 text-md font-bold text-gray-900 text-left mb-4">complaint@gmail.com
                </p>
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                3. Ha bármilyen kérdése van a szolgáltatással kapcsolatos panaszról, kérjük, forduljon hozzánk emailben. Általában 12 órán belül megoldást kap.
                </p>
                <p className="mt-4 text-md font-bold text-gray-900 text-left mb-4">Aftersale365@gmail.com
                </p>
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                4. Ha bármilyen kérdése van az mmopiac üzleti együttműködéssel kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az alábbi módokon.
                </p>
                <p className="mt-4 text-md font-bold text-gray-900 text-left mb-4">Üzleti érdeklődés: affiliate4game@gmail.com
                  </p>
                

                
                
                
              </div>
            </div>
          </div>
        
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
