function getImageList() {
  let images = [
    { imgSource: "./images/1.PNG", name: "1" },
    { imgSource: "./images/2.PNG", name: "2" },
    { imgSource: "./images/3.PNG", name: "3" },
    { imgSource: "./images/4.PNG", name: "4" },
    { imgSource: "./images/5.PNG", name: "5" },
    { imgSource: "./images/6.PNG", name: "6" },
  ];

  images = images.concat(images.map((image) => ({ ...image })));
  images.sort((a, b) => a.name.localeCompare(b.name));
  return images;
}
module.exports = { getImageList };
