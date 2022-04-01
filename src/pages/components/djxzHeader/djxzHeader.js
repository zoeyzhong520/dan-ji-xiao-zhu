import './djxzHeader.scss'
import { gameTypesList } from '../../common/common'
import { useState } from 'react'

const DJXZHeader = () => {

    const [isGameType, setGameType] = useState(true)    

    const searchTabs = [
        { title: '角色扮演', type: 'C' },
        { title: '即时战略', type: 'I' },
        { title: '体育竞技', type: 'Q' },
        { title: '休闲益智', type: 'L' },
        { title: '射击游戏', type: 'B' },
        { title: '动作游戏', type: 'A' },
        { title: '赛车竞速', type: 'G' },
        { title: '动作冒险', type: 'D' }
    ]

    return (
        <div className='djxzHeader_page'>
            {/* 注册、登录 */}
            <header>
                <div className="l"><a href='#'>请登录</a></div>
                <div className="r">
                    <ul>
                        <li><a href='#'>小程序码</a></li>
                        <li><a href='#'>帮助中心</a></li>
                        <li><a href='#'>建议反馈</a></li>
                    </ul>
                </div>
            </header>

            {/* logo、搜索框 */}
            <div className="middle">
                <div className='logoTitle'>
                    <img src="" alt="logo" />
                    <h3>DJXZ</h3>
                </div>
                <div className='search'>
                    <input type="text" placeholder='搜索您想要的游戏 如 侠盗飞车 或 仙剑奇侠传' />
                    <ul>
                        {searchTabs.map((item, index) => {
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

            {/* 游戏分类 */}
            <div className="game_type">
                <div className="game_type_child">
                    <p onClick={() => { setGameType(!isGameType) }}>游戏分类</p>
                    <div
                        style={{ display: !isGameType ? 'none' : 'block' }}
                        className="game_type_child_list">
                        <ul>
                            {gameTypesList.map((item, index) => {
                                return <li key={item.type}><a href='#'>{item.title}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DJXZHeader