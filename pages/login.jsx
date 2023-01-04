import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const router = useRouter()
    const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(data.email, data.password)
            router.push('/painel')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div
            style={{
                margin: 'auto',
            }}
        >
            <Navbar/>
            <h1 className="text-center my-3 ">Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        value={data.email}
                        required
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password}
                        required
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login