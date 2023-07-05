const Router = require("express").Router;
const router = new Router();

const { vintel } = require("./controller");
console.log("Router file loading");

// Middleware to handle pre-flight requests
router.options('/get-redacted-recording', (req, res) => {
  // Set the necessary CORS headers
  res.setHeader('ngrok-skip-browser-warning', '69420');
  res.setHeader('Access-Control-Allow-Origin', 'https://flex.twilio.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '-1');
  
  
  // Respond with a 200 status code
  res.sendStatus(200);
});


// This is a test route to check if server is running
router.get('/test', (_req,res)=>{
  res.json({"data":"hello"})
})

// Define the route
router.get('/get-redacted-recording', async (req, res) => {
  const [hdr, mediaURL] = await vintel(req.query) 
 
    Object.keys(hdr).forEach(k=>{
      res.setHeader(k, hdr[k])
    })

    // Send the JSON object as the response
    res.json({
      "media_url": mediaURL
    });
  
});

module.exports = router;