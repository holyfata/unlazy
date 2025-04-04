class Monitor {
  private observer: IntersectionObserver;
  private element: Element | null;

  constructor(selector: string, onEnter: () => void, onLeave: () => void) {
    this.element = document.querySelector(selector);

    if (!this.element) {
      throw new Error(`Element with selector "${selector}" not found.`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onEnter();
          } else {
            onLeave();
          }
        }
      },
      { threshold: 0.1 }, // Adjust threshold as needed
    );

    this.observe();
  }

  private observe() {
    if (this.element) {
      this.observer.observe(this.element);
    }
  }

  disconnect() {
    this.observer.disconnect();
  }
}

export default Monitor;
