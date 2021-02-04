import Head from "next/head";

const IndexPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="mt-4 p-4 w-1/4 rounded bg-green-300 text-center">
          <p className="text-blue-600">Index Page.</p>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
