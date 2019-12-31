const User = require("./../models/user");
const Ad = require("./../models/ad");

Ad.find({}, (err, ads) => {
  if (ads.length === 0) {
    const carousel = new Ad({
      homeBanner: {
        carousel: {
          A: "https://i.ibb.co/MgcrFzh/index.jpg",
          B: "https://i.ibb.co/MgcrFzh/index.jpg",
          C: "https://i.ibb.co/MgcrFzh/index.jpg",
          D: "https://i.ibb.co/MgcrFzh/index.jpg"
        },
        video:
          '<iframe width="692" height="389" src="https://www.youtube.com/embed/DyDfgMOUjCI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        toggle: "image"
      }
    });

    carousel.save();
  }
});

User.find({ isAdmin: true }, (err, adminUser) => {
  if (adminUser.length === 0) {
    const Admin = new User({
      username: "instaadmin",
      name: "yash",
      email: "admin@instaads.com",
      isAdmin: true,
      password: "jYW$hRbFj#FakApx"
    });
    Admin.save();
  }
});
