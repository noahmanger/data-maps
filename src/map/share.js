import { select } from "d3";

import { prefix } from "../constants";
import html2canvas from "html2canvas";

export const addShare = () => {
  select(`.${prefix}share-button`).on('click', () => {
    const elem = document.querySelector(`.${prefix}vis`);

    const parent = elem.parentNode;
    const copy = document.querySelector(`.${prefix}vis`).cloneNode(true);
    parent.insertBefore(copy, elem);

    elem.classList.add('generating-screenshot')

    const mapSVG = elem.querySelector(`.${prefix}map svg`)
    mapSVG.setAttribute('width', 960)
    mapSVG.setAttribute('height', 600)

    const legendSVG = elem.querySelector(`.${prefix}legend svg`)
    legendSVG.setAttribute('width', legendSVG.getBBox().width * 100)
    legendSVG.setAttribute('viewBox', '0 0 150 40');


    html2canvas(elem).then(canvas => {
      const img = document.createElement('img')
      img.style.width = '90%'
      img.style.height = 'auto'
      img.style.margin = '20px auto'
      img.style.display = 'block'
      img.setAttribute('src', canvas.toDataURL("image/png"))
      document.body.insertBefore(img, document.body.childNodes[0])
      elem.classList.remove('generating-screenshot')
      legendSVG.setAttribute('viewBox', '0 0 200 40');
      parent.removeChild(copy);
    })
  });
}
