# File Upload Using SDK

Two SDK packages are included in this repository.

## Browser SDK

- Package folder: `imageflowsdk-browser`
- Entry file: `imageflowuploadfunction.js`
- Export: `imageflowuploadfunction(file, apikey, foldername)`

Example:

```js
import { imageflowuploadfunction } from "./imageflowuploadfunction.js";

const file = document.querySelector("#file-input").files[0];
const apiKey = "sk_xxxxxxxxxx";

const result = await imageflowuploadfunction(file, apiKey, "documents");
console.log(result);
```

## Backend SDK (Node.js)

- Package folder: `imageflowsdk-backend`
- Entry file: `imageflowuploadfunction.js`
- Export: `imageflowuploadfunction(filepath, apikey, foldername)`

Example:

```js
import { imageflowuploadfunction } from "./imageflowuploadfunction.js";

const apiKey = "sk_xxxxxxxxxx";
const result = await imageflowuploadfunction(
  "./docs/report.pdf",
  apiKey,
  "reports",
);
console.log(result);
```

## SDK Behavior Notes

- If `foldername` is empty, SDK defaults to `default`.
- SDK sends `Authorization: Bearer <apikey>`.
