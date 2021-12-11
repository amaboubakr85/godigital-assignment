import './App.css'
import { useState, useEffect } from 'react'
import Products from './data/products'
import { Button } from 'react-bootstrap'

const App = () => {
  useEffect(() => {
    // Products.map((item) => console.log(item.name))
  }, [])

  const [items, setItems] = useState([])

  const addToChart = (id) => {
    let chartItem = Products.find((item) => item.id === id)

    setItems(items.concat(chartItem))

    // console.log(items)
  }

  const removeItem = (id) => {
    const finalItems = items.filter((item) => item.id !== id)
    setItems(finalItems)
    console.log(finalItems)
    // setItems(finalItems)
  }
  return (
    <div className='my-5'>
      <div className='container'>
        <div className='row items'>
          <div className='col-md-8'>
            {Products.map((item) => (
              <div className='card mb-3' key={item.id}>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <img src={item.image} className='img-fluid rounded-start' alt='...' />
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body'>
                      <h5 className='card-title'>{item.name}</h5>
                      <p className='card-text'>{item.description}</p>
                      <div className='card-price'>
                        <p>{item.price} $</p>
                        <Button
                          id={item.id}
                          className={item.name}
                          onClick={() => addToChart(item.id)}>
                          Add To cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4'>
            <h2>Cart Items</h2>
            <div className='container'>
              {items.map((item) => (
                <div className='row ' key={item.name}>
                  <div className='col-md-6'>{item.name}</div>
                  <div className='col-md-4'>{item.price} $</div>
                  <div className='col-md-2'>
                    <Button variant='danger' size='sm' onClick={() => removeItem(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
