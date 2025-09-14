export function MobileHeader({ middleElement, leftElement, rightElement }) {
  return (
    <div className="flex items-center p-4 bg-white sticky top-0 z-100">
      <div className="flex-1">{leftElement}</div>
      <div className="flex-1">{middleElement ?? <div />}</div>
      <div className="flex-1 flex justify-end">{rightElement}</div>
    </div>
  );
}
