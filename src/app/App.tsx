import { RouterProvider } from "react-router-dom"
import { router } from "../shared/router/router"

const App = () => {
  return (
    <RouterProvider router={router} />
    // <div style={{
    //   width: '100%',
    //   minHeight: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'flex-start',
    //   paddingTop: '40px',
    //   paddingBottom: '40px',
    //   background: '#F3F4F6',
    // }}>
    //   <TestForm />
    // </div>
  )
}

export default App