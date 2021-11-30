const handleRequest = (fn) => async (request, response) => {
    try {
        await fn(request, response);
    } catch (error) {
        try {
            const aux = error;

            return response.status(aux.statusCode).json({ message: aux.message, statusCode: aux.statusCode });
        } catch (error) {
        }
        console.log(error);
        return response.status(500).json({
            statusCode: 500,
            message: "Algo salio mal"
        });
    }
}

module.exports=handleRequest;