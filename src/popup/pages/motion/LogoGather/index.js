import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import '../../home/home.styl'
import './logo.styl';

const LogoGather = ({
  width = 300,
  height = 300,
  pixSize = 20,
  pointSizeMin = 10,
  image,
}) => {
  const [boxAnim, setBoxAnim] = useState(null);
  const [children, setChildren] = useState([]);
  const sideBoxRef = useRef(null);
  const thisRef = useRef(null);
  const assistant = useRef({
    initInterval: false,
    interval: null,
    gather: true,
    intervalTime: 9000,
    dom: null,
    sideBoxDom: null
  });
  const setDataToDom = useCallback((data, w, h) => {
    const pointArray = [];
    const num = pixSize;
    for (let i = 0; i < w; i += num) {
      for (let j = 0; j < h; j += num) {
        if (data[((i + j * w) * 4) + 3] > 150) {
          pointArray.push({ x: i, y: j });
        }
      }
    }
    const newChildren = [];
    pointArray.forEach((item, i) => {
      const r = Math.random() * pointSizeMin + pointSizeMin;
      const b = Math.random() * 0.4 + 0.1;
      newChildren.push((
        <TweenOne key={i} className="point-wrapper" style={{ left: item.x, top: item.y }}>
          <TweenOne
            className="point"
            style={{
              width: r,
              height: r,
              opacity: b,
              backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
            }}
            animation={{
              y: (Math.random() * 2 - 1) * 10 || 5,
              x: (Math.random() * 2 - 1) * 5 || 2.5,
              delay: Math.random() * 1000,
              repeat: -1,
              duration: 3000,
              yoyo: true,
              ease: 'easeInOutQuad',
            }}
          />
        </TweenOne>
      ));
      setChildren(newChildren);
      setBoxAnim({ opacity: 0, type: 'from', duration: 800 });
    });
  }, [pixSize, pointSizeMin]);
  const createPointData = useCallback(() => {
    const canvas = document.getElementById('canvas');
    if (canvas && image) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      canvas.width = width;
      canvas.height = height;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
        const data = ctx.getImageData(0, 0, width, height).data;
        setDataToDom(data, width, height);
        assistant.current.dom.removeChild(canvas);
      };
      img.crossOrigin = 'anonymous';
      img.src = image;
    }
  }, [width, height, image]);
  const gatherData = useCallback((originChildren) => {
    const newChildren = originChildren.map(item => React.cloneElement(item, {
      animation: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        delay: Math.random() * 500,
        duration: 800,
        ease: 'easeInOutQuint',
      },
    }));
    setChildren(newChildren);
  }, []);
  const disperseData = useCallback((originChildren) => {
    if (assistant.current.dom && assistant.current.sideBoxDom) {
      const rect = assistant.current.dom.getBoundingClientRect();
      const sideRect = assistant.current.sideBoxDom.getBoundingClientRect();
      const sideTop = sideRect.top - rect.top;
      const sideLeft = sideRect.left - rect.left;
      const newChildren = originChildren.map(item => React.cloneElement(item, {
        animation: {
          x: Math.random() * rect.width - sideLeft - item.props.style.left,
          y: Math.random() * rect.height - sideTop - item.props.style.top,
          opacity: Math.random() * 0.4 + 0.1,
          scale: Math.random() * 2.4 + 0.1,
          duration: Math.random() * 500 + 500,
          ease: 'easeInOutQuint',
        },
      }));
      setChildren(newChildren);
    }
  }, []);
  const updateTweenData = useCallback(() => {
    assistant.current.dom = ReactDOM.findDOMNode(thisRef.current);
    assistant.current.sideBoxDom = ReactDOM.findDOMNode(sideBoxRef.current);
    let action = gatherData;
    if (assistant.current.gather) action = disperseData;
    action(children);
    assistant.current.gather = !assistant.current.gather;
  }, [children]);
  const clearTimer = useCallback(() => {
    ticker.clear(assistant.current.interval);
    assistant.current.interval = null;
  }, []);
  useEffect(() => {
    assistant.current.dom = ReactDOM.findDOMNode(thisRef.current);
    createPointData();
    return () => {
      clearTimer();
    };
  }, []);
  useEffect(() => {
    if (!assistant.current.initInterval && (Array.isArray(children) && children.length > 0)) {
      assistant.current.initInterval = true;
      clearTimer();
      setTimeout(() => {
        updateTweenData();
        setTimeout(() => {
          updateTweenData();
          if (!assistant.current.interval) assistant.current.interval = ticker.interval(updateTweenData, assistant.current.intervalTime);
        }, 3000)
      }, 3000); 
    }
  }, [children, updateTweenData]);
  return (
    <div
      className="logo-wrapper"
      ref={thisRef}
    >
      <canvas id="canvas" />
      <TweenOne
        className="right-side blur"
        animation={boxAnim}
        ref={sideBoxRef}
        /*
        onMouseEnter={() => {
          clearTimer();
          if (!assistant.current.gather) updateTweenData();
        }}
        onMouseLeave={() => {
          if (assistant.current.gather) updateTweenData();
          assistant.current.interval = ticker.interval(updateTweenData, assistant.current.intervalTime);
        }}
        */
      >
        {children}
      </TweenOne>
    </div>
  )
};

/*
const LogoGatherWrapper = () => {
  return (
    <div className="layout-home">
      <div style={{ position: 'relative', height: 120 }}>
        <LogoGather
          width={80}
          height={80}
          pixSize={6}
          pointSizeMin={4}
          image='https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg'
        />
      </div>
    </div>
  )
};
*/

export default LogoGather;