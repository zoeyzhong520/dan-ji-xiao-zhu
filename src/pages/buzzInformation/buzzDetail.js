import './buzzDetail.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { NavLink } from 'react-router-dom'
import { djxzAllArticles, djxzQueryWithID } from '../common/request'
import { useDangerouslySetInnerHTML } from '../common/common'
import { useEffect, useState } from 'react'
import { useQuery } from '../hooks/useQuery'

const BuzzDetail = () => {

    const query = useQuery()

    const [data, setData] = useState({
        image: '',
        content: '',
        source: '',
        description: '',
        title: '',
        createdAt: ''
    })
    useEffect(() => {
        const http = () => {
            djxzQueryWithID(query.get('id'), 'CGP_PopularArticles').then(data => {
                setData(data)

                let imgTitleCongigs = [
                    { title: data.title ? data.title : '暂无', type: 'title' },
                    { title: `简要介绍：${data.description ? `${data.description}...` : '暂无'}`, type: 'description' },
                    { title: `创建时间：${data.createdAt ? data.createdAt : '暂无'}`, type: 'createdAt' },
                    { title: `内容来源：${data.source ? data.source : '暂无'}`, type: 'source', href: data.source ? data.source : '' },
                ]
                setImgTitleCongigs(imgTitleCongigs)
            })
        }
        http()
    }, [])

    const [imgTitleCongigs, setImgTitleCongigs] = useState([{}])

    const [moreData, setMoreData] = useState([{}, {}, {}])
    useEffect(() => {
        if (data.createdAt.length > 0) {
            getMore()
        }
    }, [data])

    // 展开更多
    const [morePage, setMorePage] = useState(0)
    useEffect(() => {
        if (morePage > 0) {
            getMore()
        }
    }, [morePage])

    const loadMore = () => {
        let tmpMorePage = morePage
        tmpMorePage++
        setMorePage(tmpMorePage)
    }

    const getMore = () => {
        djxzAllArticles(morePage, true, false, 3).then(list => {
            let tmpMoreData = [...moreData]
            if (morePage === 0) {
                tmpMoreData = list
            } else {
                tmpMoreData = tmpMoreData.concat(list)
            }
            setMoreData(tmpMoreData)
        })
    }


    return (
        <div className="buzzDetail_page">
            {/* 头部 */}
            <header><DJXZHeader navTitle="热评资讯" /></header>

            {/* 版心 */}
            <div className="main">
                <div className="main_top_bottom">
                    <div className="main_top">
                        {/* 面包屑 */}
                        <div className="location">当前位置：
                            <NavLink to="/">首页{' > '}</NavLink>
                            <NavLink to="/buzzInformation">{data.title}</NavLink>
                        </div>

                        {/* 图片、标题、资源地址 */}
                        <div className="imgTitle">
                            <div className="imgTitle_l">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="imgTitle_r">
                                <ul>
                                    {imgTitleCongigs.map((item, index) => {
                                        return <li key={item.type}>
                                            {item.type !== 'source' ? <p>{item.title}</p>
                                                : <a href={item.href} target="_blank">{item.title}</a>}
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 详情介绍 */}
                    <div className="main_bottom">
                        <div className="main_bottom_section">
                            <p>资讯详情</p>
                        </div>
                        <div className="main_bottom_content">
                            {/* 资讯标题 */}
                            {data.title && data.title.length > 0 ? <div className="game_title">
                                <p>{data.title}</p>
                            </div> : null}

                            {/* 简要介绍 */}
                            {data.description && data.description.length > 0 ? <div className="game_desc">
                                <p className="titleL">简要介绍</p>
                                <p>{`${data.description}...`}</p>
                            </div> : null}

                            {/* 资讯内容 */}
                            <div className="buzz_content">
                                <p className="titleL">资讯内容</p>
                                <div>{useDangerouslySetInnerHTML(data.content)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 看了又看 */}
                <div className="main_right">
                    <div className="main_right_section">
                        <div className="l"><p>看了又看</p></div>
                        <div className="r">
                            <NavLink to="/buzzInformation" target="_blank">{`更多>>`}</NavLink>
                        </div>
                    </div>

                    {/* 列表 */}
                    <div className="main_right_list">
                        <ul>
                            {moreData.map((item, index) => {
                                return <li key={index}>
                                    <NavLink to={`/buzzDetail?id=${item.objectId}`}
                                        target="_parent">
                                        <img src={item.image} alt="" />
                                        <p>{item.title}</p>
                                    </NavLink></li>
                            })}
                        </ul>
                    </div>

                    {/* 展开更多 */}
                    <div className="main_right_more" onClick={() => loadMore()}>
                        <p>展开更多</p>
                    </div>
                </div>
            </div>

            {/* 底部 */}
            <footer><DJXZFooter /></footer>
        </div>
    )
}

export default BuzzDetail