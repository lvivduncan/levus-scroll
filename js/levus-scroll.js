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

  // ширина вікна
  const viewport = window.innerWidth;

  // one item size
  let width = 200;

  // resize
  document.addEventListener('resize', () => {
    if (viewport > 1200) {
      width = 200;
      console.log(width)
    }
    if (viewport < 1200) {
      width = 300;
      console.log(width)
    }
    if (viewport < 776) {
      width = 400;
      console.log(width)
    }
  });

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