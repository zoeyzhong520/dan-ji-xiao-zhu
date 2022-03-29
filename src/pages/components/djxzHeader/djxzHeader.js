import './djxzHeader.scss'

const DJXZHeader = () => {
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
            <div className="c">123</div>
        </div>
    )
}

export default DJXZHeader