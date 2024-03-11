const useDelete = () => {
    const initiateDelete = async(url) => {
        try {
            const deleteRequest = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await deleteRequest.json()
            if(deleteRequest.status === 200) {
                return response
            }
            else {
                return response
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return { initiateDelete }
    
}
 
export default useDelete;