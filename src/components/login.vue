<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form label-width="0px" class="login_form" :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-clock"  v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                 </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           loginForm:{
                username: 'admin',
                password: '123456'
            },

            loginFormRules:{
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {type: 'string', max: 6, min: 3, message: '用户名在3~6个字之间', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {type: 'string', max: 15, min: 6, message: '用户名在6~15个字之间', trigger: 'blur'}
                ]
            }
        }
    },

    methods: {
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },

        login(){
            this.$refs.loginFormRef.validate(async valid => {
                if(!valid){
                    return;
                }
                const {data : res} = await this.$http.post("login", this.loginForm);
                if(res.meta.status != 200){
                    //return console.log("登录失败");
                    return this.$message.error("登录失败");
                    
                }

                //1 将登陆成功后的token保存在客户端的sessionStorage中
                //    1.1 项目中出现了登陆之外的其他api接口，必须在登陆之后才能访问
                //    1.2 token之应用在当前网站打开期间生效，所以将token保存在sessionStorage中
                window.sessionStorage.setItem("token", res.data.token);
                
                //2 通过你编程式导航跳转到后台主页，路由是 /home
                //return this.$message.success("登录成功");
                this.$router.push('/home')
            });
        }
    }
}

</script>

<style scoped lang="less">
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}


.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
}

.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform:translate(-50%, -50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>