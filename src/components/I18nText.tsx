export function T({ en, zh }: { en: string; zh: string }) {
  return (
    <>
      <span className="i18n-en">{en}</span>
      <span className="i18n-zh">{zh}</span>
    </>
  );
}

export function LocalizedText({ value }: { value: string }) {
  const slashIndex = value.indexOf(" / ");
  if (slashIndex > -1) {
    return <T en={value.slice(0, slashIndex)} zh={value.slice(slashIndex + 3)} />;
  }

  const firstChinese = value.search(/[\u3400-\u9fff]/);
  if (firstChinese > -1) {
    return <T en={value.slice(0, firstChinese).trim()} zh={value.slice(firstChinese).trim()} />;
  }

  return <>{value}</>;
}
