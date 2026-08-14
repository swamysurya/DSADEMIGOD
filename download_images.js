const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, filename) {
  const file = fs.createWriteStream(path.join(dir, filename));
  https.get(url, function(response) {
    if (response.statusCode === 302 || response.statusCode === 301) {
      // Follow redirect
      download(response.headers.location, filename);
      return;
    }
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log('Downloaded ' + filename);
    });
  }).on('error', function(err) {
    fs.unlink(path.join(dir, filename), () => {});
    console.error('Error downloading ' + filename + ': ' + err.message);
  });
}

download('https://upload.wikimedia.org/wikipedia/commons/4/4e/Adelson-Velsky-G.Moscow-1980.jpg', 'adelson_velsky.jpg');
download('https://upload.wikimedia.org/wikipedia/commons/2/23/%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D0%B8%D1%87_%D0%9B%D0%B0%D0%BD%D0%B4%D0%B8%D1%81.jpeg', 'evgenii_landis.jpg');
