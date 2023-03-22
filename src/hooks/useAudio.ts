import { useEffect, useState } from "react";

const audios: Map<string, () => void> = new Map();

export default function useAudio(data: Record<string, string>): { loaded: boolean; audios: typeof audios } {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const promises: Promise<void>[] = [];

    const AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    Object.keys(data).forEach((key) => {
      const sourceUrl = data[key];

      promises.push(
        new Promise<void>(async (resolve, reject) => {
          try {
            const res = await fetch(sourceUrl);
            const arrayBuffer = await res.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            audios.set(key, () => {
              const trackSource = audioContext.createBufferSource();
              trackSource.buffer = audioBuffer;
              trackSource.connect(audioContext.destination);

              if (audioContext.state === 'suspended') { // 하드웨어 자원 문제와 같은 이슈에 대한 처리
                audioContext.resume();
              }

              trackSource.start();
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        })
      );
    });

    Promise.all(promises).then(() => {
      setLoaded(true);
    });
  }, [data]);

  return {
    loaded,
    audios,
  };
}