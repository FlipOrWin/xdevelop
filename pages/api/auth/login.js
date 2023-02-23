export default function loginHandler(req, res) {
    console.log(req.body, "reqbody")
    return res.json('login route')
}