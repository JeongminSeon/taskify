import React from "react";
import Image from "next/image";
import { Card } from "@/types/cards";
import { styles } from ".././styles";

const CardBody: React.FC<{ card: Card | null }> = ({ card }) => (
  <div className="p-4">
    <p className="mb-4">{card?.description}</p>
    <div className={styles.imageContainer}>
      <Image
        src={card?.imageUrl || "https://via.placeholder.com/300"}
        alt="이미지"
        fill
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  </div>
);

export default CardBody;
