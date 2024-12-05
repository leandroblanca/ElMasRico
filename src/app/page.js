'use client'
import Header from "./components/header";
import HeaderLogin from "./components/headerLogin";
import Card from "./components/card";
import FormContact from "./components/formContact";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {token
        ? <HeaderLogin />
        : <Header />}
      <main className="md:w-[800px] xl:w-[1200px] mx-auto mt-8">
        <section className="flex flex-col items-center justify-center w-full px-4 md:px-16 gap-8 bg-white rounded-lg py-6 shadow-xl">
          <h1 className="text-3xl font-bold text-green-800">Reparación, mantenimiento y optimización de sistemas informáticos</h1>
          <div className="w-full flex items-center justify-between">
            <Card img="/rapidez.png" text="Rapidez" sizeW={170} sizeH={110} />
            <Card img="/candado.png" text="Seguridad" sizeW={170} sizeH={110} />
            <Card img="/rendimiento.png" text="Rendimiento" sizeW={170} sizeH={110} />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-pretty">En ByteSupport, nos especializamos en ofrecer soluciones rápidas y efectivas para todos tus problemas tecnológicos. Con años de experiencia en el sector, nuestro objetivo es garantizar que tu equipo funcione como nuevo.</h2>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full px-4 md:px-16 gap-8 bg-white rounded-lg py-6 shadow-xl">
          <h2 className="text-3xl font-bold text-green-800">Conocé nuestros servicios</h2>
          <div className="w-full flex items-center justify-between">
            <Card img="/optimizacion.png" text="Optimización de sistemas" sizeW={170} sizeH={110} />
            <Card img="/recuperardatos.png" text="Recuperación de datos" sizeW={170} sizeH={110} />
            <Card img="/redesysistemas.png" text="Instalación de redes y sistemas operativos" sizeW={170} sizeH={110} />
            <Card img="/reparacionpc.png" text="Reparaciones de PC y laptops" sizeW={170} sizeH={110} />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full px-4 md:px-16 gap-8 bg-white rounded-lg py-6 shadow-xl">
          <h2 className="text-3xl font-bold text-green-800 text-pretty text-center">¿Tenés problemas con tu equipo? ¡Contáctanos ahora y recupera su funcionalidad!</h2>
          <p className="texty-2xl text-pretty">Presupuesto sin compromiso. Escríbenos y te ayudaremos a encontrar la mejor solución.</p>
          {token
            ? <FormContact />
            : <p className="text-lg"><Link className="underline text-green-800" href="/login">Inicia sesión</Link> o <Link className="underline text-green-800" href="/register">registrate</Link> para que puedamos ayudarte</p>}
        </section>
      </main>
    </div>
  );
}
