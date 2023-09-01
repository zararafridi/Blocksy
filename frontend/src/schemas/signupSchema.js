import * as yup from "yup";



const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const erroMessage = "use lowercase, uppercase and digits";


const signupSchema = yup.object().shape({
    name: yup.string().max(30).required('name is required'),
    username: yup.string().min(5).max(30).required("username is required"),
    email: yup.string().email("enter a vild email").required("email is requires"),
    password: yup.string().min(8).max(25).matches(passwordPattern,{message:erroMessage}).required("password is require"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'password must match').required('password is required')
});


export default signupSchema;