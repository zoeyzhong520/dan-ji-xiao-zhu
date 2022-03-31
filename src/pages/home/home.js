import './home.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'

const Home = () => {
    return (
        <div className='home_page'>
            {/* 头部 */}
            <header><DJXZHeader /></header> 

            {/* 版心 */}
            <div className="main">
                {/* 广告位 */}
                <div className="ad">
                    <img src={require('./static/manik-rathee-a8YV2C3yBMk-unsplash.jpg')} alt="" />
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default Home