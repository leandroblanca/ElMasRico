import Image from "next/image"

export default function CardTop(props) {
    const { img, text, sizeW, sizeH } = props

    return (
        <div className="flex flex-col items-center gap-4">
            <Image className={`rounded-md border-2 border-green-800 border-pretty p-4`} src={img} alt="" width={sizeW} height={sizeH}/>
            <span className={`text-lg font-bold max-w-[200px] text-center text-pretty`}>{text}</span>
        </div>
    )
}