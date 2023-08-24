<template>
    <div class="login-form">
      <h3>Welcome Back, <span>Test!</span></h3>
      <p class="one">It’s a beautiful day to save lives!</p>
        <div class="all-input">
                        <form action="javascript:void(0)" class="row" method="post">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="input-container">
                              <p>Email</p>
                                <label for="email" class="font-weight-bold"></label>
                                <input type="email" v-model="auth.email" name="email" id="email" class="form-control" required>
                            </div>
                            <div class="input-container">
                              <p>Password</p>
                                <label for="password" class="font-weight-bold"></label>
                                <input type="password" v-model="auth.password" name="password" id="password" class="form-control" required>
                            </div>
                            <div class="remember-forgot">
                            <label>
                            <input type="checkbox"> Remember me
                             </label>
                             <a href="#">Forgot Password?</a>
                             </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" @click="login" class="btn-login">
                                    {{ processing ? "Please wait" : "Login" }}
                                </button>
                            </div>
                          

                    </form>
                  </div>          
                       </div>     
            </template>

<script>
import { mapActions } from 'pinia'
import apiClient from '@/api.js'
export default {
    name: "login-components",
    data() {
        return {
            auth: {
                email: "",
                password: ""
            },
            validationErrors: {},
            processing: false
        }
    },
    methods: {
        ...mapActions({
            signIn: '/login'
        }),
        async login() {
            this.processing = true
            try {
               await apiClient.login('/sanctum/csrf-cookie')
              await apiClient.login('/login', this.auth)
                this.signIn()
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.validationErrors = error.response.data.errors
                } else {
                    this.validationErrors = {}
                    alert(error.response ? error.response.data.message : "An error occurred.")
                }
            } finally {
                this.processing = false
            }
        },
    }
}
</script>


<style scoped>
  
.all-input{
  margin-top: 150px;
  padding: 87px;
  position:absolute;
}

.login-form span{
  color: #F9BA33;
}
.login-form h3{
  position: absolute;
  margin-bottom: 280px;
  padding: 80px; 
}
.one{
  position: absolute;
  margin-bottom: 200px;
  margin-left: 80px;
  
  
}



.login-form {
  width: 50%;
  padding: 0px 0px 120px 20px;
  display: flex;
  align-items: center;
}
.input-container input{
  position: inherit;
    margin-bottom: 50px;
          
}

.input-container p{
  position: relative;
  font-weight: 600;
  margin-top: -30px;
}


.input-container input[type="email"],
.input-container input[type="password"] {
    border-radius: 8px; 
    border: 1px solid #ccc; 
    padding: 11px; 
    width:460px;
    
}

.btn-login{
  position: fixed;
  background-color: #009DA4;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 36%;
  padding: 7px;
  top: 435px;
  color: #fff;
  font-size: medium;
  
}

  .remember-forgot {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -25px;
    margin-left: -1px;
    color: #000;
  }
  .remember-forgot a{
    color:#009DA4;
    margin-left: 230px;
    text-decoration: none;
  }
  </style> 
  