import React from 'react'
import { Empty, Button } from 'antd';

function EmptyStatus() {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{height: 60}}
        description={
          <a>暂无数据</a>
        }
      >
        {/* <Button type="primary">立刻添加</Button> */}
      </Empty>
    )
}

export default EmptyStatus
