import { useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode"
import { useLocation } from "react-router-dom"
// import { AuthContext } from '../../Ap/p';

const usePost = (url) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    
    const paths = ['/signin', '/signup']

    const post = async(body) => {
        setLoading(true)
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            })
            const result = await response.json()
            console.log(result)
            // console.log(paths.includes(location.pathname))

            if(response.status !== 200) {
                setError(result.message)
                setLoading(false)
            }
            else {
                if(paths.includes(location.pathname)) {
                    const decodedToken = jwtDecode(result?.token)
                    console.log(decodedToken)
                    localStorage.setItem('user', result.token)
                }
                setLoading(false)
                return result
            }

        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
        finally {
            setError(null)
            setLoading(false)
        }
    }

    return { post, loading, error }
}

export default usePost