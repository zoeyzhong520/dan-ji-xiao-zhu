import './home.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { gameTypesList } from '../common/common'
import { useState } from 'react'

const Home = () => {

    const [informationAnimate, setInformationAnimate] = useState(false)

    // 列表表头
    const mainListTitles = [
        { title: '推荐游戏', icon: './static/Thumb-Up.png' },
        { title: '人气游戏', icon: './static/Heart.png' },
        { title: '最新游戏', icon: './static/Hourglass.png' }
    ]

    return (
        <div className='home_page'>
            {/* 头部 */}
            <header><DJXZHeader /></header>

            {/* 版心 */}
            <div className="main">
                {/* 广告位 */}
                <div className="ad">
                    <img src={require('./static/BingWallpaper-2020-07-28.jpg')} alt="" />
                    {/* 小程序码 */}
                    <div className="mpCode">
                        <img src={require('../common/static/mpCode.jpg')} alt="" />
                        <p>扫一扫查看小程序<br/>把服务带在身边</p>
                    </div>
                </div>

                {/* 推荐游戏 人气游戏 最新游戏 */}
                <div>
                    {mainListTitles.map((item, index) => {
                        return <div className="recommend" key={item.title}>
                            <div className="recommend_title">
                                <div className='l'>
                                    <img src={require(`${item.icon}`)} alt="" />
                                    <p>{item.title}</p>
                                </div>
                                <a href='#'>更多{'>>'}</a>
                            </div>
                            <div className="recommend_main">
                                <ul style={{ width: gameTypesList.length * 390 }}>
                                    {gameTypesList.map((item, index) => {
                                        return <li key={item.title}>
                                            <img src="https://media.st.dl.pinyuncloud.com/steam/apps/428660/header.jpg?t=1604053729" alt="图片" />
                                            <p>飞向月球/Deliver Us The Moon 飞向月球/Deliver Us The Moon{index + 1}</p>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    })}
                </div>

                {/* 想要游戏 */}
                <div className="want">
                    <div className="child">
                        <div className="l">
                            <p className='en'>Want Game</p>
                            <p>想要游戏</p>
                        </div>
                        <div className="r">
                            <div>了解更多</div>
                        </div>
                    </div>
                </div>

                {/* 热评资讯 */}
                <div className="recommend">
                    <div className="recommend_title">
                        <div className='l'>
                            <img src={require('./static/Book-Open.png')} alt="" />
                            <p>热评资讯</p>
                        </div>
                        <a href='#'>更多{'>>'}</a>
                    </div>
                    <div className="information_main">
                        <div
                            onClick={() => { setInformationAnimate(true) }}
                            className="information_main_before">
                                <img src={require('../common/static/Arrow-Signle-Left.png')} alt="" />
                            </div>
                        <div
                            onClick={() => { setInformationAnimate(false) }}
                            className="information_main_after">
                                <img src={require('../common/static/Arrow-Signle-Right.png')} alt="" />
                            </div>
                        <ul style={{ animation: informationAnimate ? 'move 1s forwards' : 'moveBack 1s forwards' }}>
                            {['qaz', 'wsx', 'edc', 'rfv'].map((item, index) => {
                                return <li key={item}>
                                    <img src='http://img4.yxdimg.com/2021/4/27/452c1710-856f-4541-9aee-61f7c66ab263.jpg' alt=''></img>
                                    <p>《永劫无间》内测版评测：解决了冷兵器吃鸡的核心痛点</p>
                                    <p>《永劫无间》是一款吸纳了诸多武侠吃鸡游戏失败经验的作品，它通过飞索提供的超高机动性，很好地解决了玩家交战意愿低的问题。同时，出色的格斗机制，也让它显得颇具可玩性。</p>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                {/* 想要游戏 */}
                <div className="want" style={{ height: '140px' }}>
                    <div className="child">
                        <div className="l">
                            <p className='en' style={{ top: '10px' }}>Want Game</p>
                            <p>想要游戏</p>
                        </div>
                        <div className="r">
                            <div>了解更多</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default Home