const success = (res, data) => {    
    res.status(200).send(data);
}

const error = (res, message) => {
    res.status(404).send(message);
}

export { success, error };