import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
// const [data, setData] = useState(null)

const useFetch = (url) => {
    const location = useLocation()
    const fetchData = async() => {
        const response = await axios.get(url)

        if (response.status === 200) {
            return response.data
        }
    }

    const { data, loading, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchData
    })
    // setData(data)
    console.log(data)

    return { data, loading, error, isLoading }
}

export default useFetch