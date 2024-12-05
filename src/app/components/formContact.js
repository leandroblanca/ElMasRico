'use client'
import { useForm } from 'react-hook-form';

export default function FormContact() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const sendContact = async (data) => {
        console.log(data)
      }

    return (
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(sendContact)}>
            <div className="w-full flex flex-col gap-2">
                <label className="text-sm ab:text-xl sm:text-2xl bg-white">¿Qué tipo de equipo tenemos que reparar? <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                <input {...register('equipo', {
                    required: 'Este campo es obligatorio',
                })} type="text" className="w-full xl:w-[500px] rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Equipo" />
                {errors.equipo && <span className="text-red-500 text-sm">{errors.equipo.message}</span>}
            </div>
            <div className="w-full flex xl:flex-row flex-col">
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm ab:text-xl sm:text-2xl bg-white">Marca <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                    <input {...register('marca', {
                        required: 'Este campo es obligatorio',
                    })} type="text" className="w-full xl:w-[500px] rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Marca" />
                    {errors.marca && <span className="text-red-500 text-sm">{errors.marca.message}</span>}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm ab:text-xl sm:text-2xl bg-white">Modelo <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                    <input {...register('modelo', {
                        required: 'Este campo es obligatorio',
                    })} type="text" className="w-full xl:w-[550px] rounded-lg px-4 h-12 border-[1px] border-green-800 placeholder:text-sm" placeholder="Modelo" />
                    {errors.modelo && <span className="text-red-500 text-sm">{errors.modelo.message}</span>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <label className="text-sm ab:text-xl sm:text-2xl bg-white">¿Qué le pasó al equipo? <span className="text-red-500 text-[20px] m-[-4px]">*</span></label>
                <textarea {...register('observaciones', {
                    required: 'Este campo es obligatorio',
                    maxLength: {
                        value: 500,
                        message: "No puedes exceder los 500 caracteres"
                    }
                })} type="textbox" className="w-full h-[100px] rounded-lg px-4 py-4 border-[1px] border-green-800 placeholder:text-sm" placeholder="Observaciones" />
                {errors.observaciones && <span className="text-red-500 text-sm">{errors.observaciones.message}</span>}
            </div>
            <div className="w-full justify-center">
                <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded-lg w-full xl:w-[30%] mt-4 text-[20px] hover:bg-yellow-500">Enviar</button>
            </div>
        </form>
    )
}