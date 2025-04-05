/**
 * Monitor class to observe an element's visibility within the viewport using IntersectionObserver.
 * It triggers callbacks when the element enters or leaves the viewport.
 */
class Monitor {
  private observer: IntersectionObserver; // The IntersectionObserver instance
  private element: Element | null; // The DOM element to observe

  /**
   * Creates a new Monitor instance.
   * @param selector - The CSS selector of the element to observe.
   * @param onEnter - Callback function triggered when the element enters the viewport.
   * @param onLeave - Callback function triggered when the element leaves the viewport.
   * @throws Will throw an error if the element with the given selector is not found.
   */
  constructor(selector: string, onEnter: () => void, onLeave: () => void) {
    // Find the element in the DOM
    this.element = document.querySelector(selector);

    // Throw an error if the element is not found
    if (!this.element) {
      throw new Error(`Element with selector "${selector}" not found.`);
    }

    // Initialize the IntersectionObserver with a callback
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Trigger the appropriate callback based on the intersection state
          if (entry.isIntersecting) {
            try {
              onEnter();
            } catch (error) {
              console.error("Error in onEnter callback:", error);
            }
          } else {
            try {
              onLeave();
            } catch (error) {
              console.error("Error in onLeave callback:", error);
            }
          }
        }
      },
      { threshold: 0.1 }, // Adjust threshold as needed (e.g., 0.1 means 10% visibility)
    );

    // Start observing the element
    this.observe();
  }

  /**
   * Starts observing the element for visibility changes.
   * Ensures the element exists before attempting to observe.
   */
  private observe() {
    if (this.element) {
      try {
        this.observer.observe(this.element);
      } catch (error) {
        console.error("Error while observing the element:", error);
      }
    }
  }

  /**
   * Disconnects the IntersectionObserver, stopping all observations.
   * This should be called to clean up resources when the observer is no longer needed.
   */
  disconnect() {
    try {
      this.observer.disconnect();
    } catch (error) {
      console.error("Error while disconnecting the observer:", error);
    }
  }
}

export default Monitor;

/**
 * MultiMonitor class to observe multiple elements' visibility within the viewport using IntersectionObserver.
 * It triggers callbacks when all or some of the elements enter or leave the viewport.
 */
class MultiMonitor {
  private observers: Map<Element, IntersectionObserver>; // Map of elements and their IntersectionObservers
  private elements: Element[]; // The DOM elements to observe

  /**
   * Creates a new MultiMonitor instance.
   * @param selectors - An array of CSS selectors for the elements to observe.
   * @param onAllEnter - Callback function triggered when all elements enter the viewport.
   * @param onSomeEnter - Callback function triggered when some elements enter the viewport.
   * @param onAllLeave - Callback function triggered when all elements leave the viewport.
   * @param onSomeLeave - Callback function triggered when some elements leave the viewport.
   * @throws Will throw an error if any selector does not match an element.
   */
  constructor(
    selectors: string[],
    onAllEnter: () => void,
    onSomeEnter: () => void,
    onAllLeave: () => void,
    onSomeLeave: () => void,
  ) {
    this.observers = new Map();
    this.elements = [];

    // Find all elements in the DOM
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found.`);
      }
      this.elements.push(element);
    }

    // Initialize IntersectionObservers for each element
    for (const element of this.elements) {
      const observer = new IntersectionObserver(
        (entries) => {
          const allIntersecting = entries.every(
            (entry) => entry.isIntersecting,
          );
          const someIntersecting = entries.some(
            (entry) => entry.isIntersecting,
          );

          // Trigger callbacks based on intersection states
          if (allIntersecting) {
            try {
              onAllEnter();
            } catch (error) {
              console.error("Error in onAllEnter callback:", error);
            }
          } else if (someIntersecting) {
            try {
              onSomeEnter();
            } catch (error) {
              console.error("Error in onSomeEnter callback:", error);
            }
          }

          if (!allIntersecting) {
            try {
              onAllLeave();
            } catch (error) {
              console.error("Error in onAllLeave callback:", error);
            }
          } else if (!someIntersecting) {
            try {
              onSomeLeave();
            } catch (error) {
              console.error("Error in onSomeLeave callback:", error);
            }
          }
        },
        { threshold: 0.1 }, // Adjust threshold as needed
      );

      // Start observing the element
      observer.observe(element);
      this.observers.set(element, observer);
    }
  }

  /**
   * Disconnects all IntersectionObservers, stopping all observations.
   * This should be called to clean up resources when the observers are no longer needed.
   */
  disconnect() {
    for (const [element, observer] of this.observers) {
      try {
        observer.disconnect();
      } catch (error) {
        console.error(
          `Error while disconnecting observer for element:`,
          element,
          error,
        );
      }
    }
    this.observers.clear();
  }
}

export { Monitor, MultiMonitor };
