class apierror extends{
    constructor(statuscode,message="Error",errors=[],stack=""){
        super(message)
        this.statuscode = statuscode;
        this.message = message;
        this.data = null;
        this.success = statuscode<400;
        this.errors = errors;
    }
}
export default apierror;