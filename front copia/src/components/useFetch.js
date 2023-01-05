import { useEffect, useState } from "react";
import axios from 'axios';

function useFetch(url) {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(url).then(response => {
            setItems(response.data)
        }).catch(err => console.log(err))
    }, [url]);

    return { items }
}

export default useFetch;