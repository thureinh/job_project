import { Octokit } from 'octokit'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
const octokit = new Octokit()

async function loginRoute(req, res) {
    const { username } = await req.body
    try {
        const { data: { login, avatar_url } } = await octokit.rest.users.getByUsername({ username })

        const config = {
            method: 'get',
            url: 'http://backend_app:8000/sanctum/csrf-cookie',
        };

        await axios(config)
            .then(function (response) {
                console.log("successfully connnected", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        const user = { isLoggedIn: true, login, avatarUrl: avatar_url }
        req.session.user = user
        await req.session.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)