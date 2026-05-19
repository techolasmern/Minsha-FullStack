const uploadFile = async (request, response) => {
    try {
        return response.status(200).send({
            message: "File uploaded successfully",
            data: request.file
        })
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal server error"
        });
    }
}

export default {
    uploadFile
}