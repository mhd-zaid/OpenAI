export default class ApiResponse {
    constructor(success, data=null, message=null, errors=null){
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}