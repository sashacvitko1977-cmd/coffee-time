"use client";

import { Header } from "@/components/header";
import { VideoStoryProvider } from "@/components/video-story-context";
import { VideoBackground } from "@/components/video-background";
import { MainStory } from "@/components/main-story";

export function HomePage() {
  return (
    <VideoStoryProvider>
      <VideoBackground />
      <div className="relative z-10 h-[100svh] overflow-hidden">
        <Header />
        <main className="h-full">
          <MainStory />
        </main>
      </div>
    </VideoStoryProvider>
  );
}
