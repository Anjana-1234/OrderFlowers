// Import flower images from assets folder
import whiteBouquet from '../assets/flowers/white-bouquet.jpg';
import pinkBouquet from '../assets/flowers/pink-bouquet.jpg';
import redBouquet from '../assets/flowers/red-bouquet.jpg';
import yellowBouquet from '../assets/flowers/yellow-bouquet.jpg';

// This object maps the filename stored in MongoDB to the actual imported image
// e.g. when the database says image: "red-bouquet.jpg", we look it up here
const flowerImages = {
  'white-bouquet.jpg': whiteBouquet,
  'pink-bouquet.jpg': pinkBouquet,
  'red-bouquet.jpg': redBouquet,
  'yellow-bouquet.jpg': yellowBouquet,
};

export default flowerImages;