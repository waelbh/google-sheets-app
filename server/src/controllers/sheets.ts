import { google, sheets_v4 } from "googleapis";
import { arrayOfArrayStringsToArrayOfObjects } from "../helpers";
import _, { isError } from "lodash";
/**
 *
 * Get all user spreadsheet from the drive
 *
 */
export const getGoogleSheetsFromDrive = async (req: any, res: any) => {
  try {
    const drive = google.drive({
      version: "v3",
      auth: req.oAuth2Client,
    });
    drive.files.list(
      {
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: "nextPageToken, files(id, name)",
      },
      (err, response) => {
        if (err) res.status(400).send(err);
        return res.send(response);
      }
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};
/**
 *
 * Deduplication algorithm and update result  To Tab C
 *
 */
export const sheetsDeduplicationUpdater = async (
  request: any,
  response: any
) => {
  try {
    const { id } = request.query;
    const sheets = google.sheets({ version: "v4", auth: request.oAuth2Client });

    const DataTabA = await getSheetsByTab("A", id, sheets);
    const DataTabB = await getSheetsByTab("B", id, sheets);

    const AobjectArray = arrayOfArrayStringsToArrayOfObjects(
      DataTabA.data.values
    );
    const BobjectArray = arrayOfArrayStringsToArrayOfObjects(
      DataTabB.data.values
    );

    const uniqueDataA = _.differenceBy(
      AobjectArray,
      BobjectArray,
      "firstName" && "lastName" && "email"
    );
    const uniqueDataB = _.differenceBy(
      BobjectArray,
      AobjectArray,
      "firstName" && "lastName" && "email"
    );

    const DedupedData = _.intersectionBy(
      BobjectArray,
      AobjectArray,
      "firstName" && "lastName" && "email"
    ).map((obj: any) => {
      const matchObject = _.find(AobjectArray, {
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
      });
      const cleanedObjectFromB = _.pickBy(obj, _.identity);
      const cleanedObjectFromA = _.pickBy(matchObject as object, _.identity);
      return Object.assign({}, cleanedObjectFromA, cleanedObjectFromB);
    });
    //adding unique Data  and deduped Data to C tab array
    const resultTabC: Array<Object> = [
      ...DedupedData,
      ...uniqueDataA,
      ...uniqueDataB,
    ];
    // prepare resultTabc array to update method
    const allkeys: { size: number; keysArrayCell: string[] } = {
      size: 0,
      keysArrayCell: [],
    };
    //getting Tab keys
    let rows = resultTabC.map((elem, index) => {
      if (_.size(elem) > allkeys.size) {
        allkeys.size = _.size(elem);
        allkeys.keysArrayCell = Object.keys(elem);
      }
      return Object.values(elem);
    });

    const TabCRows: string[][] = [[...allkeys.keysArrayCell], ...rows];
    return await updateSpreadSheetTabC(
      "C!A1:F",
      id,
      sheets,
      "RAW",
      { values: TabCRows },
      response
    );
  } catch (error) {
    return response.sendStatus(400);
  }
};
const getSheetsByTab = async (
  range: string,
  spreadsheetId: string,
  sheets: sheets_v4.Sheets
) => {
  return await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  });
};
const updateSpreadSheetTabC = async (
  range: string,
  spreadsheetId: string,
  sheets: sheets_v4.Sheets,
  valueInputOption: string,
  requestBody: Object,
  response: any
) => {
  await sheets.spreadsheets.values.update(
    {
      spreadsheetId: spreadsheetId,
      range: range, // update this range of cells
      valueInputOption: valueInputOption,

      requestBody: requestBody,
    },
    (err: any, res: any) => {
      if (err) {
        return response.status(400).json(err);
      }
      return response.status(200).json(res);
    }
  );
};
