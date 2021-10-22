import React, { useState, useEffect } from 'react'
import './mainModal.styl'
import Modal from 'antd/es/modal'
import 'antd/es/modal/style/index.css'
import FriendTab from '../../../popup/pages/home/children/friendTab/index'
import { apiReqs } from '@/api'

function MainModal(props) {
    // 接收父组件控制本组件关闭的方法
    const { onClose } = props

    useEffect(() => {
        
    }, [])

    return (
        <Modal
            className="CRX-mainModal CRX-antd-diy"
            visible={true}
            title={'IC Contact 好友列表'}
            footer={null}
            maskClosable={false}
            onCancel={() => {
                onClose && onClose()
            }}
            width={600}
        >
            <FriendTab/>
        </Modal>
    )
}

export default MainModal
