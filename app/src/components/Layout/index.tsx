import React from "react";
import Meta from "../Meta";

const Layout = ({
  children,
  title,
  keywords,
  description,
  image,
}: {
  children: React.ReactNode;
  title?: string;
  keywords?: string;
  description?: string;
  image?: string;
}) => (
  <>
    <Meta
      title={title}
      keywords={keywords}
      description={description}
      image={image}
    />
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {/* <Header links={homeLinks} /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  </>
);

export default Layout;
