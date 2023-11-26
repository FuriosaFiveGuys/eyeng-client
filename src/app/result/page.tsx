import Image from "next/image";
import clsx from "clsx";
type ResultPageProps = {
  searchParams: {
    correctCount: string;
  };
};

export default function ResultPage({ searchParams }: ResultPageProps) {
  return (
    <main className="prose relative flex h-screen flex-col items-center justify-center">
      <div
        className={clsx(
          "modal-box",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "mt-10",
          "w-[600px]",
        )}
      >
        <h1 className="text-[100px]">Result</h1>
        <p className="text-[60px] text-green-600">
          Correct: {searchParams.correctCount}
        </p>
      </div>

      <div className="right-15 absolute bottom-10 grid">
        <p className="font-bold text-slate-600">powered by</p>
        <Image
          src="/20230222100343_Furiosa_AI_h.jpg"
          alt="logo"
          className=""
          width="264"
          height="64"
        />
      </div>
    </main>
  );
}
