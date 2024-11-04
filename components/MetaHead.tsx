import Head from "next/head";

// MetaHeadProps 인터페이스 정의
interface MetaHeadProps {
  title: string; // 페이지 제목
  description: string; // 페이지 설명
  imageUrl?: string; // 페이지에 사용할 이미지 URL
}

const MetaHead: React.FC<MetaHeadProps> = ({
  title,
  description,
  imageUrl = "/thumbnail.png",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={imageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default MetaHead;
