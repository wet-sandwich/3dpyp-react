import React from 'react'

const SET_FILAMENT = 'SET_FILAMENT'
const SET_PRINTER = 'SET_PRINTER'

function selectionReducer(state, action) {
  const {filament, printer} = state
  const {type, item} = action

  switch (type) {
    case SET_FILAMENT: {
      if (state.printer !== "") {
        if ((item.printTemp[0] > printer.maxPrintTemp) ||
            (item.minBedTemp > printer.maxBedTemp) ||
            !(printer.size === item.size)) {
              return {
                filament: item,
                printer: "",
              }
            } else {
              return {
                ...state,
                filament: item,
              }
            }
      } else {
        return {
          ...state,
          filament: item,
        }
      }
    }

    case SET_PRINTER: {
      return {
        ...state,
        printer: item,
      }
    }
  }
}

export default function useSelection() {
  const [state, dispatch] = React.useReducer(selectionReducer, {
    filament: "",
    printer: "",
  })

  const minPrintTemp = (state.filament !== "") ? state.filament.printTemp[0] : 0
  const minBedTemp = (state.filament !== "") ? state.filament.bedTemp[0] : 0
  const setSelectedPrinter = (printer) => dispatch({type: SET_PRINTER, item: printer})
  const setSelectedFilament = (filament) => dispatch({type: SET_FILAMENT, item: filament})

  return [state, {setSelectedPrinter, setSelectedFilament, minPrintTemp, minBedTemp}]
}
