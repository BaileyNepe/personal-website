import Head from "next/head";
import { useRouter } from "next/router";

const Meta = ({
  title,
  keywords,
  description,
  image,
  url = "baileynepe.com",
}: {
  title?: string;
  keywords?: string;
  description?: string;
  image?: string;
  url?: string;
}) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`https://${url}${router.asPath}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@t3_app" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Bailey Nepe | Software Engineer",
  description:
    "Discover the portfolio of a skilled software engineer and experienced freelance web developer, offering custom software solutions, web design, and development services to bring your ideas to life.",
  keywords:
    "software engineer, freelance web developer, web design, custom software solutions, web development services, full-stack developer, front-end, back-end, web applications, mobile applications, hosting",
  image: "/images/t3.png",
  url: "t3-app.vercel.app",
};

export default Meta;
