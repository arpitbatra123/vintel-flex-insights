
const config = require("../config");


exports.vintel = async function vintel(event, callback) {
  const axios = require('axios');

  const { voicesid, callsid } = event;

  // Get the Transcript SID for second call.
  const getTranscript = async (voicesid, callsid, accSID, token) => {
    const transcriptAPI = `https://ai.twilio.com/v1/Services/${voicesid}/Transcripts?callsid=${callsid}`;

    try {
      const response = await axios.get(transcriptAPI, {
        headers: {
          Authorization: `Basic ${btoa(`${accSID}:${token}`)}`,
        },
      });

      return response.data.transcripts[0].sid;
    } catch (error) {
      return null;
    }
  };

  // Get the Media URL for our redacted recording.
  const getMedia = async (voicesid, tSID, accSID, token) => {
    const mediaAPI = `https://ai.twilio.com/v1/Services/${voicesid}/Transcripts/${tSID}/Media`;

    try {
      const response = await axios.get(mediaAPI, {
        headers: {
          Authorization: `Basic ${btoa(`${accSID}:${token}`)}`,
        },
      });

      return response.data.media_url;
    } catch (error) {
      return null;
    }
  };



  console.log("Get recording for call SID ", callsid);

  // Perform some logic to define the headers
  const hdrs = {
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '-1'
  };

  let mediaURL = null;
  const ACCOUNT_SID = "AC**";
  const AUTH_TOKEN = "<<token>>";

  const tSID = await getTranscript(
    voicesid,
    callsid,
    ACCOUNT_SID,
    AUTH_TOKEN
  );

  if (tSID) {
    mediaURL = await getMedia(
      voicesid,
      tSID,
      ACCOUNT_SID,
      AUTH_TOKEN
    );
  }

  return [hdrs, mediaURL]
  
}
