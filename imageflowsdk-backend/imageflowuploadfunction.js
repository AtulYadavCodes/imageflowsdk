//this is for frontend to upload file on aws s3 bucket using imageflow sdk
import fs from "fs";
import path from "path";
export const imageflowuploadfunction = async (filepath, apikey, foldername) => {
  let uploadurl;
  const file=fs.createReadStream(filepath);
  const filesize=fs.statSync(filepath).size;
  const filename=path.basename(filepath);
  const filetype="application/octet-stream";
  if (foldername === undefined || foldername.trim() === "") {
    foldername = "default";
  }
  try {
    uploadurl = await fetch("http://localhost:3000/api/v1/files/uploadfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        originalname: filename,
        contentType: filetype,
      }),
    });

    if (!uploadurl.ok) {
      throw new Error("Failed to get upload URL from server");
    }
    uploadurl = await uploadurl.json();
  } catch (error) {
    console.error("Error in imageflowuploadfunction:", error);
    throw error;
  }
  const uploadfile = await fetch(uploadurl.data.uploadurl, {
    method: "PUT",
    headers: {
      "Content-Type": filetype,
    },
    body: file,
  });
  if (!uploadfile.ok) {
    throw new Error("Failed to upload file to S3");
  }

  try {
    const savefile = await fetch(`http://localhost:3000/api/v1/files/uploadfile/${foldername}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        originalname: filename,
        bytes: filesize,
        key: uploadurl.data.key,
      }),
    });

    if (!savefile.ok) {
      throw new Error("Failed to save file metadata on server");
    }
    return await savefile.json();
  } catch (error) {
    console.error("Error in saving file metadata:", error);
    throw error;
  }
};
