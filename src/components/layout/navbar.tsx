import { Button } from 'antd';
import Targetpng from '../../asset/target.png';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <div className="container-custom py-4 flex items-center">
                <Button onClick={() => navigate(-1)} shape='circle' icon={<ArrowLeftOutlined />} />
                <img src={Targetpng} className='h-[40px] ml-5' alt="" />
            </div>
        </div>
    )
}