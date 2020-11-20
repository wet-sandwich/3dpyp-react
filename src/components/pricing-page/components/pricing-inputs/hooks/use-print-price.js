import React from 'react'

const UPDATE_PRICE = 'UPDATE_PRICE'

const sum = obj => Object.values(obj).reduce((acc, cur) => acc + cur)

function printPriceReducer(state, action) {
  const {type, payload} = action
  const {filament, amount, printer, time, overhead} = payload

  switch (type) {
    case UPDATE_PRICE: {
      let deprCost = (printer.cost / printer.life * time) || 0
      let filamentCost = (filament.cost * amount / 1000) || 0
      let maintCost = (deprCost * overhead.maintenance / 100)
      let failCost = (deprCost + filamentCost + maintCost) * overhead.failRate / 100

      return {
        deprCost: deprCost,
        filamentCost: filamentCost,
        maintCost: maintCost,
        failCost: failCost
      }
    }
    
    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}

export default function usePrintPrice() {
  const [state, dispatch] = React.useReducer(printPriceReducer, {
    deprCost: 0,
    filamentCost: 0,
    maintCost: 0,
    failCost: 0,
  })

  const totalPrice = sum(state)
  const updatePrice = (payload) => dispatch({type: UPDATE_PRICE, payload: payload})

  return [state, {totalPrice, updatePrice}]
}
