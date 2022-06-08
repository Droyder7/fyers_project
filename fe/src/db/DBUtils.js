const { google } = require("googleapis");

const spreadsheetId = "1MiRJPyHV03MDgO4-M_tvWfxya7_Kdfgrx-FWO8JjE3w";
const sheetId = "Sheet1";

async function authorizeSheets() {
    const auth = new google.auth.GoogleAuth({
        // keyFile: "credentials.json", // set in env vars
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    // Acquire an auth client, and bind it to all future calls
    const authClient = await auth.getClient();

    return google.sheets({ version: "v4", auth: authClient });
}

async function getValues(sheets, range) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetId + (range ? "!" + range : "")
    });

    return res?.data?.values;
}

async function updateValues(sheets, range, values) {
    const res = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: sheetId + (range ? "!" + range : ""),
        valueInputOption: "USER_ENTERED",
        resource: {
            values
        }
    });

    return res?.data;
}

async function appendValues(sheets, values) {
    const res = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: sheetId,
        valueInputOption: "USER_ENTERED",
        resource: {
            values
        }
    });

    return res?.data;
}

async function main() {
    const sheetService = await authorizeSheets(); //once I get the sheet service, i need to save this credential in browser for future use

    let data = await getValues(sheetService, "A2:B3");
    console.log(data);

    // data = await updateValues(sheetService, "A2:B3", [
    //   ["A", "M"],
    //   ["B", "F"]
    // ]);
    // console.log(data);

    // data = await getValues(sheetService, "A2:B3");
    // console.log(data);

    // data = await appendValues(sheetService, [
    //   ["A", "M"],
    //   ["B", "F"]
    // ]);
    // console.log(data);
}

main().catch((e) => {
    console.error(e);
    // throw e;
});
