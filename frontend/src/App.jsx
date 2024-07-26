import { ToastContainer } from 'react-toastify'
import Router from './routes'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { getUser } from './store/features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
function App() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [])
    return (
        <>
            <BrowserRouter>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={6}
                />
                <Router />
            </BrowserRouter>
        </>
    )
}

export default App
