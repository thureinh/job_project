import { Octokit } from 'octokit'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
const octokit = new Octokit()

async function loginRoute(req, res) {
    const data = await req.body
    try {
        // await axios.get('/sanctum/csrf-cookie').then((resp) => {
        //     console.log('Backend Successfully Connected')
        // })

        console.log('request make')
        await axios.get('/sanctum/csrf-cookie').then(async () => {
            console.log('another post request')
            const response = await axios.post('/login', data)
                .catch((error) => console.log(error.response.data.message))
            console.log('return from backend => ', response.data)
        })

        // const user = { isLoggedIn: true, login, avatarUrl: avatar_url }
        // req.session.user = user
        // await req.session.save()
        // res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)