"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  function handlePickerClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader(); //בנאי שקורא קבצים

    fileReader.readAsDataURL(file); //URL-דורש מהקורא קבצים לקרוא את הקבצים כ

    fileReader.onload = () => {
      //onload מקבל לי את כתובת האתר שנוצרה ושולח אותה רק כאשר הקובץ עלה בהצלחה וזה ע"י
      setPickedImage(fileReader.result);
    };
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill //ברירת מחדל כאשר אני לא יטדע מה גודל התמונה
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg" //סוג קובץ שאפשר לעלות
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
        ></input>
        <button
          className={classes.button}
          type="button"
          onClick={handlePickerClick}
        >
          Pick An Image
        </button>
      </div>
    </div>
  );
}
