import './djxzFooter.scss'

const DJXZFooter = () => {
    return (
        <div className='djxzFooter_page'>
            {/* 标签 */}
            <div className='t'>
                <ul>
                    <li><a href="#">首页</a></li>
                    <li><a href="#">关于我们</a></li>
                    <li><a href="#">编辑招募</a></li>
                    <li><a href="#">商务合作</a></li>
                    <li><a href="#">使用条款</a></li>
                    <li><a href="#">版权声明</a></li>
                </ul>
            </div>

            {/* 友情链接 */}
            <div className="m"><a href="#">友情链接：游迅网</a></div>

            {/* 备注 */}
            <div className="b">
                <p>©单机小助 All Rights Reserved</p>
            </div>
        </div>
    )
}

export default DJXZFooter