import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import MainModal from './components/mainModal'
import './antd-diy.css'
import './content.styl'

function Content() {
    const [mainModalVisible, setMainModalVisible] = useState(false)

    return (
        <div className="CRX-content">
            <div
                className="content-entry"
                onClick={() => {
                    setMainModalVisible(true)
                }}
            ></div>
            {mainModalVisible ? (
                <MainModal
                    onClose={() => {
                        setMainModalVisible(false)
                    }}
                />
            ) : null}
        </div>
    )
}

const app = document.createElement('div')
app.id = 'CRX-container'
document.body.appendChild(app)

ReactDOM.render(<Content />, app)

try {
    let insertScript = document.createElement('script')
    insertScript.setAttribute('type', 'text/javascript')
    insertScript.src = window.chrome.extension.getURL('insert.js')
    document.body.appendChild(insertScript)
} catch (err) {}
