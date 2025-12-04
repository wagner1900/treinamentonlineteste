import Image from "next/image";
import dragonSrc from "../Images/WhatsApp Image 2025-12-04 at 15.34.25.jpeg";

export function Hero() {
  return (
    <section className="hero text-center p-10">
      <Image src={dragonSrc} alt="Dragão oriental" className="dragon mx-auto" />
      <h2 className="text-2xl mt-4">Desenvolva suas habilidades e aumente seus conhecimentos Na prática do Karatê All Round Fighting - LUTA COMPLETA</h2>
      <p className="mt-4 max-w-2xl mx-auto">
        Tenha acesso ao treinamento de artes marciais online mais abrangente, do
        iniciante ao instrutor! Agora você tem a oportunidade de conhecer passo a
        passo, programa por programa, sobre a arte de Bruce Lee! Conheça o poder
        do Jeet Kune Do, considerado &quot;O original Mixed Martial Arts&quot;
      </p>
    </section>
  );
}
