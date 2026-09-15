import { WelcomeScene } from "@/components/WelcomeScene";

type WelcomePageProps = {
  searchParams: Promise<{ name?: string | string[] }>;
};

function firstValue(value?: string | string[]) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const params = await searchParams;
  const name = firstValue(params.name);

  return <WelcomeScene name={name} />;
}
