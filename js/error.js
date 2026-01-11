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

// function login(password) {
//   if (password !== "secret") {
//     throw new LoginErr("Invalid credentials", {
//       code: "INVALID_PASSWORD",
//       status: 403
//     });
//   }
// }

// try {
//   login("1234");
// } catch (err) {
//   if (err instanceof LoginErr) {
//     console.log(err.name);     
//     console.log(err.message);  
//     console.log(err.code);    
//     console.log(err.status);  
//   }
// }