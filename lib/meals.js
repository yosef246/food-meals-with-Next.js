import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db"); //קורא למידע

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // מאט לי את הטעינה של ייבוא המידע
  return db.prepare("SELECT * FROM meals").all(); //ייבוא המידע
}
//המידע הולך ישר לתיקיה בשם מיילס תחת הקובץ פייג כיוון ששם אני קורא אותו

export default function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); //דומה slugמסתכל שה-
}

export async function saveMeal(meal) {
  meal.title = slugify(meal.title, { lower: true }); //עוזר לי להמיר מאותיות גדולות לקטנות ועוד
  meal.instructions = xss(xss.instructions); //מאבטח לי את הדף אניטרנט מכל מיני סקריפטים זדוניים

  const extension = meal.image.name.split(".").pop();
  //pop - נותן לי את האיבר האחרון אלא אם כן הגדרתי בסוגריים אחרת
  //split - מוציא את הערך שאחרי הנקודה או אחרי כל מה שאני מגדיר לו בסוגריים

  const fileName = `${meal.slug}.${extension}`; //יוצא שיש לי פה את שם התיקיה של התמונה
  const stream = fs.createWriteStream(`public/images/${fileName}`); // זרם לתיקיה שיצרתי

  const bufferedImage = await meal.image.arrayBuffer(); //ממירים את התמונה לחוצץ מאגר
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image falied");
    }
  }); //כך אני ממיר את התמונה החדשה לחוצץ מאגר

  meal.image = `/images/${fileName}`; //בגלל שאני רוצה לשמור את התמונה כקובץ אז אני מחליף את התמונה בנתיב שלה

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @slug,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image
    )
  `
  ).run(meal);
}
