import React from 'react'

const SET = 'SET'
const RESET = 'RESET'

function filtersReducer(state, action) {
  const {type, name, value} = action

  switch (type) {
    case SET: {
      return {
        ...state,
        [name]: value
      }
    }

    case RESET: {
      return {
        material: "",
        brand: "",
        color: "",
        size: "",
      }
    }

    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}

export default function useFilters() {
  const [state, dispatch] = React.useReducer(filtersReducer, {
    material: "",
    brand: "",
    color: "",
    size: "",
  })

  const setFilter = (name, value) => dispatch({type: SET, name: name, value: value})
  const resetFilters = () => dispatch({type: RESET})

  return [state, {setFilter, resetFilters}]
}
