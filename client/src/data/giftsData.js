// Import gift images from assets folder
import teddyBear from '../assets/gifts/teddy-bear.jpg';
import chocolateSmall from '../assets/gifts/chocolate-small.jpg';
import chocolateMedium from '../assets/gifts/chocolate-medium.jpg';
import chocolateLarge from '../assets/gifts/chocolate-large.jpg';
import keytag from '../assets/gifts/keytag.jpg';
import tableOrnament from '../assets/gifts/table-ornament.jpg';

// This object maps the filename stored in MongoDB to the actual imported image
const giftImages = {
  'teddy-bear.jpg': teddyBear,
  'chocolate-small.jpg': chocolateSmall,
  'chocolate-medium.jpg': chocolateMedium,
  'chocolate-large.jpg': chocolateLarge,
  'keytag.jpg': keytag,
  'table-ornament.jpg': tableOrnament,
};

export default giftImages;