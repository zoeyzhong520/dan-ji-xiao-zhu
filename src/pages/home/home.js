import './home.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { useEffect, useState } from 'react'
import { djxzAllGames, djxzAllArticles } from '../common/request'

const Home = () => {
    // 热评资讯动画显示状态
    const [informationAnimate, setInformationAnimate] = useState(false)

    // 列表表头
    const mainListTitles = [
        { title: '推荐游戏', icon: './static/Thumb-Up.png', key: 'recommendGames' },
        { title: '人气游戏', icon: './static/Heart.png', key: 'hotGames' },
        { title: '最新游戏', icon: './static/Hourglass.png', key: 'latestGames' }
    ]

    // 数据源
    const [data, setData] = useState({
        recommendGames: [{}, {}, {}, {}],
        hotGames: [{}, {}, {}, {}],
        latestGames: [{}, {}, {}, {}],
        articles: [{}, {}, {}, {}]
    })
    useEffect(() => {
        const http = async () => {
            let tmpData = { ...data }
            await djxzAllGames(1, false, true).then(recommendGames => {
                // 推荐游戏
                tmpData.recommendGames = recommendGames
            })
            await djxzAllGames(0, false, true).then(hotGames => {
                // 人气游戏
                tmpData.hotGames = hotGames
            })
            await djxzAllGames(0, true, false).then(latestGames => {
                // 最新游戏
                tmpData.latestGames = latestGames
            })
            await djxzAllArticles().then(articles => {
                // 热评资讯
                tmpData.articles = articles
            })
            setData(tmpData)
        }
        http()
    }, [])


    return (
        <div className='home_page'>
            {/* 头部 */}
            <header><DJXZHeader navTitle='首页' /></header>

            {/* 版心 */}
            <div className="main">
                {/* 广告位 */}
                <div className="ad">
                    <img src={require('./static/BingWallpaper-2020-07-28.jpg')} alt="" />
                    {/* 小程序码 */}
                    <div className="mpCode">
                        <img src={require('../common/static/mpCode.jpg')} alt="" />
                        <p>扫一扫查看小程序<br />把服务带在身边</p>
                    </div>
                </div>

                {/* 推荐游戏 人气游戏 最新游戏 */}
                <div>
                    {mainListTitles.map((item, index) => {
                        return <div className="recommend" key={index}>
                            <div className="recommend_title">
                                <div className='l'>
                                    <img src={require(`${item.icon}`)} alt="" />
                                    <p>{item.title}</p>
                                </div>
                                <a href='#'>更多{'>>'}</a>
                            </div>

                            <div className="recommend_main">
                                <ul style={{ width: data[item.key].length * 390 }}>
                                    {data[item.key].map((itm, idx) => {
                                        return <li key={itm.title}>
                                            <img src={itm.image} alt="" />
                                            <p>{itm.title}</p>
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
                            {data.articles.map((item, index) => {
                                return <li key={item.content}>
                                    <img src={item.image} alt=''></img>
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
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