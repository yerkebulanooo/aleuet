import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Sparkles, ArrowLeft, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { ProductOrderForm } from "@/components/products/ProductOrderForm";
import { Badge } from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#71766a] hover:text-[#171914]">
          <ArrowLeft className="h-4 w-4" />
          <span>На главную</span>
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="peach" size="sm">{product.tag}</Badge>
              {product.badge && <Badge variant="lime" size="sm">{product.badge}</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-black text-[#171914] sm:text-4xl">{product.title}</h1>
            <p className="mt-2 text-base text-[#5c6055]">{product.outcome}</p>
          </div>

          <div className="rounded-[2rem] border border-[#ffd6a5] bg-[#fffaf5] p-6">
            <h3 className="text-lg font-black text-[#803900]">Знакома эта ситуация?</h3>
            <p className="mt-1 text-xs text-[#5c6055]">{product.problem}</p>
            <div className="mt-4 space-y-2">
              {product.problemPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#45483f]">
                  <XCircle className="h-3.5 w-3.5 text-[#803900]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d8f06a] bg-[#fcfef5] p-6">
            <h3 className="text-lg font-black text-[#171914]">Результат программы</h3>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {product.outcomePoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#35382f]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#135924]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
            <h3 className="text-lg font-black text-[#171914]">Формат занятий</h3>
            <div className="mt-4 space-y-3">
              {product.format.map((fmt, i) => (
                <div key={i} className="rounded-xl bg-[#f7f7f2] p-3 text-xs">
                  <h4 className="font-black text-[#171914]">{fmt.title}</h4>
                  <p className="text-[#5c6055]">{fmt.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
            <p className="text-xs font-black uppercase text-[#71766a]">Ментор</p>
            <h3 className="mt-1 text-xl font-black text-[#171914]">{product.expert.name}</h3>
            <p className="text-xs font-bold text-[#607800]">{product.expert.role}</p>
            <p className="mt-2 text-xs text-[#5c6055]">{product.expert.bio}</p>
            <div className="mt-3 space-y-1 border-t border-[#f0f1e8] pt-3">
              {product.expert.achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold">
                  <Sparkles className="h-3 w-3 text-[#607800]" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 space-y-6">
            <ProductOrderForm productTitle={product.title} price={product.pricing.price} />
            <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
              <h4 className="text-sm font-black text-[#171914]">В стоимость включено:</h4>
              <ul className="mt-3 space-y-2 text-xs text-[#5c6055]">
                {product.pricing.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#135924]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
