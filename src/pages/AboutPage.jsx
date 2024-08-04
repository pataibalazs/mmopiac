import React from "react";
import {
  LockClosedIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
const features = [
  {
    name: "Biztonság",
    description:
      "Biztonságos kereskedést garantálunk a Metin2 és egyéb privátszervereken játszó játékosainknak. Az MMOPIAC nemcsak garanciát vállal a biztonságra hanem megfelelő jogi keretek között is működik.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Anonimitás",
    description:
      "Az oldalon bejelentkezés nélkül képes vagy üzletetvéghezvinni. Nem kell megadnod a saját facebookodat a kereskedéshez.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Pénzkereseti lehetőségek",
    description:
      "Mi nemcsak eladunk de vennénk is játékbeli valutákat, így nem kell aggódnod akkor, hogy ha van egy tetemes játékbeli vagyonod, de nincs kiépített klientúrád. Nem kell rizikós bizniszbe keverednek. Add el nekünk.",
    href: "#",
    icon: ShoppingCartIcon,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl lg:text-center">
              <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
                Rólunk
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                Játékosoktól játékosoknak!
              </p>
              <div className="flex justify-between">
                <p className="mt-6 text-lg leading-8 text-gray-900 text-left">
                  Mi, akik évek óta Metin2 és más privát szervereken játszunk,
                  látjuk, ahogy az MMO-k és a játékosok is idősödnek. Egyre
                  nagyobb az igény egy olyan szolgáltatás iránt, ahol aranyat és
                  tárgyakat lehet valódi pénzért biztonságosan vásárolni.
                  Jelenleg a szervereken hirdetett Discord és Facebook csoportok
                  szolgálnak erre a célra, ám tapasztalataink szerint ezeken a
                  helyeken gyakoriak a csalások és visszaélések, vagy maga az
                  oldal is átverésre épül. Ismerőseinket számtalanszor becsapták
                  a Facebook csoportos üzletelések során, hamis
                  bankinformációkkal és account visszaigénylésekkel. Ezért úgy
                  gondoltuk, hogy létrehozunk egy megbízható oldalt, ahol ezek a
                  tranzakciók biztonságosan és anonim módon zajlanak, és ahol a
                  vásárlóknak nem kell félniük a rossz szándékú szereplőktől. A
                  felhasználóinknak a következőt tudjuk biztosítani:
                </p>
                <img
                  className="w-6/12 mt-8 ml-4"
                  src="/aboutuspic.jpg"
                  alt="Logo"
                />
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-2xl sm:mt-10 lg:mt-20 lg:max-w-none">
              <dl className="grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-amber-500"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-900">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6"></p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
