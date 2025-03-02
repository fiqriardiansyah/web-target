import { ReloadOutlined } from '@ant-design/icons';
import Target from '../../asset/target.png'

interface ErrorProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorProps) {
    return (
        <div className="container-custom flex items-center justify-center min-h-screen">
            <div className="w-full">
                <img src={Target} alt="Target" className="h-20 grayscale-100" />
                <h1 className="text-4xl font-semibold text-red-400 grayscale-100">Oops! Something went wrong</h1>
                <p className="text-red-500 my-10 bg-gray-100 py-2 px-4 rounded w-fit">{error.message}</p>
                <button onClick={resetErrorBoundary} className="btn-primary mt-4 cursor-pointer">
                    <ReloadOutlined className='mr-2' />
                    Try again
                </button>
            </div>
        </div>
    )
}