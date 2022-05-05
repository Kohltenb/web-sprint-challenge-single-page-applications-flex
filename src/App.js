import React, {useState} from "react";
import { Switch, Route, Link } from 'react-router-dom'
import FinalForm from "./components/FinalForm";



const App = () => {
  

  const [orders, setOrders] = useState([])

  return (
   <div>
        <header>
         <Link to='/'>Home</Link>
         <Link to='/pizza'>Order</Link>
         <Link to='/myorder'>My Order</Link> 
        </header>
      <Switch>
        <Route exact path='/'>
          <h1>Lambda Eats</h1>
          <p>Best Programmer pizza WITH delivery!</p>
          <Link id='order-pizza' data-test-id='/pizza' to="/pizza">My button</Link>
        </Route>
        <Route exact path='/pizza'>
          <h1>Lambda Eats</h1>
          <h2>Build your pizza</h2>
          <FinalForm id='pizza-form' orders={orders} setOrders={setOrders} />
        </Route>
        <Route exact path='/myorder'>
          <h1>Lambda Eats</h1>
          <h2>My Order</h2>
          {
            orders.map((order, index) => (
              <section key={`myorders-${index}`}>
                <h2>Name on Order: {order.name}</h2>
                <p>Size: {order.dropdown}</p>
                <p>Special instructions: {order.special}</p>
                <h3>Your pizza is in process</h3>
                <p> Please refer to app regarding delivery speed </p>
              </section>
            ))
          }
        </Route>
     </Switch>
  </div>
  );
};
export default App;