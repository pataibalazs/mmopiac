import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";

const SellToUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl lg:text-center">
              <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
                Adj el nekünk
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Van játékbeli valutád? Mi megvesszük!
              </p>
              <div className="justify-between">
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                  Mint az egyik legjobb Metin2 Yang eladó, az mmopiac.hu nemcsak
                  a Yang eladása az egyedüli szolgáltatásunk, hanem Metin2 Yang
                  vásárlása a játékosoktól is nagy szolgáltatásunk. Az egyre
                  növekvő ügyféligények miatt Metin2 beszállítóink szeretnék
                  meghívni mindazokat, akiknek van Yang-juk, hogy csatlakozzanak
                  üzletünkhöz. Mindig a legjobb árat kínáljuk a Yang eladóknak,
                  biztosítva, hogy több pénzt kereshessenek, mint bármely más
                  weboldalon.
                </p>
                <p className="mt-6 text-md font-bold leading-8 text-gray-900 text-left">
                  Mi a folyamat a Yang eladásához számunkra?
                </p>
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                  1. Lépjen kapcsolatba élő chatünkkel vagy a kapcsolódó
                  képviselőnkkel Skype-on, és küldje el kérését a Yang
                  eladásáról, mondja el nekünk, hogy Metin2 Yangot szeretne
                  eladni, és még azt is, hogy mennyit szeretne eladni.
                  <br />
                  2. Ajánlatot adunk a Yang-jára, majd azonnal megállapodás
                  születik közöttünk.
                  <br />
                  3. Egy mindkettőnk számára ismert kereskedelmi helyszínt
                  biztosítunk. Megkérdezzük az RSN-jét (játékbeli nevét), és
                  kereskedünk Önnel.
                  <br />
                  4. A kereskedés befejezése után megkérdezzük a PayPal e-mail
                  címét vagy a G2A fogadó fiókját.
                  <br />
                  5. A pénzküldés azonnal megtörténik. PayPal és G2A fizetés
                  támogatott.
                  <br />
                  Ezek a lépések mindig kényelmesek és egyszerűek, általában
                  csak néhány percet vesz igénybe az egész folyamat befejezése
                  attól a pillanattól kezdve, hogy kapcsolatba lép velünk.
                </p>
                <p className="mt-6 text-md font-bold leading-8 text-gray-900 text-left">
                  Miért kellene eladnom a Yang-ot az MMOPIAC-nak?
                </p>
                <p className="mt-6 text-md leading-8 text-gray-900 text-left">
                  <p className="font-bold">1. Csodálatos Ajánlat</p>
                  Sokkal több pénzt kereshet, ha eladja nekünk a Yang-ot, mint
                  ha más weboldalaknak adná el, mert naponta összehasonlítjuk a
                  piaci árakat és a legversenyképesebb ajánlatot tartjuk fenn
                  Önnek.
                  <p className="font-bold">
                    2. Azonnali és Biztonságos Fizetés
                  </p>
                  Azonnal megkapja a valós pénzt, amint a kereskedés
                  befejeződik. Az MMOPIAC soha nem késlelteti a tranzakciók
                  kifizetését vagy nem hagyja figyelmen kívül a pénzét. A
                  fizetés után nincs csalárd vagy szándékos visszatérítés
                  garantált.
                  <p className="font-bold">
                    3. Legmagasabb Megbízhatóság
                  </p>
                  Az MMOPIAC 2008 óta működik, így csapatunk bőséges
                  tapasztalattal rendelkezik a Metin2 Yang eladásában és
                  vásárlásában, és jó hírnévre tett szert az évek során.
                  Kétségtelenül garantálni tudjuk az Ön elégedettségét és
                  biztonságát.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl text-center mt-14">
            Írj nekünk!
          </p>
          <form
            action="#"
            method="POST"
            className="mx-auto mt-14 mb-14 max-w-xl"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email cím
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                  Termék amivel rendelkezel
                </label>
                <select
                  id="location"
                  name="location"
                  defaultValue="Canada"
                  className="mt-2 block bg-white w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6"
                >
                  <option>Metin2 Yang</option>
                  <option>Solaris Yang</option>
                  <option>DDMT2 Yang</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Üzenet
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-amber-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Küldés
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellToUs;
