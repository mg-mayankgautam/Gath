const videosDB = require("../models/videosDB.js")

module.exports.postVideo = async (req, res) => {
    
    console.log("Reached post video controller");

    const { name, message } = req.body;
    // console.log(name, message);

  
        // let loveLetter = new videosDB({ name, message });
         
        // loveLetter.save().then(savedletter => {
        //     console.log(savedletter);
        //     res.send('Love letter posted');


        //  })
        //  .catch ((error)=> {
        //     console.log(error);
        // res.status(500).json({ error: "Failed to post love letter" });
    // })
    
};


module.exports.getVideos = async (req, res) => {

    videosDB.find({})
        .then((loveLetters) => {
            // console.log(loveLetters);
            res.send(loveLetters);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to get love letters" });
        });

}