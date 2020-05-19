{
  // scroll
  const scroll = document.querySelector('.levus-scroll');

  // scroll elements
  let items = scroll.querySelectorAll('.scroll-item');

  // дублюємо всі елементи скрола
  items.forEach(item => {
    const clone = item.cloneNode(!0);
    scroll.append(clone);
  });

  // new (all) scroll elements
  items = scroll.querySelectorAll('.scroll-item');

  // one item size
  let width = 200;

  // resize
  window.addEventListener('resize', move);

  // sizes
  const sizes = [];

  // z-index
  let zIdex = 0;

  // z-index position
  let num = 0;

  // fill sizes
  items.forEach((item, i) => sizes.push(i * width - width));

  // build scroll
  move();

  // left
  const left = document.querySelector('.levus-scroll-nav .left');

  // right
  const right = document.querySelector('.levus-scroll-nav .right');

  // scroll to left
  left.addEventListener('click', () => {
    const first = sizes.pop();
    sizes.unshift(first);
    move();
  });

  // scroll to right
  right.addEventListener('click', () => {
    const last = sizes.shift();
    sizes.push(last);
    move();
  });

  // function move 1 item
  function move() {

    if (scroll.offsetWidth >= 600) {
      width = scroll.offsetWidth / 3;
      items.forEach(item => item.style.width = `${scroll.offsetWidth / 3}px`);
    }
    if (scroll.offsetWidth < 600) {
      width = scroll.offsetWidth / 2;
      items.forEach(item => item.style.width = `${scroll.offsetWidth / 2}px`);
    }
    if (scroll.offsetWidth < 400) {
      items.forEach(item => item.style.width = `${scroll.offsetWidth}px`);
    }

    items.forEach((item, i) => {
      item.style.transform = `translateX(${sizes[i]}px)`;

      // 2
      if (sizes[i] === width) num = 3;
      // 1, 3
      else if (sizes[i] === 0 || sizes[i] === width * 2) num = 2;
      // other
      else num = 0;

      item.style.zIndex = num;
    });
  }
}