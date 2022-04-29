import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'

const initialFormValues = {
  name: '',
  dropdown: '',
  checklists1: false,
  checklists2: false,
  checklists3: false,
  checklists4: false,
  special: '',
}

// {orders, setOrders}
function OrderForm() {
  // const [orders, setOrders] = useState([])
  
  const formSchema = yup.object().shape({
    name: yup.string().min(2, "name must be at least 2 characters"),
    dropdown: yup.string(),
    checklists1: yup.boolean(),
    checklists2: yup.boolean(),
    checklists3: yup.boolean(),
    checklists4: yup.boolean(),
    special: yup.string(),
  })

  const [errors, setErrors] = useState({
    name: '',
  dropdown: '',
  checklists1: false,
  checklists2: false,
  checklists3: false,
  checklists4: false,
  special: '',
  })

  const validateChange = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(()=>{
        setErrors({...errors, [name]: ''})
      })
      .catch((error)=>{
        setErrors({...errors, [name]: error.errors[0]})
      })
  }
   
  const [disabled, setDisabled] = useState(true)

  const [form, setForm] = useState(initialFormValues)
  const history = useHistory()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [orderData, setOrderData] = useState([])
  

  // const submitHandler = (event) => {
  //   event.preventDefault()
  //   setOrders([...orders, form])
  //   history.push('/myorder')
  // }

  const handleSubmit = () => {
    axios.post(`https://reqres.in/api/orders`, formValues)
    .then(res => {
      setOrderData([res.data, ...orderData])
    })
    .catch(err => console.error(err))
    .finally(() => setFormValues(initialFormValues))
  }
  


  useEffect(()=>{
    formSchema.isValid(form)
    .then((valid)=>{
      setDisabled(!valid)
    })
  }, [form]) 

  const formChange = (event) => {
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    validateChange(name, value)

    setForm({...form, [name]: value})
  }


    // console.log(form)

  return (
    <form onSubmit={handleSubmit} id='pizza-form'>
      <div>
        <span className='error'>{errors.name}</span>
        <label>Name on order: 
          
          <input data-test-id='ordername' onChange={formChange} name='name' id='name-input' value={form.name}
            type='text'
          />
        </label>
      </div>
      <div name='dropdown' id='size'>
        <label htmlFor="pizza-dropdown">Choose a size:</label>
        <input list="size-dropdown" id="pizza-dropdown" name='dropdown' onChange={formChange}/>
        <datalist id="size-dropdown">
          <option value="Personal" />
          <option value="Medium" />
          <option value="Large" />
        </datalist>
      </div>
      <div name='checklist' id='toppings'>
        <label> Toppings: Pepperoni
          <input
            type='checkbox' name='checklists1' onChange={formChange}
          />
        </label>
        <label> Sasuage
          <input
            type='checkbox' name='checklists2' onChange={formChange}
          />
        </label>
        <label> Pineapple
          <input
            type='checkbox' name='checklists3' onChange={formChange}
          />
        </label>
        <label> Peppers
          <input
            type='checkbox' name='checklists4' onChange={formChange}
          />
        </label>
        <div id='special-text'>
          <label>Special instructions:
            <input
              type='text' name='special' onChange={formChange}
            />
          </label>
        </div>
        <div id='submit-button'>
          <label>
            <button data-test-id='subBtn' id='order-button' type='submit' disabled={disabled} >Complete Order</button>
          </label>
        </div>
      </div>






    </form>
  )
}

export default OrderForm