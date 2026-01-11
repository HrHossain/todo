import { LoginErr } from "./error.js"
import { setItemLocalStorage } from "./utils.js"

class Login {
    constructor(){
         this.password = document.getElementById("password")
         this.username = document.getElementById("username")
         this.form = document.getElementById('loginForm')
         this.btn = document.getElementById('submit')
         this.btnText = document.getElementById("btnText");
        this.spinner = document.getElementById("spinner");
         this.form.addEventListener("submit",async (e)=>{
            e.preventDefault()
            await this.handleLogin()
         })
    }
    showSpinner(){
        this.spinner.classList.remove("hidden");
        this.btnText.textContent = "Loading...";
        this.btn.disabled = true;
    }
    hideSpinner() {
  this.spinner.classList.add("hidden");
  this.btnText.textContent = "Login";
  this.btn.disabled = false;
}
    async handleLogin() {
        this.showSpinner();
        try{
            
            const error = this.validate()
            if(!error){
                console.log(this.username.value,this.password.value)
                const res = await fetch('https://dummyjson.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.username.value,
                    password: this.password.value,
                    
                }),
                })

                if(!res.ok){
                    LoginErr.customError("network problem occured",{
                    code: "CHECK_NETWORK",
                    status:res.status,
                })
                }
                const user = await res.json()
                if(user){
                    setItemLocalStorage("login-user",user)
                    window.location.href = "http://127.0.0.1:5500/index.html"
                }
            }
            
        }catch(err){
            alert(err.message)
        }finally{
          this.hideSpinner(); 
        }
    
  }
  validate(){
    let username = this.username.value
    let password = this.password.value
    if(!username || !password){
        LoginErr.customError("Username and Password must need",{
            code: "EMPTY_FIELDS",
            status:401,
        })
    }
    if(username.trim().length === 0 ){
        LoginErr.customError("username must need !",{
            code:"USERNAME_INVALID",
            status:401,
        })
    }
    if(password.trim().length < 6){
        LoginErr.customError("password at least 6 characters!",{
            code:"PASSWORD_TOO_SHORT",
            status:401,
        })
    }
    return false
  }

}

new Login()

