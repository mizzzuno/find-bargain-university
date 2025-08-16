import { useState, useEffect, useRef } from "react";

/**
 * テーブルのソート機能を管理するフック
 * @param {string} defaultOrderBy - デフォルトのソートキー
 * @param {string} defaultOrder - デフォルトのソート順序
 * @returns {Object} - ソート状態と操作関数
 */
export const useTableSort = (defaultOrderBy = "name", defaultOrder = "asc") => {
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};

/**
 * スマホでの横スクロールヒントを管理するフック
 * @param {number} autoHideDelay - 自動非表示の遅延時間（ミリ秒）
 * @returns {Object} - ヒント表示状態とスクロールコンテナの参照
 */
export const useScrollHint = (autoHideDelay = 5000) => {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef(null);

  // スクロールイベントの監視
  useEffect(() => {
    let isInitialized = false;
    const initTimer = setTimeout(() => {
      isInitialized = true;
    }, 500);

    const handleScroll = () => {
      if (!isInitialized) return;

      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.scrollLeft > 20 &&
        !hasScrolled
      ) {
        setHasScrolled(true);
        setShowScrollHint(false);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        clearTimeout(initTimer);
        container.removeEventListener("scroll", handleScroll);
      };
    }

    return () => clearTimeout(initTimer);
  }, [hasScrolled]);

  // 自動非表示タイマー
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, autoHideDelay);

    return () => clearTimeout(timer);
  }, [autoHideDelay]);

  return { showScrollHint, hasScrolled, scrollContainerRef };
};
