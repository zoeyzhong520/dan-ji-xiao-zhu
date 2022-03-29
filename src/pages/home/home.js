import './home.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'

const Home = () => {

    // 

    return (
        <div className='home_page'>
            <header><DJXZHeader /></header> 
            
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default Home