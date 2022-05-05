import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const initialFormValues = {
    name: '',
    dropdown: '',
    toppings1: false,
    toppings2: false,
    toppings3: false,
    toppings4: false,
    special: '',
}


function FinalForm() {

    const [errors, setErrors] = useState({
        name: '',
        dropdown: '',
        toppings1: false,
        toppings2: false,
        toppings3: false,
        toppings4: false,
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
        topping1: yup.boolean(),
        topping2: yup.boolean(),
        topping3: yup.boolean(),
        topping4: yup.boolean(),
        special: yup.string(),
    })

    const [formValues, setFormValues] = useState(initialFormValues)
    const [orderData, setOrderData] = useState([])

    const handleSubmit = (newOrder) => {
        
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                setOrderData([res.data, ...orderData])
            })
            .catch(err => console.error(err))
            .finally(() => setFormValues(initialFormValues))
    }

    const formSubmit = () => {
        const newOrder = {
            name: form.name,
            size: form.dropdown,
            special: form.special,
            topping: ["Pepperoni", "Sasuage", "Pineapple", "Peppers"].filter(topping => form[topping])
        }
        handleSubmit(newOrder)
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
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value

        validateChange(name, value)

        setForm({ ...form, [name]: value })
    }


    return (
        <form onSubmit={formSubmit} id='pizza-form'>
            <div>
                <span className='error'>{errors.name}</span>
                <label>Name on order:

                    <input data-test-id='ordername' onChange={formChange} name='name' id='name-input' value={form.name}
                        type='text'
                    />
                </label>
            </div>
            <div name='dropdown' >
                <label htmlFor="pizza-dropdown" name='size'> Choose a size:</label>
                <select id="size-dropdown" onChange={formChange} >
                    <option value="Personal"> Personal </option>
                    <option value="Medium" > Medium </option>
                    <option value="Large" > Large </option>
                </select>
            </div>
            <div name='checklist' id='toppings'>
                <label> Toppings: Pepperoni
                    <input
                        type="checkbox" name='topping1' onChange={formChange}
                    />
                </label>
                <label> Sasuage
                    <input
                        type="checkbox" name='topping2' onChange={formChange}
                    />
                </label>
                <label> Pineapple
                    <input
                        type="checkbox" name='topping3' onChange={formChange}
                    />
                </label>
                <label> Peppers
                    <input
                        type="checkbox" name='topping4' onChange={formChange}
                    />
                </label>
                <div>
                    <label>
                        <input id='special-text' 
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
export default FinalForm