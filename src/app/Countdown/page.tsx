"use client"
import React, { useEffect, useRef, useState } from 'react';
import Fireworks from 'fireworks-js';
import classNames from 'classnames';
import Image from 'next/image';
import TypingEffect from '../../../components/TypingEffect';

const Countdown = () => {
    const fireworksContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (fireworksContainerRef.current) {
            
            // เริ่มต้น fireworks เมื่อเข้าหน้านี้
            const fireworks = new Fireworks(fireworksContainerRef.current);

            fireworks.start();  // เริ่มแสดงลูกไฟ

            // ค่อยๆ หยุดการแสดงลูกไฟหลังจาก 1 นาที
            const timer = setTimeout(() => {
                let opacity = 1;
                const fadeOutInterval = setInterval(() => {
                    opacity -= 0.05; // ลดความโปร่งใสลง
                    if (opacity <= 0) {
                        clearInterval(fadeOutInterval); // หยุดเมื่อ opacity ถึง 0
                        fireworks.stop(); // หยุดการแสดงผลของลูกไฟ
                    } else {
                        if (fireworksContainerRef.current) {
                            fireworksContainerRef.current.style.opacity = `${opacity}`; // อัปเดตความโปร่งใส
                        }
                    }
                }, 100);

            }, 30000);

            return () => {
                clearTimeout(timer);
                fireworks.stop();
            };
        }
    }, []);

    const [imageIndex, setImageIndex] = useState(0);
    const totalImages = 6;


    // Image rotation effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(intervalId);
    }, [totalImages]);

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
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFD08F] to-[#F26B9C] bg-fixed text-white p-4">
                {/* Fireworks Container */}
                <div
                    ref={fireworksContainerRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                ></div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-3 text-center">
                    {displayText}
                </h1>
                {/* Image Carousel */}
                <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden mt-8">
                    {[...Array(totalImages)].map((_, index) => (
                        <Image
                            key={index}
                            src={`/img/${index + 1}.png`}
                            alt={`Satchan BNK48 ${index}`}
                            layout="fill"
                            objectFit="contain"
                            className={classNames(
                                "absolute transition-opacity duration-1000 ease-in-out",
                                {
                                    "opacity-100": index === imageIndex,
                                    "opacity-0": index !== imageIndex,
                                }
                            )}
                        />
                    ))}
                </div>
            </div>

        </>
    );
};

export default Countdown;

