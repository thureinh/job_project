import Main from '@/components/dashboard/Main'

function Home(props) {
    return (
        <Main {...props} />
    )
}
Home.layout = 'adminLayout'
export default Home