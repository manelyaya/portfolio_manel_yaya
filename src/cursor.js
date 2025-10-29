document.addEventListener('DOMContentLoaded', () => {
  console.log("Cursor script loaded");

  const circleElement = document.querySelector('.circle');
  if (!circleElement) {
    console.warn("⚠️ No .circle element found on this page!");
    return;
  }

  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;
  let currentAngle = 0;
  const speed = 0.17;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    const translate = `translate(${circle.x}px, ${circle.y}px)`;
    const deltaX = mouse.x - previousMouse.x;
    const deltaY = mouse.y - previousMouse.y;

    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    const velocity = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) * 4, 150);
    const scaleValue = (velocity / 150) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;

    const scale = `scale(${1 + currentScale}, ${1 - currentScale})`;
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    if (velocity > 20) currentAngle = angle;
    const rotate = `rotate(${currentAngle}deg)`;

    circleElement.style.transform = `${translate} ${rotate} ${scale}`;
    requestAnimationFrame(tick);
  };

  tick();
});
