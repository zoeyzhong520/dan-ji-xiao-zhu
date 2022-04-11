import './buzzInformation.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { djxzAllArticles, djxzQueryArticlesCount } from '../common/request'

const BuzzInformation = () => {

    // 数据源
    const [data, setData] = useState([{}, {}, {}, {}, {}, {}])
    useEffect(() => {
        const api = async () => {
            await djxzQueryArticlesCount().then(articlesCount => {
                setArticlesCount(articlesCount)
            })
            http()
        }
        api()
    }, [])

    const [articlesCount, setArticlesCount] = useState(0)

    const [filterDict, setFilterDict] = useState({
        page: 0,
        updatedAt: false,
        title: true,
        limit: 24
    })

    const [filterBarTitles, setFilterBarTitles] = useState([
        { title: '名称', type: 'title', isSelect: true },
        { title: '更新时间', type: 'updatedAt', isSelect: false }
    ])

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
        if (filterDict.page + 1 >= Math.ceil(articlesCount / filterDict.limit)) {
            return
        }
        filterDict.page = filterDict.page + 1
        setFilterDict(filterDict)
        http()
    }

    const http = async () => {
        await djxzAllArticles(filterDict.page, filterDict.updatedAt, filterDict.title, filterDict.limit).then(articles => {
            setData(articles)
        })
    }


    return (
        <div className="gameLibrary_page">
            {/* 头部 */}
            <header><DJXZHeader navTitle="热评资讯" /></header>

            {/* 版心 */}
            <div className="main">
                <div className="main_left"></div>

                <div className="main_right">
                    {/* 面包屑 */}
                    <div className="location">当前位置：
                        <NavLink to="/">首页{' > '}</NavLink>
                        <NavLink to="/buzzInformation">热评资讯</NavLink>
                    </div>

                    {/* 筛选条件和列表 */}
                    <div className="main_right_body">
                        {/* 标题 全部游戏库游戏 */}
                        <div className="section">
                            <div className="l"><p>全部热评资讯</p></div>
                        </div>

                        {/* 筛选：名称、更新时间、页码 */}
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
                                <p>{`${filterDict.page+1} / ${Math.ceil(articlesCount / filterDict.limit)}`}</p>
                                <button className="next" onClick={() => next()}>{'>'}</button>
                            </div>
                        </div>

                        {/* 热评资讯列表 */}
                        <div className="recommend_main">
                            <ul>
                                {data.map((item, index) => {
                                    return <li key={item.title}>
                                        <NavLink to={`/buzzDetail?id=${item.objectId}`} target="_blank">
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

export default BuzzInformation