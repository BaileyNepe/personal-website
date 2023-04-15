import { withLayout } from "@/HOC/withLayout";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main
        className="from-[ #2e026d ] flex min-h-screen flex-col items-center
        justify-center
      bg-gradient-to-b to-[#15162c]"
      ></main>
    </>
  );
};

export default withLayout({})(Home);
