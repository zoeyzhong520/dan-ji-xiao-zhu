import './djxzHeader.scss'
import { gameTypesList } from '../../common/common'
import { useEffect, useState } from 'react'

const DJXZHeader = () => {

    const [isGameType, setGameType] = useState(true)
    const [isQRCode, setQRCode] = useState(false)
    const [typesList, setTypesList] = useState([])
    useEffect(() => {
        // 数组尾部追加一个 更多
        let list = gameTypesList.slice(1, 10)
        list.push({
            title: '更多类型', type: ''
        })
        setTypesList(list)
    }, [])

    return (
        <div className='djxzHeader_page'>
            {/* 注册、登录 */}
            <header>
                <div className="l"><a href='#'>请登录</a></div>
                <div className="r">
                    <ul>
                        <li>
                            <a href='#'>
                                小程序码
                                {/* 小程序码 */}
                                <div className="qrCode">
                                    <div className="contain">
                                        {/* 小三角 */}
                                        <div className="triangle"></div>
                                        <img src={require('../../common/static/mpCode.jpg')} alt="" />
                                        <p>查看小程序</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li><a href='#'>帮助中心</a></li>
                        <li><a href='#'>建议反馈</a></li>
                    </ul>
                </div>
            </header>

            {/* logo、搜索框 */}
            <div className="middle">
                <div className='logoTitle'>
                    <img src={require('./static/logo_pc.png')} alt="logo" />
                </div>
                <div className='search'>
                    <input type="text" placeholder='搜索您想要的游戏 如 侠盗飞车 或 仙剑奇侠传' />
                    <ul>
                        {gameTypesList.slice(3, 11).map((item, index) => {
                            return <li key={index}><a href='#'>{item.title}</a></li>
                        })}
                    </ul>
                </div>
            </div>

            {/* 首页 游戏库 热门文章 */}
            <div className="nav">
                <ul>
                    <li><a href="#">首页</a></li>
                    <li><a href="#">游戏库</a></li>
                    <li><a href="#">热门文章</a></li>
                </ul>
            </div>

            {/* 全部游戏分类 */}
            <div className="game_type">
                <div className="game_type_child">
                    <p onClick={() => { setGameType(!isGameType) }}>全部游戏分类</p>
                    <div
                        style={{ display: !isGameType ? 'none' : 'block' }}
                        className="game_type_child_list">
                        <ul>
                            {typesList.map((item, index) => {
                                return <li key={item.type}>
                                    <a href='#'>
                                        {item.title}

                                        {/* 更多游戏类型 */}
                                        <div className="more">
                                            <ul>
                                                {gameTypesList.slice(11, 19).map((item, index) => {
                                                    return <li key={item.title}>
                                                        <a href='#'>{item.title}</a>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    </a>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DJXZHeader