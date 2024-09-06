import Link from "next/link";

export default function Home() {
  const quizTypes = {
    history: "Historie Quiz",
    geography: "Geografi Quiz",
    ita: "2ITA Quiz"
  }
  return (
    <main className="bg h-screen flex justify-center items-center">
      <div className="w-full max-w-lg flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl text-white roboto-medium mb-3">Velg en Quiz..</h1>
        <div className="w-full primary text-white shadow-md rounded-lg">
          <div className="m-3 flex flex-col gap-2">
            <Link href={{
              pathname: '/quiz',
              query: { type: quizTypes.history }
            }} legacyBehavior>
              <button className="secondary rounded-lg shadow-sm p-2">
                  .•°¤* Historie Quiz *¤°•.
              </button>
            </Link>
            <Link href={{
              pathname: '/quiz',
              query: { type: quizTypes.ita }
            }} legacyBehavior>
              <button className="secondary rounded-lg shadow-sm p-2">
                  .•°¤* 2ITA Quiz *¤°•.
              </button>
            </Link>
            <Link  href={{
              pathname: '/quiz',
              query: { type: quizTypes.geography }
            }} legacyBehavior>
              <button className="secondary rounded-lg shadow-sm p-2">
                  .•°¤* Geografi *¤°•.
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};