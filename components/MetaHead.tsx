import Head from "next/head";

interface MetaHeadProps {
  title: string;
  description: string;
  imageUrl?: string;
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
