import "./App.css";
import faker from "faker";
import axios from "axios";
import Image from "./components/Image";
import React, { useEffect } from "react";
import { Router, Link } from "@reach/router";

const IMAGES = [
  "https://render.fineartamerica.com/images/rendered/search/print/images-medium-5/baby-finger-monkey-beige-background-l-brown.jpg",
  "https://www.exoticanimalsforsale.net/img/FingerMonkey.jpg",
  "https://exotic4home.site/wp-content/uploads/2018/11/WhatsApp-Image-2019-04-03-at-9.57.13-PM-600x600.jpeg",
  "https://www.critterbabies.com/wp-content/uploads/2014/01/1-cute-chinchillas-playing.jpg",
  "https://chinchillacaregroup.com/wp-content/uploads/2017/09/chinchilla-babies.jpg",
  "https://i.ytimg.com/vi/hKy0PgrmjcY/hqdefault.jpg",
  "https://kids.nationalgeographic.com/content/dam/kidsea/kids-core-objects/backgrounds/youareleaving_kids.adapt.768.1.jpg",
  "https://i.ytimg.com/vi/G569uHzxRD4/maxresdefault.jpg",
  "https://zoo.sandiegozoo.org/sites/default/files/styles/landing_page_view_thumbnail/public/2019-01/thumb-amurleopard_0.jpg?itok=2V5hBqxr",
  "https://www.marylandzoo.org/wp-content/uploads/2018/04/lemuranimaheader3.jpg",
  "https://previews.123rf.com/images/nehru/nehru1612/nehru161200373/67370600-picture-of-a-cute-mixed-breed-puppy-domestic-animals-theme.jpg",
  "https://rickfullerinc.com/wp-content/uploads/2019/07/Animal-Shelter-3.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8LCqcZrKSP-Bi7aSLaFAh7y5hLm_mgTxbKjV0EfZf_z9ajIlV",
  "https://c4.wallpaperflare.com/wallpaper/112/908/945/dog-funny-animals-puppy-6k-wallpaper-preview.jpg",
  "https://c4.wallpaperflare.com/wallpaper/244/804/15/dog-animal-pet-cute-wallpaper-preview.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPmUhb69SfsWaYGu0HY3LlbRl9TVSOLzhpi8rVpH4pw9MpQgoY",
  "https://www.petmd.com/sites/default/files/adult-homeless-cat-asking-for-food-picture-id847415388.jpg",
  "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*",
  "https://imgix.bustle.com/uploads/image/2019/4/23/d7b621e5-24dc-40ae-8303-19b6c980f4e4-shutterstock_352176329.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70",
  "https://static.scientificamerican.com/blogs/cache/file/1379B8E0-9602-42D5-9602278C1F21FAF2_source.jpg?w=590&h=800&AF11F83F-A202-49A5-948C06206102FF92"
];



const Cats = ({ catPics, children }) => {
  return (
    <div className="randomCatImage">
      <div style={{ width: "100%" }}>
        {catPics.map((value, i) => (
          <img
            style={{ maxWidth: "100%" }}
            src={value.url}
            alt={value}
            key={i}
          />
        ))}
      </div>
      <Link to="test">Show Test Header</Link>
      {children}
    </div>
  );
};

const Carousel = () => {
  const pictures = IMAGES.map(src => ({
    animalPic: src,
    _id: faker.random.uuid(),
    alt: faker.lorem.word()
  }));
  return (
    <div className="carousel">
      {pictures.map(i => (
        <Image key={i._id} animalPic={i.animalPic} alt={i.alt} />
      ))}
    </div>
  );
};

function App() {
  const [catPics, setPics] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then(result => setPics([...catPics, result.data[0]]));
  }, []);

  return (
    <div className="App">
      <header className="App-header">Welcome</header>
      <Link to="/cats">Go to Cats</Link>
      <Link to="/carousel">Go to the Carousel</Link>
      <Router>
        <Carousel path="/carousel" />
        <Cats path="/cats" catPics={catPics}>
          <Test path="/test" />
        </Cats>
      </Router>
    </div>
  );
}

export default App;
