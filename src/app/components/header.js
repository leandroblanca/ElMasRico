import Link from "next/link"
import Image from "next/image"

export default function Header() {
    return (
        <header className="md:w-[800px] xl:w-[1200px] h-[70px] mx-auto flex justify-between items-center px-16 py-2 text-black bg-white shadow-xl mt-4 rounded-lg">
            <p className="text-xl font-bold font-[family-name:var(--font-geist-mono)] underline">ByteSupport</p>
            <div className="flex gap-6">
                <Link href="/login">
                    <div className="flex flex-col items-center justify-center hover:underline group">
                        <Image className="group-hover:scale-110 duration-300 ease-in-out" src="/login_icon.svg" alt="Login Icon" width={25} height={20} />
                        <p className="text-[16px]">Iniciar Sesión</p>
                    </div>
                </Link>

                <Link href="/register">
                    <div className="flex flex-col items-center justify-center hover:underline group">
                        <Image className="group-hover:scale-110 duration-300 ease-in-out" src="/register_icon.svg" alt="Login Icon" width={25} height={20} />
                        <p className="text-[16px]">Registrarse</p>
                    </div>
                </Link>
            </div>
        </header>
    )
}