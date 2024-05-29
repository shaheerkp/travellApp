import { Location } from "../models/locations";
import OpenAI from "openai";
import dotenv from "dotenv";
import { Mongoose, Types } from "mongoose";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY || "",
});

export async function getDataFromApi(params: string) {
  const data = await Location.findOne({
    location: params.toString().toLowerCase(),
  });

  if (!data) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `list popular places to visit in ${params}  return response in the following parsable format :  {{location:"SearchedLocation"},
              favorite:[
              {name: Places,description}
              ]}`,
          },
        ],
        model: "gpt-3.5-turbo-16k",
        max_tokens: 2048,
        temperature: 1,
      });

      let dataFromApi = completion.choices[0].message.content;
      if (!dataFromApi) {
        throw new Error("error parsing location");
      } else {
        let formattedData = JSON.parse(dataFromApi);

        const temp = new Location(formattedData);
        temp
          .save()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            throw new Error("error parsing location");
          });
      }
    } catch (error) {
      throw new Error("error parsing location");
    }
  } else {
    return data;
  }
}

export async function deleteData(location: String, name: String) {
  try {
    const result = await Location.findOneAndUpdate(
      { location: location },
      {
        $pull: { favourite: { name } },
      },
      { new: true }
    );

    if (!result) {
      return false;
    }

    return true;
  } catch (error) {
   return false
  }
}
