import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Banner from "./components/banner/banner";

export const metadata: Metadata = {
    title: "Recipe app",
    description: "Application for managing a list of recipes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <div className="global-grid">
                    <div className="global-banner">
                        <Banner />
                    </div>
                    {children}
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
