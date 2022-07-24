import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const DIR_NAME = path.resolve();

const filter = () => {
  const result = data.map((el) => {
    return {
      itemId: el.itemId,
      itemName: el.itemName,
      options: el.growInfo.options.map((e) => {
        return e.explainDetail;
      }),
      parts: el.itemTypeDetail.includes(" ")
        ? el.itemTypeDetail.split(" ")[1]
        : el.itemTypeDetail,
    };
  });

  fs.writeFileSync(
    path.resolve(DIR_NAME, "public/filterepicItems.ts"),
    JSON.stringify(result, null, 2)
  );
};

filter();
