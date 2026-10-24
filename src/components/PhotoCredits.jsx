import { useLocale } from "@/lib/i18n/LocaleContext";
import { PHOTO_CREDITS, PHOTO_CREDIT_COPY } from "@/lib/photography";

export default function PhotoCredits() {
  const { locale } = useLocale();
  const copy = PHOTO_CREDIT_COPY[locale] || PHOTO_CREDIT_COPY.de;
  return (
    <section id="bildnachweise" className="scroll-mt-40">
      <h2 className="font-heading text-lg font-bold mb-3">{copy.title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground mb-5">{copy.note}</p>
      <ul className="space-y-4 text-sm">
        {PHOTO_CREDITS.map((photo) => (
          <li key={photo.file} className="flex items-center gap-4">
            <img src={photo.file} alt="" loading="lazy" width="72" height="54" className="w-[72px] h-[54px] object-cover shrink-0" />
            <div>
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{photo.title}</a>
              <p className="mt-1 text-muted-foreground">{photo.author} · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{photo.license}</a></p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
