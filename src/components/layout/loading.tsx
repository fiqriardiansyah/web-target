import { useLottie } from "lottie-react";
import TargetAnimation from '../../asset/animation/target.json';

export default function Loading() {

    const { View, setSpeed } = useLottie({
        animationData: TargetAnimation,
        loop: true,
        autoplay: true,
    }, {
        height: '150px',
    });

    setSpeed(2);

    return (
        <div className="w-full h-full fixed top-0 left-0 z-40 flex justify-center items-center bg-black/10 bg-opacity-50">
            {View}
        </div>
    )
}