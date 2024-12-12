import React, { useState, useEffect, useRef } from "react";

const TypingEffect = () => {
  const [displayText, setDisplayText] = useState(""); // ข้อความที่จะแสดง
  const fullText = "H appy Birthday Satchan BNK48"; // ข้อความต้นฉบับ
  const typingSpeed = 100; // ความเร็วในการพิมพ์ (ms)
  const currentIndex = useRef(0); // ใช้ useRef เก็บดัชนี

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeCharacter = () => {
      if (currentIndex.current < fullText.length-1) {
        setDisplayText((prev) => prev + fullText[currentIndex.current]); // เพิ่มตัวอักษรใหม่
        currentIndex.current++;
        timeoutId = setTimeout(typeCharacter, typingSpeed); // หน่วงเวลา
      }
    };

    typeCharacter(); // เริ่มแสดงข้อความ

    // ล้าง timeout เมื่อคอมโพเนนต์ unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-3 text-center">
      {displayText}
    </h1>
  );
};

export default TypingEffect;
