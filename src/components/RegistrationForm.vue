 <template>
    <div class="registration-form">
      <h3>Welcome Back, <span>Test!</span></h3>
      <p class="one">It’s a beautiful day to save lives!</p>
      <div class="all-input-register">
        <form action="javascript:void(0)" @submit="register" class="row" method="post">
          <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
            <div class="alert alert-danger">
              <ul class="mb-0">
               <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                  </ul>
                   </div>
                      </div>
                        <div class="input-container">
                          <p>Name</p>
                           <label for="name" class="font-weight-bold"></label>
                             <input type="text" name="name" v-model="user.name" id="name" placeholder="Enter name" class="form-control" required>
                            </div>
                            <div class="input-container">
                              <p>Email</p>
                                <label for="email" class="font-weight-bold"></label>
                                <input type="text" name="email" v-model="user.email" id="email" placeholder="Enter Email" class="form-control" required>
                            </div>
                            <div class="input-container">
                              <p>Password</p>
                                <label for="password" class="font-weight-bold"></label>
                             
                                <input type="password" name="password" v-model="user.password" id="password" placeholder="Enter Password" class="form-control" required>
                            </div>
                            <div class="input-container">
                              <p>Confirm Password</p>
                                <label for="password_confirmation" class="font-weight-bold"></label>
                                <input type="password_confirmation" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" placeholder="Enter Password" class="form-control" required>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" class="btn-register">
                                    {{ processing ? "Submitting" : "Register" }}
                                </button>
                            </div>
                            <div class="option">
                                <label>Already have an account? <router-link :to="{name:'login'}">Login</router-link></label>
                            </div>
                     

        </form>
      </div>          
           </div>     
</template>
<script>
import apiClient from '@/api.js';
import { mapActions } from 'vuex';

export default {
  name: 'register-component',
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      validationErrors: {},
      processing: false
    };
  },
  methods: {
    ...mapActions({
      signIn: 'register'
    }),
    async register() {
      this.processing = true;
      try {
        await apiClient.post('/sanctum/csrf-cookie');
        await apiClient.post(this.user);
        this.validationErrors = {};
        this.signIn();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.validationErrors = error.response.data.errors;
        } else {
          this.validationErrors = {};
          alert(error.response ? error.response.data.message : "An error occurred.");
        }
      } finally {
        this.processing = false;
      }
    }
  }
};
</script>
<style scoped>
  
.all-input-register{
  margin-top: 290px;
  padding: 81px;
}

.registration-form span{
  color: #F9BA33;
}
.registration-form h3{
  position: absolute;
  margin-bottom: 350px;
  padding: 80px; 
}
.one{
  position: absolute;
  margin-bottom: 260px;
  margin-left: 80px;
  
  
}



.registration-form {
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

.input-container input[type="text"],
.input-container input[type="email"],
.input-container input[type="password"],
.input-container input[type='password_confirmation'] {
    border-radius: 8px; 
    border: 1px solid #ccc; 
    padding: 11px; 
    width:460px;
}

.btn-register{
  position: fixed;
  background-color: #009DA4;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 36%;
  padding: 7px;
  top: 520px;
  color: #fff;
  font-size: medium;
  
}
.option {
  position: relative;
  text-align: center;
  margin-top: 40px;
}




</style> 