function findCentreTile(tileHeight, tileTops) {
  const wheel = document.querySelector('.wheel');
  const wheelHeight = wheel.getBoundingClientRect().height;
  const wheelScrollTop = wheel.scrollTop;
  const diffRange = (wheelHeight - tileHeight) / 2;

  const tiles = Array.prototype.slice.call(document.querySelectorAll('.wheel .tile'));
  for (i = 0; i < tiles.length; i++) {
    if (tileTops[i] - wheelScrollTop > 0 && tileTops[i] - wheelScrollTop + tileHeight < wheelHeight) {
      const windowScrollRange = tileTops[i] - wheelScrollTop + tileHeight;
      const posIndicator = Math.abs((tileTops[i] - wheelScrollTop) - diffRange);
      const scale = 2 - ((1 / diffRange) * posIndicator);
      tiles[i].style.transform = `scale(${scale})`;
      tiles[i].style.zIndex = 10 - parseInt((10 / diffRange) * posIndicator, 10);
    } else {
      tiles[i].style.transform = '';
      tiles[i].style.zIndex = '';
    }
  };
}

function init() {
  const wheel = document.querySelector('.wheel');
  const firstTile = document.querySelector('.wheel .tile');
  const tileHeight = firstTile.getBoundingClientRect().height + parseInt(window.getComputedStyle(firstTile).marginTop, 10) + parseInt(window.getComputedStyle(firstTile).marginBottom, 10);
  const tileTops = Array.prototype.slice.call(document.querySelectorAll('.wheel .tile')).map(function(tile) { return tile.getBoundingClientRect().top });
  wheel.addEventListener('scroll', function(e) {
    findCentreTile(tileHeight, tileTops);
  });
  window.addEventListener('resize', function(e) {
    findCentreTile(tileHeight, tileTops);
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});