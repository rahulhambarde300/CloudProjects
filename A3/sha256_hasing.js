import { createHash } from 'crypto';
import axios from 'axios';

export const handler = async (event) => {
  
  let input;
  try{
    console.log(event);
    input = event;
  }
  catch (err){
    console.log("No input field provided", err);
    
    return {
      statusCode: 400,
      body: JSON.stringify('No input field provided', err)
    };
  }

  const hash = createHash('sha256').update(input.value, 'utf8').digest('hex');
  
  const requestBody = {
        banner: "B00959785",
        result: hash,
        arn: "arn:aws:lambda:us-east-1:626431408031:function:sha256_hashing",
        action: "sha256",
        value: input.value
    };
  
  let apiResponse;
  try {
      const response = await axios.post(input.course_uri, requestBody);
      apiResponse = response.data;
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error calling external API', error: error.message }),
      };
  }


  const response = {
    statusCode: 200,
    body: JSON.stringify(apiResponse),
  };
  return response;
};
