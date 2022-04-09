import './gameDetail.scss'
import DJXZHeader from '../components/djxzHeader/djxzHeader'
import DJXZFooter from '../components/djxzFooter/djxzFooter'
import { NavLink } from 'react-router-dom'
import { djxzQueryWithID, djxcQueryGames, djxzAddReadCount } from '../common/request'
import { useDangerouslySetInnerHTML, gameTypesList } from '../common/common'
import { useEffect, useState } from 'react'
import { useQuery } from '../hooks/useQuery'

const GameDetail = () => {

    const query = useQuery()

    const [data, setData] = useState({
        videoPath: '',
        image: '',
        requirements: '',
        baiduUrl: '',
        tyUrl: '',
        type: '',
        readCount: 0,
        resources: '',
        description: '',
        title: '',
        createdAt: '',
        imageList: []
    })
    useEffect(() => {
        const http = async () => {
            await djxzQueryWithID(query.get('id')).then(data => {
                setData(data)

                // 获取游戏类型
                let gameType = gameTypesList.filter(item => {
                    return item.type === data.type
                })

                let imgTitleCongigs = [
                    { title: data.title ? data.title : '暂无', type: 'title' },
                    { title: `创建时间：${data.createdAt ? data.createdAt : '暂无'}`, type: 'createdAt' },
                    { title: `天翼链接：${data.tyUrl ? data.tyUrl : '暂无'}`, type: 'tyUrl', href: data.tyUrl ? data.tyUrl : '' },
                    { title: `百度链接：${data.baiduUrl ? data.baiduUrl : '暂无'}`, type: 'baiduUrl', href: data.baiduUrl ? data.baiduUrl : '' },
                    { title: `阅览次数：${data.readCount ? `${data.readCount}次` : '暂无'}`, type: 'readCount' },
                    { title: `游戏类型：${data.type ? gameType[0].title : '暂无'}`, type: 'type' }
                ]
                setImgTitleCongigs(imgTitleCongigs)
            })

            await djxzAddReadCount(query.get('id')).then(res => {
                
            })
        }
        http()
    }, [])

    const [imgTitleCongigs, setImgTitleCongigs] = useState([{}])

    const [moreData, setMoreData] = useState([{}, {}, {}])
    useEffect(() => {
        if (data.type.length > 0) {
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
        djxcQueryGames(data.type, morePage, false, false, false, 3).then(list => {
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
        <div className="gameDetail_page">
            {/* 头部 */}
            <header><DJXZHeader navTitle="游戏库" /></header>

            {/* 版心 */}
            <div className="main">
                <div className="main_top_bottom">
                    <div className="main_top">
                        {/* 面包屑 */}
                        <div className="location">当前位置：
                            <NavLink to="/">首页{' > '}</NavLink>
                            <NavLink to="/gameLibrary">{data.title}</NavLink>
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
                                            {item.type !== 'tyUrl' && item.type !== 'baiduUrl'
                                                ? <p>{item.title}</p>
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
                            <p>游戏详情</p>
                        </div>
                        <div className="main_bottom_content">
                            {/* 游戏标题 */}
                            {data.title && data.title.length > 0 ? <div className="game_title">
                                <p>{data.title}</p>
                            </div> : null}

                            {/* 游戏视频 */}
                            {data.videoPath && data.videoPath.length > 0 ? <div className="game_video">
                                <p className="titleL">游戏视频</p>
                                <video src={data.videoPath} controls preload="auto"></video>
                            </div> : null}

                            {/* 简要介绍 */}
                            {data.description && data.description.length > 0 ? <div className="game_desc">
                                <p className="titleL">简要介绍</p>
                                <p>{data.description}</p>
                            </div> : null}

                            {/* 配置需求 */}
                            {data.requirements && data.requirements.length > 0 ? <div className="game_requirements">
                                <p className="titleL">配置需求</p>
                                <p>{data.requirements}</p>
                            </div> : null}

                            {/* 游戏截图 */}
                            {data.imageList && data.imageList.length > 0 ? <div className="game_imgs">
                                <p className="titleL">游戏截图</p>
                                <div>
                                    {data.imageList.map((item, index) => {
                                        return <img src={item} alt="" key={item}></img>
                                    })}
                                </div>
                            </div> : null}

                            {/* 游戏解压 */}
                            <div className="game_resources">
                                <p className="titleL">游戏解压</p>
                                <div>{useDangerouslySetInnerHTML(data.resources)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 看了又看 */}
                <div className="main_right">
                    <div className="main_right_section">
                        <div className="l"><p>看了又看</p></div>
                        <div className="r">
                            <NavLink to="/gameLibrary" target="_blank">{`更多>>`}</NavLink>
                        </div>
                    </div>

                    {/* 列表 */}
                    <div className="main_right_list">
                        <ul>
                            {moreData.map((item, index) => {
                                return <li key={index}>
                                    <NavLink to={`/gameDetail?id=${item.objectId}`}
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

export default GameDetail