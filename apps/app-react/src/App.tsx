import VisibilityWrapper from "@holyfata/unlazy-react";

function App() {
  return (
    <div>
      <div className="app"></div>
      <VisibilityWrapper
        selector="#target-element"
        onVisibilityChange={(isVisible) =>
          console.log("Visibility changed:", isVisible)
        }
      >
        {({ isVisible }) => (
          <div id="target-element">
            {isVisible ? "Element is visible" : "Element is not visible"}
          </div>
        )}
      </VisibilityWrapper>
    </div>
  );
}

export default App;
