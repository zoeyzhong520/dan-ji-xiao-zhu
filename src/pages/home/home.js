import './home.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { gameTypesList } from '../common/common'

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

                {/* 推荐游戏 */}
                <div className="recommend">
                    <div className="recommend_title">
                        <p>推荐游戏</p>
                        <a href='#'>更多{'>>'}</a>
                    </div>
                    <div className="recommend_main">
                        <ul style={{width: gameTypesList.length*390}}>
                            {gameTypesList.map((item, index) => {
                                return <li>
                                    <img src="https://media.st.dl.pinyuncloud.com/steam/apps/428660/header.jpg?t=1604053729" alt="图片" />
                                    <p>飞向月球/Deliver Us The Moon 飞向月球/Deliver Us The Moon{index+1}</p> 
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                {/* 人气游戏 */}
                <div className="recommend">
                    <div className="recommend_title">
                        <p>人气游戏</p>
                        <a href='#'>更多{'>>'}</a>
                    </div>
                    <div className="recommend_main">
                        <ul style={{width: gameTypesList.length*390}}>
                            {gameTypesList.map((item, index) => {
                                return <li>
                                    <img src="https://media.st.dl.pinyuncloud.com/steam/apps/428660/header.jpg?t=1604053729" alt="图片" />
                                    <p>飞向月球/Deliver Us The Moon 飞向月球/Deliver Us The Moon{index+1}</p> 
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                {/* 最新游戏 */}
                <div className="recommend">
                    <div className="recommend_title">
                        <p>最新游戏</p>
                        <a href='#'>更多{'>>'}</a>
                    </div>
                    <div className="recommend_main">
                        <ul style={{width: gameTypesList.length*390}}>
                            {gameTypesList.map((item, index) => {
                                return <li>
                                    <img src="https://media.st.dl.pinyuncloud.com/steam/apps/428660/header.jpg?t=1604053729" alt="图片" />
                                    <p>飞向月球/Deliver Us The Moon 飞向月球/Deliver Us The Moon{index+1}</p> 
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default Home