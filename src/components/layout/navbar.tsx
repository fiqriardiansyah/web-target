import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Targetpng from '../../asset/target.png';
import { useNavbarContext } from '../../hooks';
import React from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const navbarContext = useNavbarContext();
    const refNav = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const onScroll = () => {
            const scrolly = window.scrollY;
            if (scrolly > 30) {
                refNav.current?.classList.add("shadow-md");
            } else {
                refNav.current?.classList.remove("shadow-md");
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div ref={refNav} className={`w-full z-50 py-3 bg-white fixed top-0 left-0`}>
            <div className="container-custom flex items-center justify-between">
                <div className="flex items-center">
                    <Button onClick={() => navigate(-1)} shape='circle' icon={<ArrowLeftOutlined />} />
                    <img src={Targetpng} className='h-[40px] ml-5' alt="" />
                </div>
                <div className="">
                    {navbarContext?.extraComponent}
                </div>
            </div>
        </div>
    )
}