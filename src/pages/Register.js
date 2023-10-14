import { useState, useEffect } from "react"
import { Logo, FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields")
      return
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }
    dispatch(registerUser({ email, password, name }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  return (
    <Wrapper className='full-page'>
      <form onSubmit={onSubmit} className='form'>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            labelText='name'
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          labelText='email'
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          labelText='password'
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}
          <button className='member-btn' type='button' onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
