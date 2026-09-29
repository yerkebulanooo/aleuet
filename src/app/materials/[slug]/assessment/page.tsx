import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { materials } from "@/data/materials";
import { assessments } from "@/data/assessments";
import { AssessmentRunner } from "@/components/materials/AssessmentRunner";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AssessmentPage({ params }: PageProps) {
  const { slug } = await params;
  const material = materials.find((m) => m.slug === slug);

  if (!material) {
    notFound();
  }

  const assessment =
    assessments[slug] || assessments["research-question-formulation"];

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12 md:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/materials/${material.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#71766a] transition-colors hover:text-[#171914]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Вернуться к лекции: {material.title}</span>
        </Link>
      </div>

      {/* Main Assessment Runner */}
      <AssessmentRunner assessment={assessment} />
    </div>
  );
}
