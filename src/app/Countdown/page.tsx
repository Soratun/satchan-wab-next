"use client"
import React, { useEffect, useRef } from 'react';
import Fireworks from 'fireworks-js';

const Countdown = () => {
  const fireworksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fireworksContainerRef.current) {
      // เริ่มต้น fireworks เมื่อเข้าหน้านี้
      const fireworks = new Fireworks(fireworksContainerRef.current, {
        maxRockets: 5,         // จำนวนลูกไฟสูงสุด
        rocketSpawnInterval: 150, // ช่วงเวลาการสร้างลูกไฟ
        numParticles: 100,    // จำนวนอนุภาคของลูกไฟ
        explosionMinHeight: 0.2,  // ความสูงขั้นต่ำ
        explosionMaxHeight: 0.9,  // ความสูงสูงสุด
      });
      
      fireworks.start();  // เริ่มแสดงลูกไฟ

      // หยุดการแสดงลูกไฟหลังจาก 1 นาที
      const timer = setTimeout(() => {
        fireworks.stop(); // หยุดการแสดงลูกไฟ
      }, 10000);  // 60000 มิลลิวินาที = 1 นาที

      return () => {
        clearTimeout(timer); // เคลียร์ timer เมื่อ component นี้ถูก unmount
        fireworks.stop(); // หยุด fireworks ถ้า component ถูกลบ
      };
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFD08F] to-[#F26B9C] bg-fixed text-white">
        <div
          ref={fireworksContainerRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ></div>
        <h1 className="text-4xl font-bold mt-3">
          Countdown to Happy Birthday Satchan BNK48
        </h1>
      </div>
    </>
  );
};

export default Countdown;

