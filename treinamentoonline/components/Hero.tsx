import Image from "next/image";
import dragonSrc from "../Images/20250616_2132_Dragão Oriental Intimidador_simple_compose_01jxxmqkb1f39tvf3mzjkg1xb6.png";

export function Hero() {
  return (
    <section className="hero text-center p-10">
      <Image src={dragonSrc} alt="Dragão oriental" className="dragon mx-auto" />
      <h2 className="text-2xl mt-4">Desenvolva suas habilidades e aumente seus conhecimentos</h2>
    </section>
  );
}
