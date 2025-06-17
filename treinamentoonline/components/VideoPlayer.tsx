export function VideoPlayer({ lessonSlug }: { lessonSlug: string }) {
  return (
    <div className="w-full aspect-video bg-black">Video for {lessonSlug}</div>
  );
}
