import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { SearchType } from "types"

interface Icontext {
  state: SearchType
  dispatch: Dispatch<Iaction>
}
interface Iprops {
  children: ReactNode
}
interface Iaction {
  type: "PAGE_UP" | "PAGE_DOWN"
}

const InitialSearch = {
  page: 1,
}

function reducer(state: SearchType, action: Iaction) {
  switch (action.type) {
    case "PAGE_UP":
      return { ...state, page: state.page + 1 }
    case "PAGE_DOWN":
      return { ...state, page: state.page - 1 }
    default:
      return state
  }
}

export const SearchContext = createContext<Icontext>({
  state: InitialSearch,
  dispatch: () => null,
})

export default function SearchProvider({ children }: Iprops) {
  const [state, dispatch] = useReducer(reducer, InitialSearch)

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  )
}
