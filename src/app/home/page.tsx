"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames"; // npm install classnames

const Home = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [imageIndex, setImageIndex] = useState(0);
    const totalImages = 6;

    const targetDate = new Date("2024-12-13 00:00:00").getTime();

    // Image rotation effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(intervalId);
    }, [totalImages]);

    // Countdown logic
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }, 500);
        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFD08F] to-[#F26B9C] bg-fixed text-white">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <h1 className="text-4xl font-bold mt-3">
                        Countdown Happy Birthday Satchan BNK48
                    </h1>
                    <div className="relative w-[600px] h-[600px] overflow-hidden ">
                        {[...Array(totalImages)].map((_, index) => (
                            <Image
                                key={index}
                                src={`/img/${index + 1}.png`}
                                alt={`Satchan BNK48 ${index}`}
                                layout="fill" // ให้ภาพเต็มพื้นที่กรอบ
                                objectFit="contain" // ปรับภาพให้พอดีกรอบโดยไม่ครอบ
                                className={classNames(
                                    "absolute transition-opacity duration-1000 ease-in-out",
                                    {
                                        "opacity-100": index === imageIndex, // แสดงภาพปัจจุบัน
                                        "opacity-0": index !== imageIndex,  // ซ่อนภาพอื่น
                                    }
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <div className="countdown-box">
                            <span id="days" className="text-4xl font-semibold">
                                {countdown.days}
                            </span>
                            <p className="text-sm uppercase">Days</p>
                        </div>
                        <div className="countdown-box">
                            <span id="hours" className="text-4xl font-semibold">
                                {countdown.hours}
                            </span>
                            <p className="text-sm uppercase">Hours</p>
                        </div>
                        <div className="countdown-box">
                            <span id="minutes" className="text-4xl font-semibold">
                                {countdown.minutes}
                            </span>
                            <p className="text-sm uppercase">Minutes</p>
                        </div>
                        <div className="countdown-box">
                            <span id="seconds" className="text-4xl font-semibold">
                                {countdown.seconds}
                            </span>
                            <p className="text-sm uppercase">Seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
