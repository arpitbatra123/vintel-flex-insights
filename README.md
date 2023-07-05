# Vintel Flex Insights Integration

The is an integration between Flex Insights and Twilio's Voice Intelligence (Vintel) which allows Flex Insights to playback redacted recordings from Vintel.

This repo consists of these sections:

- plugin: This folder has the Flex plugin code that's used to manipulate the media URL attribute of a task to point to a Twilio Function, the URL for which is stored in the FUNCTION_URL env variable. This  in turn ensures that when Flex Insights plays back the call recording corresponding to that task, it sends a GET request to the express server.

- express_app: Be sure to change the Flex Plugin's FUNCTION_URL env variable so that it invokes your server to fetch the recording.