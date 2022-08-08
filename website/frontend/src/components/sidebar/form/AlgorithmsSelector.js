import Select from 'react-select';
import { Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { changeVersion } from '../../../actions';
import AlgorithmDescription from './AlgorithmDescription';

const AlgorithmsSelector= () => {

    const dispatch = useDispatch();

    const animatedComponents = makeAnimated();

    const algorithms = [
        { value: 1, label: 'Specific path' },
        { value: 2, label: 'Waypoint' },
        { value: 3, label: 'Anytime Algorithm' } 
    ];

    const customStyles = {
        option: (provided, state) => ({
        ...provided,
        color:'white',
        backgroundColor: state.isFocused ? '#585858' : '#404040'
        }),
        control: (provided) => ({
        ...provided,
        color:'white',
        backgroundColor: '#404040',
        border: '1px solid rgb(255, 145, 0)',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid rgb(255, 145, 0)',
        }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0
        }),
        input: (provided) => ({
            ...provided,
            color: 'white'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white'
        }),
    }

    return (
        <Form.Group className="mb-3"> 
            <Form.Label style={{color: 'white'}}>
                Algorithm
            </Form.Label>
            <Select
                defaultValue={algorithms[0]}
                styles={ customStyles }
                components={animatedComponents}
                options={algorithms}
                onChange = {(choice) => dispatch(changeVersion(choice.value))}
                isSearchable={false}
            />

            <Form.Text className="text-muted">
            <AlgorithmDescription />
            </Form.Text>
        </Form.Group>
    )
}

export default AlgorithmsSelector;