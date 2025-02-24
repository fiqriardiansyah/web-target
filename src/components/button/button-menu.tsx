export interface ButtonMenuProps {
    onClick?: () => void;
    icon?: string;
    name: string;
}

export default function ButtonMenu({ name, icon, onClick }: ButtonMenuProps) {
    return (
        <button onClick={onClick} key={name} className="cursor-pointer border border-gray-300 bg-gray-200 w-full rounded-xl transition duration-150 hover:shadow-xl shadow-2xl px-10 py-5 text-gray-500 flex items-center justify-between">
            {icon && <img src={icon} className='w-20 h-20 object-contain' />}
            <p className='text-black font-semibold text-xl text-center flex-1'>{name}</p>
        </button>
    )
}