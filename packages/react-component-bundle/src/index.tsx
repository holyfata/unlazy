import React, { useEffect, useRef, useState } from "react";
import Monitor from "@holyfata/unlazy";

const VisibilityWrapper = (props: {
  selector: string;
  children: (props: { isVisible: boolean }) => React.ReactNode;
  onVisibilityChange?: (isVisible: boolean) => void;
}) => {
  const { selector, children, onVisibilityChange } = props;
  const [isVisible, setIsVisible] = useState(false);
  const monitorRef = useRef<Monitor | null>(null);

  useEffect(() => {
    const handleEnter = () => {
      setIsVisible(true);
      onVisibilityChange?.(true); // 触发事件并传递可见性状态
    };

    const handleLeave = () => {
      setIsVisible(false);
      onVisibilityChange?.(false); // 触发事件并传递可见性状态
    };

    monitorRef.current = new Monitor(selector, handleEnter, handleLeave);

    return () => {
      monitorRef.current?.disconnect();
    };
  }, [selector, onVisibilityChange]);

  return <>{children({ isVisible }) ?? undefined}</>;
};

export default VisibilityWrapper;
