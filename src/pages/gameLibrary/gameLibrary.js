import './gameLibrary.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { djxzAllGames, djxcQueryGames, djxzQueryGamesCount } from '../common/request'
import { gameTypesList } from '../common/common'
import { useQuery } from '../hooks/useQuery'

const GameLibrary = () => {

    const query = useQuery() // useQuery是自定义Hook

    // 数据源
    const [data, setData] = useState([{}, {}, {}, {}, {}, {}])
    useEffect(() => {
        const api = async () => {
            await djxzQueryGamesCount(query.get('type')).then(gamesCount => {
                setGamesCount(gamesCount)
            })
            http()
        }
        api()
    }, [])

    const [gamesCount, setGamesCount] = useState(0)

    const [filterDict, setFilterDict] = useState({
        page: 0,
        updatedAt: false,
        readCount: false,
        title: true,
        limit: 24
    })

    const [filterBarTitles, setFilterBarTitles] = useState([
        { title: '名称', type: 'title', isSelect: true },
        { title: '更新时间', type: 'updatedAt', isSelect: false },
        { title: '人气', type: 'readCount', isSelect: false }
    ])

    const [typesList, setTypesList] = useState([...gameTypesList])
    useEffect(() => {
        // 数组尾部追加一个 更多
        let list = gameTypesList.slice(1, 10)
        list.push({
            title: '更多类型', type: 'MORE'
        })
        setTypesList(list)

        console.log(query.get('type'));
    }, [])

    // 点击筛选Bar
    const filterBarClick = (idx) => {
        let tmpFilterBarTitles = [...filterBarTitles]
        tmpFilterBarTitles.map((item, index) => {
            item.isSelect = index === idx
        })
        setFilterBarTitles(tmpFilterBarTitles)

        // 更新filterDict
        filterDict.page = 0
        filterDict.updatedAt = filterBarTitles[idx].type === 'updatedAt'
        filterDict.readCount = filterBarTitles[idx].type === 'readCount'
        filterDict.title = filterBarTitles[idx].type === 'title'
        setFilterDict(filterDict)
        http()
    }

    // 上一页
    const previous = () => {
        if (filterDict.page === 0) {
            return
        }
        filterDict.page > 0 ? filterDict.page = filterDict.page - 1 : filterDict.page = 0
        setFilterDict(filterDict)
        http()
    }

    // 下一页
    const next = () => {
        if (filterDict.page + 1 >= Math.ceil(gamesCount / filterDict.limit)) {
            return
        }
        filterDict.page = filterDict.page + 1
        setFilterDict(filterDict)
        http()
    }

    const http = async () => {
        if (query.get('type')) {
            await djxcQueryGames(query.get('type'), filterDict.page, filterDict.updatedAt, filterDict.readCount, filterDict.title, filterDict.limit).then(games => {
                setData(games)
            })
        } else {
            await djxzAllGames(filterDict.page, filterDict.updatedAt, filterDict.readCount, filterDict.title, filterDict.limit).then(games => {
                setData(games)
            })
        }
    }


    return (
        <div className="gameLibrary_page">
            {/* 头部 */}
            <header><DJXZHeader navTitle="游戏库" /></header>

            {/* 版心 */}
            <div className="main">
                <div className="main_left">
                    <div className="main_left_type_list">
                        <ul>
                            {typesList.map((item, index) => {
                                return <li key={item.type}>
                                    <NavLink to={item.type !== 'MORE' ? `/gameLibrary?type=${item.type}` : '/gameLibrary'}
                                        target={item.type !== 'MORE' ? '_blank' : ''}
                                        className={query.get('type') === item.type ? 'type_select_class' : ''}>{item.title}
                                    </NavLink>
                                </li>
                            })}
                        </ul>
                    </div>

                    {/* 更多类型 */}
                    <div className="more">
                        <ul>
                            {gameTypesList.slice(11, 19).map((item, idx) => {
                                return <li key={item.title}>
                                    <NavLink
                                        to={`/gameLibrary?type=${item.type}`}
                                        target="_blank"
                                        className={query.get('type') === item.type ? 'type_select_class' : ''}>{item.title}
                                    </NavLink>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className="main_right">
                    {/* 面包屑 */}
                    <div className="location">当前位置：
                        <NavLink to="/">首页{' > '}</NavLink>
                        <NavLink to="/gameLibrary">游戏库</NavLink>
                    </div>

                    {/* 筛选条件和列表 */}
                    <div className="main_right_body">
                        {/* 标题 全部游戏库游戏 */}
                        <div className="section">
                            <div className="l"><p>全部游戏库游戏</p></div>

                            {/* 搜索框 */}
                            <input type="text" placeholder="当前条件下搜索" />
                            <div className="search_icon"></div>
                        </div>

                        {/* 筛选：名称、更新时间、人气、页码 */}
                        <div className="filter_bar">
                            <div className="filter_bar_left">
                                {filterBarTitles.map((item, index) => {
                                    return <div key={index} onClick={() => filterBarClick(index)}>
                                        <p className={item.isSelect ? 'select_class' : ''}>{item.title}</p>
                                    </div>
                                })}
                            </div>

                            {/* 页码 */}
                            <div className="filter_bar_right">
                                <button className="previous" onClick={() => previous()}>{'<'}</button>
                                <p>{`${filterDict.page + 1} / ${Math.ceil(gamesCount / filterDict.limit)}`}</p>
                                <button className="next" onClick={() => next()}>{'>'}</button>
                            </div>
                        </div>

                        {/* 游戏库列表 */}
                        <div className="recommend_main">
                            <ul>
                                {data.map((item, index) => {
                                    return <li key={item.title}>
                                        <NavLink to={`/gameDetail?id=${item.objectId}`} target="_blank">
                                            <img src={item.image} alt="" />
                                            <p>{item.title}</p>
                                        </NavLink>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default GameLibrary