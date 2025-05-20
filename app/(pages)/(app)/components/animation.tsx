import Lottie from "react-lottie";

const Animation = ({ animation, width, height, loop = true }) => {
    return (
        <Lottie
            options={{
                loop: loop,
                autoplay: true,
                animationData: animation,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                },
            }}
            height={width}
            width={height}
        />
    );
};

export default Animation;
