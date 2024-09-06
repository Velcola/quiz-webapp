import Link from "next/link";

export default function Home() {
  return (
    <main class="bg h-screen flex justify-center items-center">
      <div class="w-full max-w-lg flex flex-col justify-center items-center text-center px-4">
        <h1 class="text-3xl text-white roboto-medium mb-3">Velg en Quiz..</h1>
        <div class="w-full primary text-white shadow-md rounded-lg">
          <div class="m-3 flex flex-col gap-2">
            <Link href='/quiz' legacyBehavior>
              <button class="secondary rounded-lg shadow-sm p-2">
                  .•°¤* Historie Quiz *¤°•.
              </button>
            </Link>
            <button class="secondary rounded-lg shadow-sm p-2">
                .•°¤* 2ITA Quiz *¤°•.
            </button>
            <button class="secondary rounded-lg shadow-sm p-2">
                .•°¤* Idfk *¤°•.
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};