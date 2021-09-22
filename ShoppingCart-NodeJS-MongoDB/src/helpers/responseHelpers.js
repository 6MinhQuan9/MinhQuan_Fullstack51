module.exports.successapi = async (res, message, statusCode = 200, data = []) => {
    res.writeHead(statusCode, {
        "Content-type": "application/json",
    });

    res.write(
        JSON.stringify({
            statusCode: statusCode,
            data: data,
            message: message,
            statusMessage: "Success"
        })
    );

    res.end();
};

//send error response

module.exports.error = async (res, message, statusCode = 500, data = []) => {
    res.writeHead(statusCode, {
        "Content-type": "application/json",
    });
    res.write(
        JSON.stringify({
            statusCode: statusCode,
            data: data,
            message: message,
            statusMessage: "Error"
        })
    );
    
    res.end();
};