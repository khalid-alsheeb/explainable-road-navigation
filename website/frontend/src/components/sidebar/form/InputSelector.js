import Select from 'react-select';
import { Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { changeInputType, changeVersion } from '../../../actions';
import AlgorithmDescription from './AlgorithmDescription';
import { Typography } from '@mui/material';
import InputDescription from './InputDescription';

const InputSelector= () => {

    const dispatch = useDispatch();

    const animatedComponents = makeAnimated();

    const algorithms = [
        { value: 1, label: 'Provide a full path' },
        { value: 2, label: 'Add a Waypoint' },
    ];

    const handleChange = (choice) => {
        dispatch(changeInputType(choice.value))
        dispatch(changeVersion(choice.value))
    }

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
                Did you expect a different path?

            </Form.Label>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Please select a way to input your desired path
            </Typography>
            <Select
                defaultValue={algorithms[0]}
                styles={ customStyles }
                components={animatedComponents}
                options={algorithms}
                onChange = {handleChange}
                isSearchable={false}
            />

            <Form.Text className="text-muted">
            <InputDescription />
            </Form.Text>
        </Form.Group>
    )
}

export default InputSelector;