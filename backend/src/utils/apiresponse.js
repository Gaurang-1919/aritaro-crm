class apiresponse extends Error{
    constructor(statusCode,data,message){
        super(message),
        this.statusCode=statusCode,
        this.data=data,
        this.message=message
    };
};

export default apiresponse