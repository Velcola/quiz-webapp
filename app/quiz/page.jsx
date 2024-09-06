'use client'
import { useSearchParams } from "next/navigation";
import React from "react";
import fs from "fs";

const  page = () => {
    const file = fs.readFile(process.cwd() + 'app/data.json', 'utf-8')
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    return (
        <h1>{type}</h1>
    );
};

export default page;
