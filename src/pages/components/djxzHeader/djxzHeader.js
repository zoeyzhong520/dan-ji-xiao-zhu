import './djxzHeader.scss'
import { gameTypesList } from '../../common/common'
import { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { djxzAllGamesTitleID, fuzzyQuery } from '../../common/request'

let isOnComposition = false
const DJXZHeader = (params) => {

    const navigate = useNavigate()

    // 导航标题数组：首页、游戏库、热门文章
    const navTitles = [
        { title: '首页', path: '/' },
        { title: '游戏库', path: '/gameLibrary' },
        { title: '热评资讯', path: '/buzzInformation' }
    ]

    const [isGameType, setGameType] = useState(params.navTitle === '首页')
    const [typesList, setTypesList] = useState([])
    useEffect(() => {
        // 数组尾部追加一个 更多
        let list = gameTypesList.slice(1, 10)
        list.push({
            title: '更多类型', type: 'MORE'
        })
        setTypesList(list)

        const http = () => {
            djxzAllGamesTitleID().then(res => {

            })
        }
        http()
    }, [])

    const [searchRes, setSearchRes] = useState([{}])

    // 监听搜索框文本输入
    const inputChange = (e) => {
        let keyWord = e.target.value

        if (keyWord.length === 0 || isOnComposition) {
            setSearchRes([{}])
            return
        }

        let tmpSearchRes = [...searchRes]
        tmpSearchRes = fuzzyQuery(keyWord)
        setSearchRes(tmpSearchRes)
    }

    const handleComposition = (e) => {
        console.log(e.type);

        if (e.type === 'compositionend') {
            isOnComposition = false
            if (!isOnComposition) {
                inputChange(e)
            }
        } else {
            isOnComposition = true
        }
    }


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
                    <input
                        type="text" name="search"
                        placeholder='搜索您想要的游戏 如 侠盗飞车 或 仙剑奇侠传'
                        autoComplete="off"
                        onChange={(e) => { inputChange(e) }}
                        onCompositionStart={(e) => handleComposition(e)}
                        onCompositionUpdate={(e) => handleComposition(e)}
                        onCompositionEnd={(e) => handleComposition(e)} />
                    <ul>
                        {gameTypesList.slice(3, 11).map((item, index) => {
                            return <li key={item.title}>
                                <NavLink to={`/gameLibrary?type=${item.type}`}
                                    target="_blank">{item.title}
                                </NavLink>
                            </li>
                        })}
                    </ul>
                </div>

                {/* 搜索结果 */}
                <div
                    className="search_result"
                    style={{ display: searchRes.length > 0 ? 'block' : 'none' }}>
                    <ul>
                        {searchRes.map((item, index) => {
                            return <li key={index}>
                                <NavLink
                                    to={`/gameDetail?id=${item.objectId}`}
                                    target="_blank">{item.title}
                                </NavLink></li>
                        })}
                    </ul>
                </div>
            </div>

            {/* 首页 游戏库 热门文章 */}
            <div className="nav">
                <ul>
                    {navTitles.map((item, index) => {
                        return <li key={item.title}>
                            <NavLink to={item.path} className={params.navTitle === item.title ? 'nav_select' : ''}
                                target={params.navTitle === item.title ? '' : '_blank'}>{item.title}</NavLink>
                        </li>
                    })}
                </ul>
            </div>

            {/* 全部游戏分类 */}
            <div className="game_type">
                <div className="game_type_child">
                    <p onClick={() => { setGameType(!isGameType) }}>全部游戏分类</p>
                    <div className="game_type_child_list"
                        style={{ display: !isGameType ? 'none' : 'block' }}>
                        <ul>
                            {typesList.map((item, index) => {
                                return <li key={item.type}>
                                    <NavLink to={item.type !== 'MORE' ? `/gameLibrary?type=${item.type}` : '/gameLibrary'}
                                        target={item.type !== 'MORE' ? '_blank' : ''}>
                                        {item.title}
                                    </NavLink>

                                    {/* 更多游戏类型 */}
                                    <div className="more">
                                        <ul>
                                            {gameTypesList.slice(11, 19).map((itm, idx) => {
                                                return <li key={itm.title}>
                                                    <NavLink to={`/gameLibrary?type=${itm.type}`}
                                                        target="_blank">{itm.title}</NavLink>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
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