import './gameLibrary.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { NavLink } from 'react-router-dom'

const GameLibrary = () => {
    return (
        <div className="gameLibrary_page">
            {/* 头部 */}
            <header><DJXZHeader navTitle="游戏库" /></header>

            {/* 版心 */}
            <div className="main">
                {/* 面包屑 */}
                <div className="location">当前位置：
                    <NavLink to="/">首页{'>'}</NavLink>
                    <NavLink to="/gameLibrary">游戏库</NavLink>
                </div>

                {/* 筛选条件和列表 */}
                <div className="b">
                    {/* 标题 */}
                    <div className="section">
                        <div className="l"><p>全部游戏库游戏</p></div>
                    </div>
                    123
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default GameLibrary