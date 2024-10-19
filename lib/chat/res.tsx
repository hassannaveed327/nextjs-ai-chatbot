import axios from "axios";
import {toast} from "sonner";


export const submitUserMessage = async (val: any) => {
    try {
        const res = await fetch('https://aichatbot-1ovw.onrender.com/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                urls: [
                    "https://solar-studios.gitbook.io/solar-studios",
                    "https://solar-studios.gitbook.io/solar-studios/introduction-welcome-to-solar-studios/solar-dex",
                    "https://solar-studios.gitbook.io/solar-studios/introduction-welcome-to-solar-studios/solar-dominion",
                    "https://solar-studios.gitbook.io/solar-studios/introduction-welcome-to-solar-studios/solar-manga",
                    "https://solar-studios.gitbook.io/solar-studios/get-started/soneium",
                    "https://solar-studios.gitbook.io/solar-studios/get-started/eclipse",
                    "https://solar-studios.gitbook.io/solar-studios/what-is-v3"
                ],
                query: "Web-Scraping",
                message: val
            })
        });
        // console.log('response', await res.text())
        const { response } = await res.json();
        return response;
    }
    catch (e) {
        console.log('error', e)
        toast.error('Error in fetching data');
        return null;
    }
}