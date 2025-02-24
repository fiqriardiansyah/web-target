import Targetpng from '../../asset/target.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useGlobalContext } from '../../hooks';
import CartPng from '../../asset/cart.png';
import SettingPng from '../../asset/setting.png';
import ReportPng from '../../asset/report.png';
import PaymentTransfer from '../../asset/transaction.png';
import { ButtonMenu } from '../../components';

const HomePage = () => {
    const navigate = useNavigate();
    const globalContext = useGlobalContext();

    const menus = [
        { name: 'Penjualan', icon: CartPng, onClick: () => { navigate('/sales') } },
        { name: 'Laporan', icon: ReportPng, onClick: () => { navigate('/report') } },
        { name: 'DP Penjualan', icon: CartPng, onClick: () => { navigate('/dp-sales') } },
        { name: 'Transaksi', icon: PaymentTransfer, onClick: () => { navigate('/transaction') } },
        { name: 'Pengaturan', icon: SettingPng, onClick: () => { navigate('/setting') } },
    ]

    const onLogoutClick = () => {
        globalContext.removeUser();
        window.location.reload();
    }

    return (
        <div className="justify-center relative container-custom flex flex-col pt-5">
            <div className=" w-full flex justify-between">
                <div className="">
                    <img src={Targetpng} alt="" className="w-[150px]" />
                    <p className="mb-7">Target merupakan sistem penjualan yang terintegrasi dari JSL</p>
                </div>
                <Button onClick={onLogoutClick} danger type='text' size="large">
                    Keluar
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                {menus.map((menu) => <ButtonMenu key={menu.name} {...menu} />)}
            </div>
        </div>
    )
}

export default HomePage;