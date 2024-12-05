import Link from "next/link"
import Image from "next/image"
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react";

export default function HeaderLogin() {
    const decodedToken = jwtDecode(localStorage.getItem('token'));

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setShowMenu(false);
            } 
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <>
            <header className="md:w-[800px] xl:w-[1200px] h-[70px] mx-auto flex justify-between items-center px-4 md:px-16 py-2 text-black bg-white shadow-xl mt-4 rounded-lg">
                <p className="text-xl font-bold font-[family-name:var(--font-geist-mono)] underline">ByteSupport</p>
                <div className="hidden md:flex gap-6">
                    <Link href="/Inicio">
                        <p className="text-[16px] hover:underline">Inicio</p>
                    </Link>
                    <Link href="/Tickets">
                        <p className="text-[16px] hover:underline">Mis Tickets</p>
                    </Link>
                    <Link href="/Envio">
                        <p className="text-[16px] hover:underline">Mi Equipo</p>
                    </Link>
                </div>
                <div className="hidden md:flex flex-col items-center">
                    <p>Bienvenido <span className="uppercase underline text-green-800">{decodedToken.nombre} {decodedToken.apellido}</span></p>
                    <button className="bg-transparent text-red-600 cursor-pointer hover:underline" onClick={() => handleLogout()}>Cerrar Sesión</button>
                </div>

                <div onClick={() => setShowMenu(true)} className="md:hidden flex flex-col items-center">
                    <Image src="/menu_icon.png" alt="Menu Icon" width={30} height={30} />
                </div>
            </header>

            {showMenu && 
                <div className="absolute top-0 z-[1] h-screen w-screen km:w-[300px] bg-white shadow-xl rounded-lg">
                    <div className="w-full flex justify-end p-2"><Image src="/close_icon.png" alt="Close Icon" width={30} height={30} onClick={() => setShowMenu(false)}/></div>
                    <div className="md:hidden flex flex-col items-center gap-4 py-4">
                        <p>Bienvenido <span className="uppercase underline text-green-800">{decodedToken.nombre} {decodedToken.apellido}</span></p>
                        <Link href="/Inicio">
                            <p className="text-[16px] hover:underline">Inicio</p>
                        </Link>
                        <Link href="/Tickets">  
                            <p className="text-[16px] hover:underline">Mis Tickets</p>
                        </Link>
                        <Link href="/Envio">
                            <p className="text-[16px] hover:underline">Mi Equipo</p>
                        </Link>
                        <button className="bg-transparent text-red-600" onClick={() => handleLogout()}>Cerrar Sesión</button>
                    </div>
                </div>
            }
        </>
    )
}