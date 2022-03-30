import './djxzHeader.scss'

const DJXZHeader = () => {
    const searchTabs = [
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' },
        { 'name': '动作游戏', 'type': 'A' }
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
                            return <li key={index}><a href='#'>{item.name}</a></li>
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
            <div className="gameType">
                <span>游戏分类</span>
            </div>
        </div>
    )
}

export default DJXZHeader