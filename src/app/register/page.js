'use client'
import Header from "../components/header"
import { useForm } from 'react-hook-form';
import { useState } from "react";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabledButton, setDisabledButton] = useState(false)
    const registerInPage = async (data) => {
        setDisabledButton(true)
        try {
            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                setDisabledButton(false)

                if (data.token) {
                    localStorage.setItem('token', data.token)
                    window.location.href = '/'
                }
            })
        }
        catch (error) {
            setDisabledButton(true)
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <main className="md:w-[800px] xl:w-[1200px] mx-auto mt-8 font-[family-name:var(--font-geist-sans)]">
                <section className="flex flex-col items-center justify-center w-full px-16 gap-8 bg-white rounded-lg py-6 shadow-xl">
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-geist-mono)] underline">Registrate para poder reparar tu equipo</h1>
                    <form onSubmit={handleSubmit(registerInPage)} className="mx-auto flex flex-col gap-2">
                        <div className="w-full flex gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-sm ab:text-xl sm:text-2xl bg-white">Nombre <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                                <input {...register('nombre', {
                                    required: 'Este campo es obligatorio',
                                })} type="text" className="w-full xl:w-[500px] rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Email" />
                                {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-sm ab:text-xl sm:text-2xl bg-white">Apellido <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                                <input {...register('apellido', {
                                    required: 'Este campo es obligatorio',
                                })} type="text" className="w-full xl:w-[500px] rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Email" />
                                {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm ab:text-xl sm:text-2xl bg-white">Telefono <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                            <input {...register('telefono', {
                                required: 'Este campo es obligatorio',
                            })} type="text" className="w-full rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Telefono" />
                            {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm ab:text-xl sm:text-2xl bg-white">Correo Electronico <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                            <input {...register('email', {
                                required: 'Este campo es obligatorio',
                            })} type="email" className="w-full rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Email" />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm ab:text-xl sm:text-2xl bg-white">Contraseña <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                            <input {...register('password', {
                                required: 'Este campo es obligatorio',
                            })} type="password" className="w-full rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Password" />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <div className="w-full justify-center">
                            <button type="submit" className={`bg-green-800 text-white border-2 border-white px-4 py-2 rounded-lg w-full mt-4 text-[20px] hover:border-green-800 hover:bg-white hover:text-black ease-in-out duration-200 disabled:bg-zinc-500`} disabled={disabledButton}>Registrarse</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}