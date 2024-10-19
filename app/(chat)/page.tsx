'use client';
import { useState, useEffect } from 'react';
import { nanoid } from '@/lib/utils';
import { Chat } from '@/components/chat';
import './video-overlay.css';
import {SyncLoader} from "react-spinners";


export default function IndexPage() {
  const [loading, setLoading] = useState(true); // State to track if the video is still playing
  const id = nanoid(); // Generate unique id for Chat component

  useEffect(() => {
    const videoElement = document.getElementById('introVideo');

    videoElement?.addEventListener('ended', () => {
      setLoading(false);
    });

    const timeout = setTimeout(() => setLoading(false), 15000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
        return <>
          <div className="video-overlay">
            <video id="introVideo" autoPlay muted playsInline className="full-screen-video">
              <source src={'/ric.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
      </>
  }



  return (
          <Chat id={id} />
  );
}
