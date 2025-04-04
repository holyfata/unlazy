import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import Monitor from "../src";

// 模拟 IntersectionObserver
// @ts-ignore
globalThis.IntersectionObserver = class {
  constructor(callback: any) {
    (IntersectionObserver as any).mock = { calls: [[callback]] };
  }
  observe() {}
  disconnect() {}
};

describe("Monitor", () => {
  let mockElement: HTMLElement;
  let onEnter: () => void;
  let onLeave: () => void;

  beforeEach(() => {
    // 创建一个虚拟 DOM 元素
    mockElement = document.createElement("div");
    mockElement.setAttribute("id", "test-element");
    document.body.append(mockElement);

    // 创建模拟回调函数
    onEnter = vi.fn();
    onLeave = vi.fn();
  });

  afterEach(() => {
    // 清理 DOM
    mockElement.remove();
  });

  it("should call onEnter when the element enters the viewport", () => {
    const monitor = new Monitor("#test-element", onEnter, onLeave);

    // 模拟 IntersectionObserver 的行为
    const observerCallback = (IntersectionObserver as any).mock.calls[0][0];
    observerCallback([{ isIntersecting: true }]);

    expect(onEnter).toHaveBeenCalled();
    expect(onLeave).not.toHaveBeenCalled();

    monitor.disconnect();
  });

  it("should call onLeave when the element leaves the viewport", () => {
    const monitor = new Monitor("#test-element", onEnter, onLeave);

    // 模拟 IntersectionObserver 的行为
    const observerCallback = (IntersectionObserver as any).mock.calls[0][0];
    observerCallback([{ isIntersecting: false }]);

    expect(onEnter).not.toHaveBeenCalled();
    expect(onLeave).toHaveBeenCalled();

    monitor.disconnect();
  });

  it("should throw an error if the element is not found", () => {
    expect(() => {
      new Monitor("#non-existent-element", onEnter, onLeave);
    }).toThrowError('Element with selector "#non-existent-element" not found.');
  });

  it("should disconnect the observer when disconnect is called", () => {
    const monitor = new Monitor("#test-element", onEnter, onLeave);

    const disconnectSpy = vi.spyOn(monitor as any, "disconnect");
    monitor.disconnect();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
