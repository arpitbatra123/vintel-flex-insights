# Vintel Flex Insights Integration

The Express app is part of an integration between Flex Insights and Twilio's Voice Intelligence (Vintel) which allows Flex Insights to playback redacted recordings from Vintel.

This repo consists of three sections:

- plugin: This folder has the Flex plugin code that's used to manipulate the media URL attribute of a task to point to a Twilio Function, the URL for which is stored in the FUNCTION_URL env variable. This  in turn ensures that when Flex Insights plays back the call recording corresponding to that task, it sends a GET request to the Twilio function.

- serverless: This is the Twilio function I referred above. It is invoked by Flex Insights when you attempt to play the recording of a conversation. The response headers in this function are the key focus of the CORS issue. 

- express_app: To solve the 431 error obtained when Flex Insights invokes the Twilio function, I had moved the code over to this server, a Node.js Express server. It got rid of the 431 error immediately but the CORS error persists. I have experimented a fair bit with the code to solve for the CORS issue, so it's not in the best shape for testing but if you do use this or another custom server be sure to change the Flex Plugin's FUNCTION_URL env variable so that it invokes your server instead of the Twilio function.