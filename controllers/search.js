const Listing = require("../models/listing");
module.exports.search = async (req, res) => {
  let { q } = req.query;
  if (!q || q.trim() === "") {
    req.flash("error", "Search query cannot be empty.");
    return res.redirect("/listings");
  }
  try {
    let allListings = await Listing.find({ $text: { $search: q } }).exec();
    if (allListings.length > 0) {
      res.render("listing/search.ejs", { allListings });
    } else {
      let allListings = await Listing.find({
        $or: [
          { country: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { title: { $regex: q, $options: "i" } },
        ],
      });
      if (allListings.length > 0) {
        res.render("listing/search.ejs", { allListings });
      } else {
        req.flash("error", "Not Found !");
        res.redirect("/listings");
      }
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/listings");
  }
};
