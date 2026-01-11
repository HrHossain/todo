export class LoginErr extends Error{
   
    constructor(message, options = {}){
        super(message)
        this.code = options.code ?? "LOGIN_ERROR"
        this.status = options.status ?? "401"
    }
    static customError(message , options){
        throw new LoginErr(message , options)
    }
}

