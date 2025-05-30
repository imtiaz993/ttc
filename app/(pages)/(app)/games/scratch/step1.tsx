import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import ScratchCard from "../../components/scratchCard";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const ScratchStep1 = ({ playMusic = () => {} }: any) => {
  const userData = useSelector((state: any) => state.user.userData);
  const [isRevealed, setIsRevealed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      <Menu isOpen={userData.menu} playMusic={playMusic} />
      <ScratchCard
        isRevealed={isRevealed}
        setIsRevealed={setIsRevealed}
        animation={!userData.menu}
      />
    </>
  );
};

export default ScratchStep1;
