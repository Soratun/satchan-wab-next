"use client"
import React, { useEffect, useRef, useState } from 'react';
import Fireworks from 'fireworks-js';
import classNames from 'classnames';
import Image from 'next/image';

const Countdown = () => {
  const fireworksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fireworksContainerRef.current) {
      // เริ่มต้น fireworks เมื่อเข้าหน้านี้
      const fireworks = new Fireworks(fireworksContainerRef.current, {
        // maxRockets: 5,         // จำนวนลูกไฟสูงสุด
        // rocketSpawnInterval: 150, // ช่วงเวลาการสร้างลูกไฟ
        // numParticles: 100,    // จำนวนอนุภาคของลูกไฟ
        // explosionMinHeight: 0.2,  // ความสูงขั้นต่ำ
        rocketsPoint: {
          min: 1,
          max: 5
        },         // จำนวนลูกไฟสูงสุด
        hue: {
          min: 10,
          max: 150
        }, // ช่วงเวลาการสร้างลูกไฟ
        delay: {
          min: 50,
          max: 100
        },    // จำนวนอนุภาคของลูกไฟ
        lineWidth: {
          explosion: {
            min: 1,
            max: 3
          }
        },  // ความสูงขั้นต่ำ
      });
      
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

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFD08F] to-[#F26B9C] bg-fixed text-white">
        <div
          ref={fireworksContainerRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ></div>
        <h1 className="text-7xl font-bold mt-3">
          Happy Birthday Satchan BNK48
        </h1>

        <div className="relative w-[700px] h-[700px] overflow-hidden ">
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

