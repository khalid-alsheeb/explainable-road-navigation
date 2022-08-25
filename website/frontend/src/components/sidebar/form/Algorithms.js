import { useSelector } from 'react-redux';
import AlgorithmsControls from './AlgorithmsControls';
import AlgorithmsSelector from './AlgorithmsSelector';
import InputSelector from './InputSelector';

const Algorithms= () => {

    const inputType = useSelector((state) => state.inputType);

    return (
        <>
            <InputSelector />

            {
                inputType === 2 ?
                    <AlgorithmsSelector />
                :
                    <></>
            }

            {/* <AlgorithmsControls /> */}

        </>
    )
}

export default Algorithms;