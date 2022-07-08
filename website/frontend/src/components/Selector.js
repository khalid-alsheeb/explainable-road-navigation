
//UNUSED: Future work

// const handleChange = (options) => {
//     setParams( { ...Params, algorithms: options.map(x => x.value) } );
// };

//import makeAnimated from 'react-select/animated';

//const animatedComponents = makeAnimated();

// const [Params, setParams] = useState( { algorithms: [], stock: '^GSPC', date: today_date, period: '1y' } );

// const algorithms = [
//     { value: 'DAE', label: 'DAE' },
//     { value: 'Savitzky_Golay', label: 'Savitzky–Golay filter' },
//     { value: 'MA', label: '50-Day Moving Average' } 
// ];

// const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       color:'white',
//       backgroundColor: state.isFocused ? '#585858' : '#404040'
//     }),
//     control: (provided) => ({
//       ...provided,
//       marginTop: "5%",
//       color:'white',
//       backgroundColor: '#404040'
//     }),
//     menu: (provided) => ({
//         ...provided,
//         borderRadius: 0,
//         marginTop: 0
//     }),
//     menuList: (provided) => ({
//         ...provided,
//         padding: 0
//     }),
//     input: (provided) => ({
//         ...provided,
//         color: 'white'
//     }),
//     multiValue: (provided) => ({
//         ...provided,
//         backgroundColor: '#404040',
//         borderRadius: '10px'
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: 'white'
//     }),
//     noOptionsMessage: (provided) => ({
//       ...provided,
//       color:'white',
//       backgroundColor: '#404040'
//     }),
// }


// <Form.Group className="mb-3"> 
// <Form.Label style={styles.white}>
//     Algorithm
// </Form.Label>
//     <Select
//     closeMenuOnSelect={false}
//     styles={ customStyles }
//     components={animatedComponents}
//     isMulti
//     options={algorithms}
//     onChange={handleChange}
//     />
// </Form.Group>