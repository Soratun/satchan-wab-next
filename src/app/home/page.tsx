"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // สำหรับการเปลี่ยนหน้า
import Image from "next/image";
import classNames from "classnames"; // npm install classnames

const Home = () => {
    const router = useRouter();
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

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                router.push("/Countdown"); // ไปยังหน้า `/celebration` เมื่อเวลาหมด
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }, 500);
        return () => clearInterval(intervalId);
    }, [targetDate, router]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFD08F] to-[#F26B9C] bg-fixed text-white p-4">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold mt-3">
                        Countdown HAPPY BIRTHDAY SATCHAN BNK48
                    </h1>
                    <div className="relative w-full max-w-[400px] md:max-w-[600px] h-[400px] md:h-[600px] overflow-hidden shadow-lg">
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="countdown-box text-center">
                            <span id="days" className="text-3xl md:text-4xl font-semibold">
                                {countdown.days}
                            </span>
                            <p className="text-xs md:text-sm uppercase">Days</p>
                        </div>
                        <div className="countdown-box text-center">
                            <span id="hours" className="text-3xl md:text-4xl font-semibold">
                                {countdown.hours}
                            </span>
                            <p className="text-xs md:text-sm uppercase">Hours</p>
                        </div>
                        <div className="countdown-box text-center">
                            <span id="minutes" className="text-3xl md:text-4xl font-semibold">
                                {countdown.minutes}
                            </span>
                            <p className="text-xs md:text-sm uppercase">Minutes</p>
                        </div>
                        <div className="countdown-box text-center">
                            <span id="seconds" className="text-3xl md:text-4xl font-semibold">
                                {countdown.seconds}
                            </span>
                            <p className="text-xs md:text-sm uppercase">Seconds</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
