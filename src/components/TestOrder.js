import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialFormValues = {
    name: '',
    dropdown: '',
    checklists1: false,
    checklists2: false,
    checklists3: false,
    checklists4: false,
    special: '',
}

function TestOrderForm() {

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
            .then(() => {
                setErrors({ ...errors, [name]: '' })
            })
            .catch((error) => {
                setErrors({ ...errors, [name]: error.errors[0] })
            })
    }

    const formSchema = yup.object().shape({
        name: yup.string().min(2, "name must be at least 2 characters"),
        dropdown: yup.string(),
        checklists1: yup.boolean(),
        checklists2: yup.boolean(),
        checklists3: yup.boolean(),
        checklists4: yup.boolean(),
        special: yup.string(),
    })

    const [formValues, setFormValues] = useState(initialFormValues)
    const [orderData, setOrderData] = useState([])
    // if this does not work delete this line 52, 57, 58, 4
    const history = useHistory()
 
    //event in () line 55
    const handleSubmit = (newOrder) => {
        axios.post('https://reqres.in/api/orders', newOrder)
          .then(res => {
            setUsers([res.data, ...users])
          })
          .catch(err => console.error(err))
          .finally(() => setForm(initialForm))
      }
    
      const formSubmit = () => {
        const newOrder = {
          name: form.name,
          size: form.dr,
          special: form.special,
          topping: ["Pepperoni", "Sasuage", "Pineapple", "Peppers"].filter(topping => form[topping])
        }
        handleSubmit(newOrder);
      }

    const [form, setForm] = useState(initialFormValues)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        formSchema.isValid(form)
            .then((valid) => {
                setDisabled(!valid)
            })
    }, [form])

    const formChange = (event) => {
        const name = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

        validateChange(name, value)

        setForm({ ...form, [name]: value })
    }
    // const onSubmit = (event) => {
    //     event.preventDefault()
    //     onSubmit()
    // }  
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
                <select id="size-dropdown" onChange={formChange} >
                    <option value="Personal"> Personal </option>
                    <option value="Medium" > Medium </option>
                    <option value="Large" > Large </option> 
                </select>
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
                        <button onSubmit={formSubmit} data-test-id='subBtn' id='order-button' type='submit' disabled={disabled} >Complete Order</button>
                    </label>
                </div>
            </div>


        </form>
    )
}

export default TestOrderForm;