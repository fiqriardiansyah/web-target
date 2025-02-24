import { useNavigate } from 'react-router-dom';
import HeaderFooterPng from '../../asset/header-footer.png';
import { ButtonMenu } from '../../components';

export default function Setting() {
    const navigate = useNavigate();

    const menus = [
        { name: 'Header dan Footer Struk', icon: HeaderFooterPng, onClick: () => { navigate('/setting/meta-receipt') } },
    ]

    return (
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                {menus.map((menu) => <ButtonMenu key={menu.name} {...menu} />)}
            </div>
        </div>
    )
}