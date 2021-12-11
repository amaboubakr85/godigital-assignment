import './App.css'
import { useReducer } from 'react'
import Products from './data/products'
import { Button } from 'react-bootstrap'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const initState = {
  items: [],
  loading: false,
}

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_TO_CART:
      let existItem = state.items.find((x) => x.id === payload.id)
      if (existItem) {
        return {
          ...state,
          items: state.items.map((el) =>
            el.id === existItem.id
              ? {
                  ...el,
                  qty: el.qty + payload.qty,
                  price: el.price,
                  // totalPrice: (Number(el.price) * Number(el.qty + payload.qty)).toFixed(2),
                  totalPrice: Number(Number(el.price) * Number(el.qty + payload.qty)),
                }
              : el
          ),
        }
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: payload.id,
              name: payload.name,
              qty: payload.qty,
              price: payload.price,
              totalPrice: payload.price,
            },
          ],
        }
      }

    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter((el) => el.id !== payload) }

    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { items } = state
  console.log(items)
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
                          onClick={() =>
                            dispatch({
                              type: ADD_TO_CART,
                              payload: {
                                id: item.id,
                                name: item.name,
                                qty: 1,
                                price: item.price,
                                totalPrice: item.price,
                              },
                            })
                          }>
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
              {items.length > 0 &&
                items.map((item) => (
                  <div className='row ' key={item.name}>
                    <div className='col-md-5'>{item.name}</div>
                    <div className='col-md-3'>{item.totalPrice} $</div>
                    <div className='col-md-2'>{item.qty} pcs</div>
                    <div className='col-md-2'>
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: item.id })}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <div className='row'>
              <h5>Total Price : {items.reduce((acc, item) => item.totalPrice + acc, 0)}$</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
