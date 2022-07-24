import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const DIR_NAME = path.resolve();

const EpicInfoEquip = {
  JACKET: "상의",
  PANTS: "하의",
  SHOULDER: "머리어깨",
  WAIST: "허리",
  SHOES: "신발",
  WRIST: "팔찌",
  AMULET: "목걸이",
  RING: "반지",
  SUPPORT: "보조장비",
  MAGIC_STON: "마법석",
  EARRING: "귀걸이",
};

const filter = () => {
  const result = filterdata.map((newData) => {
    return {
      itemId: newData.itemId,
      itemName: newData.itemName,
      options: newData.options,
      concepts: olddata
        .filter((Data) => newData.itemId === Data.itemId)
        .map(({ concepts }) => concepts)
        .reduce((acc, cur) => {
          return acc.concat(cur);
        }, []),
      parts: Object.keys(EpicInfoEquip)
        .map((part) => {
          if (newData.parts == EpicInfoEquip[part]) {
            return part;
          }
        })
        .filter(Boolean)
        .join(),
    };
  });

  fs.writeFileSync(
    path.resolve(DIR_NAME, "data/epics.ts"),
    JSON.stringify(result, null, 2)
  );
};

filter();
