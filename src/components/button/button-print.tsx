import ReportImg from '../../asset/report.png';

interface ButtonPrintProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function ButtonPrint({ text = 'Print' }: ButtonPrintProps) {
    return (
        <button className="cursor-pointer py-3 px-5 rounded-lg bg-gray-200 shadow-xl hover:shadow w-[300px] flex items-center justify-center gap-4">
            <img src={ReportImg} alt="" className="w-12" />
            <p>{text}</p>
        </button>
    )
}