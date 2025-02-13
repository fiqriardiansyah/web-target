import { ShoppingCartOutlined } from '@ant-design/icons';
import Targetpng from '../../asset/target.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useGlobalContext } from '../../hooks';

const HomePage = () => {
    const navigate = useNavigate();
    const globalContext = useGlobalContext();

    const salesClickHandler = () => {
        navigate('/sales');
    }

    const menus = [
        { name: 'Penjualan', icon: ShoppingCartOutlined, onClick: salesClickHandler }
    ]

    const onLogoutClick = () => {
        globalContext.removeUser();
        window.location.reload();
    }

    return (
        <div className="justify-center relative container-custom flex flex-col">
            <div className="mt-10 w-full flex justify-between">
                <div className="">
                    <img src={Targetpng} alt="" className="w-[200px]" />
                    <p className="mb-10">Target merupakan sistem penjualan yang terintegrasi dari JSL</p>
                </div>
                <Button onClick={onLogoutClick} danger type='text' size="large">
                    Keluar
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                {menus.map((Menu) => (
                    <button onClick={Menu.onClick} key={Menu.name} className="cursor-pointer bg-gray-200 w-full rounded-xl transition duration-150 hover:shadow-xl shadow-2xl px-5 py-3 text-gray-500 flex items-center justify-between">
                        <Menu.icon style={{ fontSize: 60 }} />
                        <p className='text-black text-xl text-center flex-1'>{Menu.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default HomePage;