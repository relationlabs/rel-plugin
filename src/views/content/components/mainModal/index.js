import React, { useState, useEffect } from 'react'
import './mainModal.styl'
import Modal from 'antd/es/modal'
import Button from 'antd/es/button'
import 'antd/es/modal/style/index.css'
import FriendTab from '../../../popup/home/children/friendTab/index'
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
            <Button
                type="primary"
                onClick={() => {
                    chrome.runtime.sendMessage({ cmd: 'test', value: '这是一段来自content的消息' }, (response) => {
                        console.log('来自bg的回复:', response);
                    });
                }}
            >
                测试给popup或者bg发送消息
            </Button>
            <FriendTab/>
        </Modal>
    )
}

export default MainModal
