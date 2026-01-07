'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * 自定义滚动 Hook，实现基于 transform 的滚动效果
 * @param {Object} options - 配置选项
 * @param {number} options.threshold - 触发 transform 滚动的阈值（页面滚动距离）
 * @param {boolean} options.enabled - 是否启用滚动效果
 * @returns {Object} - 包含滚动状态和样式的对象
 */
export const useScrollTransform = (options = {}) => {
  const { 
    threshold = 0, // 默认阈值为 0，即立即触发
    enabled = true 
  } = options;
  
  // 状态管理
  const [scrollY, setScrollY] = useState(0); // 当前滚动位置
  const [isTransformActive, setIsTransformActive] = useState(false); // 是否激活 transform 模式
  const [transformY, setTransformY] = useState(0); // transform 的 Y 值

  // 滚动事件处理函数
  const handleScroll = useCallback(() => {
    if (!enabled) return;

    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // 判断是否应该激活 transform 滚动
    if (currentScrollY >= threshold) {
      setIsTransformActive(true);
      // 计算 transform 的偏移量
      // 当滚动超过阈值时，开始使用 transform 移动元素
      const transformOffset = currentScrollY - threshold;
      setTransformY(transformOffset);
    } else {
      setIsTransformActive(false);
      setTransformY(0);
    }
  }, [threshold, enabled]);

  // 添加和移除滚动事件监听器
  useEffect(() => {
    if (!enabled) return;

    // 立即执行一次以获取初始状态
    handleScroll();
    
    // 添加事件监听器
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, enabled]);

  // 生成 transform 样式
  const transformStyle = {
    transform: isTransformActive 
      ? `translateY(-${transformY}px)` 
      : 'translateY(0px)',
    transition: 'transform 0.1s ease-out', // 添加平滑过渡
  };

  return {
    scrollY, // 当前滚动位置
    isTransformActive, // 是否在 transform 模式
    transformY, // transform 偏移量
    transformStyle, // 可直接应用的样式对象
  };
};

/**
 * 计算页面内容的总高度（用于确定滚动阈值）
 * @returns {number} 页面内容高度
 */
export const getContentHeight = () => {
  if (typeof window === 'undefined') return 0;
  
  const body = document.body;
  const html = document.documentElement;
  
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};

/**
 * 获取视口高度
 * @returns {number} 视口高度
 */
export const getViewportHeight = () => {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight;
};
