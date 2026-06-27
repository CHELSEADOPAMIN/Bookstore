import { Star } from "lucide-react";
import { reviews } from "@/data/mock";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

export default function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="5.3 Reviews / 社区书评" title="Short reviews from local readers" />
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Panel key={`${review.name}-${review.book}`}>
            <div className="flex items-center gap-1 text-[#d9a441]">
              {Array.from({ length: review.score }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
            </div>
            <p className="mt-4 font-serif text-2xl font-black">《{review.book}》</p>
            <p className="mt-3 text-sm leading-6 text-[#314038]"><LocalizedText value={review.text} /></p>
            <p className="mt-5 text-sm font-black text-[#b64f34]">— {review.name}</p>
          </Panel>
        ))}
      </div>
    </>
  );
}
