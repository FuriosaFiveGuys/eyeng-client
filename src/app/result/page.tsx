type ResultPageProps = {
  searchParams: {
    correctCount: string;
  };
};

export default function ResultPage({ searchParams }: ResultPageProps) {
  return (
    <main className="prose flex h-screen flex-col items-center justify-center">
      <h1>Result</h1>
      <p>Correct: {searchParams.correctCount}</p>
    </main>
  );
}
