"use client";
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils"

const DEFAULT_CHARACTER_SET = Object.freeze("abcdefghijklmnopqrstuvwxyz".split(""));
const getRandomInt = (max) => Math.floor(Math.random() * max);

function parseChildren(children) {
  const textArray = [];
  const parseNode = (node) => {
    if (typeof node === "string") {
      const chars = node.split("");
      textArray.push(...chars);
      return { type: "text", content: chars };
    } else if (Array.isArray(node)) {
      return node.map(parseNode);
    } else if (node && typeof node === "object") {
      return {
        type: "element",
        tag: node.type,
        props: node.props,
        children: parseNode(node.props.children),
      };
    }
    return null;
  };
  const nodes = parseNode(children);
  return { nodes, textArray };
}

function renderNodes(nodes, displayTextRef, indexRef) {
  if (!nodes) return null;
  if (Array.isArray(nodes)) return nodes.map((n) => renderNodes(n, displayTextRef, indexRef));

  if (nodes.type === "text") {
    return nodes.content.map(() => {
      const char = displayTextRef[indexRef.current];
      indexRef.current += 1;
      return <motion.span className="" key={indexRef.current}>{char}</motion.span>;
    });
  }

  if (nodes.type === "element") {
    const { tag, props, children } = nodes;
    const Tag = tag;
    return (
      <Tag key={indexRef.current} {...props}>
        {renderNodes(children, displayTextRef, indexRef)}
      </Tag>
    );
  }
  return null;
}

export function HyperText({
  children,
  className,
  // duration = 800,
  duration = 1000,
  delay = 0,
  as: Component = "div",
  startOnView = true,
  animateOnHover = false,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const parsed = parseChildren(children);
  const allText = parsed.textArray;
  const [displayText, setDisplayText] = useState([...allText]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);

  const handleMouseEnter = () => {
    if (animateOnHover && !isAnimating && !hasAnimated) {
      iterationCount.current = 0;
      setIsAnimating(true);
      setHasAnimated(true);
    }
  };

  // ✅ 鼠标移出时重置，允许下次 hover 重新触发动画
  const handleMouseLeave = () => {
    setHasAnimated(false);
  };

  // Start animation by delay or on view
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsAnimating(true);
        }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Scramble animation
  useEffect(() => {
    if (!isAnimating) return;
    const maxIterations = allText.length;
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      iterationCount.current = progress * maxIterations;

      setDisplayText((prev) =>
        prev.map((ch, i) =>
          ch === " "
            ? ch
            : i <= iterationCount.current
            ? allText[i]
            : characterSet[getRandomInt(characterSet.length)]
        )
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [allText.join(""), duration, isAnimating, characterSet]);

  const indexRef = useRef(0);
  indexRef.current = 0;

  return (
    <MotionComponent
      // style={{'fontFamily': 'monospace'}}
      ref={elementRef}
      className={cn("overflow-hidden font-mono leading-[1.3]", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} // ✅ 新增
      {...props}
    >
      <AnimatePresence>
        {renderNodes(parsed.nodes, displayText, indexRef)}
      </AnimatePresence>
    </MotionComponent>
  );
}
